# DACTYCLAW

> **Agent Monitor & Deployer for Decentralized Infrastructure**

DACTYCLAW is an all-in-one platform for creating, deploying, and monitoring autonomous agents in the blockchain ecosystem. Launch your agent and token on Base network in just two commands.

## 🎯 What is DACTYCLAW?

DACTYCLAW enables you to:

- **Create** autonomous agents with unique DNA and wallet
- **Launch** tokens on Base network via Clanker
- **Monitor** agent activity and earnings in real-time
- **Explore** the agent and token ecosystem

## ✨ Quick Start

### Prerequisites
- Node.js 18+
- 0.0005 ETH on Base network (for gas fees)

### Create an Agent
```bash
npx dacty-create
```

This will:
- Generate unique agent DNA
- Create wallet address
- Generate private key (stored in .env)
- Create project structure

### Launch Token
```bash
npx dacty-launch
```

This will:
- Prompt for token name and symbol
- Deploy token to Base network via Clanker
- Setup 80/20 fee distribution
- Make token immediately tradeable

## 🚀 How It Works

### Step 1: Create Agent
```bash
$ npx dacty-create

? Agent name: MyAgent

✓ Agent created with DNA: abc123...
✓ Wallet: 0x...
✓ Private key saved in .env
```

### Step 2: Launch Token
```bash
$ npx dacty-launch

? Token name: My Token
? Token symbol: MYTKN

✓ Token deployed to Base
✓ Fee distribution configured (80% Agent, 20% Dactyclaw)
✓ Token address: 0x...
```

### Step 3: Monitor Earnings
Visit [Clanker.world](https://clanker.world) to:
- View your token
- Monitor trading volume
- Track accumulated fees
- Withdraw earnings

## 📋 Fee Distribution

- **80%** → Your Agent Wallet
- **20%** → Dactyclaw Protocol

Fees are automatically distributed from every trade.

## 🏗️ Architecture

```
┌──────────────────────────────┐
│   DACTYCLAW Website          │
│   (React + Tailwind)         │
└──────────────┬───────────────┘
               │
        ┌──────┴──────┐
        │             │
    ┌───▼──┐     ┌────▼────┐
    │ CLI  │     │ Backend  │
    │Tools │     │ API      │
    └───┬──┘     └────┬─────┘
        │             │
        └──────┬──────┘
               │
        ┌──────▼──────────┐
        │ Base Network    │
        │ Clanker API     │
        └─────────────────┘
```

## 📦 CLI Tools

### dacty-create
Create a new agent with secure private key generation.

```bash
npm install -g dacty-create
npx dacty-create
```

**Features:**
- Interactive prompts
- Secure private key generation
- .env file management
- Project structure creation

[View on npm](https://www.npmjs.com/package/dacty-create)

### dacty-launch
Launch token on Base network via Clanker.

```bash
npm install -g dacty-launch
npx dacty-launch
```

**Features:**
- Clanker API integration
- Private key signing
- Fee distribution setup
- Real-time deployment status

[View on npm](https://www.npmjs.com/package/dacty-launch)

## 🌐 Website

Visit the DACTYCLAW website for:
- **[ DEPLOY ]** — Step-by-step deployment guide
- **[ EXPLORER ]** — Browse all agents and tokens
- **[ DOCS ]** — Complete documentation

## 📚 Documentation

### Installation
```bash
git clone https://github.com/dactyclaw/dactyclaw.git
cd dactyclaw
pnpm install
pnpm dev
```

### Development
```bash
pnpm dev      # Start dev server
pnpm build    # Build for production
pnpm test     # Run tests
```

### Project Structure
```
dactyclaw/
├── client/
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/          # Page components
│   │   ├── lib/            # Utilities
│   │   └── App.tsx         # Main app
│   └── public/             # Static assets
├── server/                 # Backend API
├── drizzle/                # Database schema
└── package.json
```

## 🔐 Security

- **Private keys** are stored locally in .env (never on servers)
- **No authentication required** for deployment
- **Frontend-only** for agent creation
- **Blockchain-verified** token deployment

## 🎨 Design

DACTYCLAW uses a **terminal aesthetic** inspired by modern CLI tools:
- Monospace typography (IBM Plex Mono)
- Neon green accent (#00ff00)
- Dark background (#0a0a0a)
- Minimal, focused interface

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push and open PR

## 📄 License

MIT License — see LICENSE file

## 🙏 Acknowledgments

Built with inspiration from:
- Basedaemon (UI/UX)
- Clanker (token deployment)
- Modern blockchain infrastructure

## 📞 Support

- **Issues:** GitHub Issues
- **Docs:** See /docs folder
- **Website:** https://dactyclaw.com

---

**Made for the agent ecosystem**

**Version:** 5.2  
**Status:** Production Ready ✅  
**License:** MIT
