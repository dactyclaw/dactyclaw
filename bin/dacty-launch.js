#!/usr/bin/env node
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { program } = require('commander');
const { createPublicClient, createWalletClient, http, formatEther } = require('viem');
const { privateKeyToAccount } = require('viem/accounts');
const { base } = require('viem/chains');
const { Clanker } = require('clanker-sdk/v4');
const { POOL_POSITIONS } = require('clanker-sdk');

program
    .version('1.0.0')
    .description("Launch your agent's token via Clanker on the Base network")
    .option('-d, --developer <address>', 'Developer fee recipient address')
    .action(async (options) => {
        const configPath = path.join(process.cwd(), 'agent.json');
        if (!fs.existsSync(configPath)) {
            console.error('❌ Error: agent.json not found. You must create an Agent first!');
            console.error('\n💡 To create an agent, run this command with your desired Name and Ticker:');
            console.error('   npx dacty-create "MyAgentName" --ticker "TICKER"');
            process.exit(1);
        }

        const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        console.log(`[DACTYCLAW] Preparing Clanker Auto-Deploy for $${config.ticker} (${config.name})...`);

        let devAddress = options.developer;
        if (!devAddress) {
            console.log(`\n💡 Auto-filling fee recipient with agent's wallet address.`);
            devAddress = config.address;
        }

        const privateKeyStr = process.env.AGENT_PRIVATE_KEY;
        if (!privateKeyStr) {
            console.error('❌ Error: AGENT_PRIVATE_KEY not found in .env file.');
            process.exit(1);
        }

        // ensure private key has '0x' prefix for viem
        const privateKey = privateKeyStr.startsWith('0x') ? privateKeyStr : '0x' + privateKeyStr;

        console.log(`\n🔗 Connecting to Base Mainnet...`);
        try {
            // Setup viem wallet client
            const account = privateKeyToAccount(privateKey);
            const publicClient = createPublicClient({
                chain: base,
                transport: http()
            });
            const wallet = createWalletClient({
                account,
                chain: base,
                transport: http()
            });

            process.stdout.write(`💰 Checking balance for ${account.address}... `);
            const balanceWei = await publicClient.getBalance({ address: account.address });
            const balanceEth = formatEther(balanceWei);
            console.log(`${Number(balanceEth).toFixed(5)} ETH`);

            const MIN_BALANCE = 0.0005;

            if (Number(balanceEth) < MIN_BALANCE) {
                console.error(`\n❌ Error: Insufficient funds for deployment.`);
                console.error(`   Required: ${MIN_BALANCE} ETH`);
                console.error(`   Current:  ${balanceEth} ETH`);
                console.error(`\nPlease send ETH (Base) to the agent wallet: ${account.address}`);
                return;
            }

            console.log(`\n✅ Funds verified. Agent DNA secure enclave connected. Initiating on-chain deployment protocol...`);

            console.log(`[1/3] Compiling token parameters for Clanker Factory...`);

            const clanker = new Clanker({
                wallet,
                publicClient,
            });

            const tokenConfig = {
                name: config.name,
                symbol: config.ticker,
                tokenAdmin: account.address,
                image: "ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi", // Placeholder Clanker/Agent image
                metadata: {
                    description: `Autonomous agent token for ${config.name} created via Dactyclaw CLI. DNA: ${config.dna}`,
                    socialMediaUrls: [],
                    auditUrls: [],
                },
                context: {
                    interface: "Dactyclaw SDK",
                    platform: "Dactyclaw",
                    messageId: "Deploy",
                    id: config.ticker,
                },
                pool: {
                    quoteToken: "0x4200000000000000000000000000000000000006", // WETH
                    initialMarketCap: "0.2", // 0.2 ETH (Base) minimal initial
                    positions: POOL_POSITIONS.Standard
                },
                vault: { percentage: 0, lockupDuration: 604800 },
                devBuy: { ethAmount: 0.0001 }
            };

            // Execute the deployment using clanker-sdk v4
            console.log(`[2/3] Calling SDK deploy... (This will spend Base ETH gas)`);
            const deployResult = await clanker.deploy(tokenConfig);

            console.log(`[3/3] Broadcasting transaction to Base network...`);
            console.log(`Transaction Hash: ${deployResult.txHash}`);

            console.log(`Waiting for confirmation...`);
            const result = await deployResult.waitForTransaction();

            console.log(`\n🎉 SUCCESS! Token deployed autonomously on-chain.`);
            if (result && result.address) {
                console.log(`Token Contract: ${result.address}`);
                console.log(`Explorer: https://basescan.org/token/${result.address}`);
            }
            console.log(`\nTrading will be live on Clanker shortly.`);

        } catch (error) {
            console.error(`\n❌ Network Error: Failed to interact with Base network or Clanker SDK.`);
            console.error(error.message);
            console.error(error); // debug raw error
            return;
        }
    });

program.parse(process.argv);
