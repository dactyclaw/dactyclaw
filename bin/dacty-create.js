#!/usr/bin/env node
const { program } = require('commander');
const { ethers } = require('ethers');
const fs = require('fs');
const path = require('path');

program
    .version('1.0.0')
    .description('Create a new autonomous agent and generate a Base wallet')
    .argument('[name]', 'Name of the agent')
    .option('-t, --ticker <ticker>', 'Token ticker symbol')
    .action((name, options) => {
        const agentName = name || 'New Agent';
        const ticker = options.ticker || agentName.substring(0, 4).toUpperCase();

        console.log(`[DACTYCLAW] Generating DNA and autonomous wallet for ${agentName}...`);

        // Generate a random wallet
        const wallet = ethers.Wallet.createRandom();

        const envContent = `AGENT_PRIVATE_KEY=${wallet.privateKey}\n`;
        fs.writeFileSync(path.join(process.cwd(), '.env'), envContent);

        const agentConfig = {
            name: agentName,
            ticker: ticker,
            address: wallet.address,
            dna: wallet.privateKey.substring(2, 10).toUpperCase() + '-' + Date.now().toString().slice(-4),
            created_at: new Date().toISOString()
        };

        fs.writeFileSync(path.join(process.cwd(), 'agent.json'), JSON.stringify(agentConfig, null, 2));

        console.log(`\n✅ Agent successfully created!\n`);
        console.log(`Name:    ${agentName}`);
        console.log(`Ticker:  $${ticker}`);
        console.log(`DNA ID:  ${agentConfig.dna}`);
        console.log(`Wallet:  ${wallet.address}`);
        console.log(`\n⚠️  Private key saved to .env (DO NOT COMMIT THIS FILE)`);
        console.log(`📄  Agent config saved to agent.json`);
        console.log(`\n💳 FUNDING REQUIRED:`);
        console.log(`   Please send at least 0.0005 ETH (Base) to the Agent Wallet:`);
        console.log(`   ${wallet.address}`);
        console.log(`\nNext step: Run 'npx dacty-launch' to auto-deploy token on Base`);
    });

program.parse(process.argv);
