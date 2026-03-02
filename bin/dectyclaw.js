#!/usr/bin/env node
const { program } = require('commander');
const { ethers } = require('ethers');
const { createPublicClient, createWalletClient, http, formatEther } = require('viem');
const { privateKeyToAccount } = require('viem/accounts');
const { base } = require('viem/chains');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const axios = require('axios');
const { Clanker, POOL_POSITIONS } = require('clanker-sdk/v4');
const { POOL_POSITIONS: ROOT_POS_V4 } = require('clanker-sdk');
const readline = require('readline');

function ask(question) {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            rl.close();
            resolve(answer.trim());
        });
    });
}

function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
}

function generateSubStringHash(str, length) {
    return crypto.createHash('md5').update(str).digest('hex').substring(0, length);
}

program
    .name('DECTYCLAW')
    .description('Spawn and Deploy an Autonomous Agent Token on Base (Clanker)')
    .option('-n, --name <name>', 'Agent name')
    .option('-t, --ticker <ticker>', 'Token ticker symbol')
    .action(async (options) => {
        console.log(`\n╔════════════════════════════════════════╗`);
        console.log(`║      DECTYCLAW AGENT SPAWNER V2        ║`);
        console.log(`║    Create and Deploy Automatically     ║`);
        console.log(`╚════════════════════════════════════════╝\n`);

        const name = options.name || await ask('? Agent Name: ');
        if (!name) { console.log('Name is required.'); process.exit(1); }

        const defaultTicker = name.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6);
        const tickerInput = options.ticker || await ask(`? Token Symbol [${defaultTicker}]: `);
        const ticker = tickerInput || defaultTicker;

        const description = await ask('? Agent Description (optional): ');
        const imageUrl = await ask('? Token Image URL (optional): ');

        // Wallet setup
        const localWallet = ethers.Wallet.createRandom();
        const dnaId = generateSubStringHash(localWallet.address + Date.now(), 12);

        // Env & Agent files processing
        const cwd = process.cwd();
        const agentDirName = `${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-agent`;
        const agentDir = path.join(cwd, agentDirName);

        if (!fs.existsSync(agentDir)) {
            fs.mkdirSync(agentDir, { recursive: true });
        }

        const agentJsonPath = path.join(agentDir, 'agent.json');
        const agentData = {
            name,
            ticker,
            dnaId,
            dnaId,
            description: description || "An autonomous agent in the DECTYCLAW ecosystem",
            imageUrl: imageUrl || "",
            network: "base",
            createdAt: new Date().toISOString(),
            wallet: { address: localWallet.address }
        };
        fs.writeFileSync(agentJsonPath, JSON.stringify(agentData, null, 2));

        const envPath = path.join(agentDir, '.env');
        let envContent = `AGENT_DNA=${dnaId}\nPRIVATE_KEY=${localWallet.privateKey}\nAGENT_DIR=${agentDir}\n`;
        fs.writeFileSync(envPath, envContent);

        console.log(`\n✔ Configuration generated at ` + agentDir);

        console.log(`\nAgent Details:`);
        console.log(`────────────────────────────────────────────────────────────`);
        console.log(`  Name:              ${name}`);
        console.log(`  Ticker:            $${ticker}`);
        console.log(`  DNA:               ${dnaId}`);
        console.log(`  Wallet Address:    ${localWallet.address}`);
        console.log(`────────────────────────────────────────────────────────────`);

        console.log(`\n💳 FUNDING REQUIRED FOR TOKEN LAUNCH:`);
        console.log(`   Please send at least 0.001 ETH (Base) to the Agent Wallet:`);
        console.log(`   ${localWallet.address}`);
        console.log(`\nWaiting for funds... (Polling Base network)`);

        const rpc = "https://mainnet.base.org";
        const rpcProvider = new ethers.JsonRpcProvider(rpc);
        const MIN_BALANCE = ethers.parseEther("0.001");

        let funded = false;
        for (let i = 0; i < 120; i++) { // wait for max 10 minutes
            const balance = await rpcProvider.getBalance(localWallet.address);
            if (balance >= MIN_BALANCE) {
                console.log(`\n✅ ${ethers.formatEther(balance)} ETH — funded!`);
                funded = true;
                break;
            }
            if (i > 0 && i % 6 === 0) {
                console.log(`... Waiting: ${ethers.formatEther(balance)} ETH (Needs 0.001 ETH)`);
            }
            await sleep(5000);
        }

        if (!funded) {
            console.log(`\n❌ Funding timed out. You can manually launch later by CD-ing into ${agentDirName} and running 'npx dectyclaw'.`);
            process.exit(1);
        }

        console.log(`\n🚀 Initiating DECTYCLAW Clanker Auto-Deploy...`);
        const account = privateKeyToAccount(localWallet.privateKey);
        const publicClient = createPublicClient({ chain: base, transport: http(rpc) });
        const walletClient = createWalletClient({ account, chain: base, transport: http(rpc) });
        const clanker = new Clanker({ publicClient: publicClient, wallet: walletClient });

        const tokenConfig = {
            name,
            symbol: ticker,
            tokenAdmin: account.address,
            image: imageUrl || "",
            metadata: { description: description || "Deployed via DECTYCLAW Seamless CLI", socialMediaUrls: [], auditUrls: [] },
            context: { interface: "Dactyl", platform: "Dactyl", messageId: dnaId, id: ticker },
            pool: { pairedToken: "WETH", initialMarketCap: "0.2", positions: ROOT_POS_V4.Standard }
        };

        console.log(`[1/3] Compiling Factory Payload...`);
        console.log(`[2/3] Executing deployment contract... (This will spend Layer-2 Gas)`);

        const deployResult = await clanker.deploy(tokenConfig);

        if (deployResult.error) {
            console.error(`\n❌ Deployment Failed: ${deployResult.error.shortMessage || deployResult.error.message || 'Smart Contract Error'}`);
            fs.writeFileSync(path.join(agentDir, 'error_launch.log'), JSON.stringify(deployResult, (key, value) => typeof value === 'bigint' ? value.toString() + 'n' : value, 2));
            process.exit(1);
        }

        console.log(`[3/3] Broadcasting Tx: ${deployResult.txHash}`);
        console.log(`Waiting for Block validation...`);

        const resultContract = await deployResult.waitForTransaction();
        console.log(`\n🎉 SUCCESS! Token deployed autonomously on-chain.`);
        if (resultContract && resultContract.address) {
            console.log(`\n🪙  Token Address:  ${resultContract.address}`);
            console.log(`🔗 Token Explorer: https://clanker.world/clanker/${resultContract.address}`);

            // Update config with token payload
            agentData.token = {
                address: resultContract.address,
                txHash: deployResult.txHash
            };
            fs.writeFileSync(agentJsonPath, JSON.stringify(agentData, null, 2));

            // [DECTYCLAW Database Sync] - Push Directly to Live Agents Monitor
            try {
                const binId = '69a2ff58d0ea881f40e21084';
                const apiKey = '$2a$10$52cNICm.70qXCx0qkKBG5erLYGg1HMceR1gT4OOPOe5uzCiAJShOG';

                // 1. GET current
                const resGet = await fetch(`https://api.jsonbin.io/v3/b/${binId}`, {
                    headers: { 'X-Master-Key': apiKey }
                });

                let currentData = [];
                if (resGet.ok) {
                    const parsed = await resGet.json();
                    currentData = parsed.record || [];
                }

                // Append new agent token payload
                currentData.push({
                    symbol: ticker,
                    name: name,
                    agent: `4claw_anon_thread:${dnaId.substring(0, 4)}`,
                    launchedAt: Date.now(),
                    clanker_url: `https://clanker.world/clanker/${resultContract.address}`,
                    explorer_url: `https://basescan.org/token/${resultContract.address}`,
                    address: resultContract.address,
                    source: '4claw' // For backwards compatibility logic
                });

                // 2. PUT updated array
                await fetch(`https://api.jsonbin.io/v3/b/${binId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Master-Key': apiKey
                    },
                    body: JSON.stringify(currentData)
                });

                console.log(`📡 Satellite Sync: Agent deployed to Global DECTYCLAW Terminal.`);
            } catch (e) {
                // Silently ignore ping errors so as not to ruin user CLI experience
            }
        }

        console.log(`\nYour Agent ${name} is fully materialized.`);
        console.log(`Directory: cd ${agentDirName}`);
        console.log(`Keep your private keys safe!`);
    });

program.parse(process.argv);
