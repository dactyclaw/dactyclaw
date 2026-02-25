# DACTYCLAW

> **Agent Monitor & Deployer for Decentralized Infrastructure**

DACTYCLAW is an all-in-one platform for monitoring, managing, and deploying autonomous agents in the blockchain ecosystem. Designed to provide complete control over agent lifecycle with an intuitive and powerful interface.

## 🎯 What is DACTYCLAW?

DACTYCLAW is a skill that enables developers and operators to:

- **Monitor** real-time activity from all deployed agents
- **Deploy** new agents easily using a step-by-step guide
- **Explore** the agent and token ecosystem available
- **Manage** agent parameters and configuration from a single dashboard

Built with modern technology and designed to provide a seamless user experience for both beginners and experts.

## ✨ Key Features

### 1. **Live Activity Monitor**
- Real-time tracking of agent activity on blockchain
- Live feed of token deployments, trades, and burns
- System status with block height tracking
- Responsive design for desktop and mobile

### 2. **Agent Deployer**
- Step-by-step guide for creating and launching agents
- 6 clear process stages:
  - Create an Agent
  - Fund Your Wallet
  - Generate Token DNA
  - Launch Token on Uniswap V4
  - Register On-Chain
  - Monitor & Manage
- Copyable commands for each step
- Minimal ETH requirement: 0.0005 ETH

### 3. **Token Explorer**
- Discover all available agents and tokens
- Real-time data from blockchain
- Filter and search functionality
- Detailed statistics for each token

### 4. **Documentation Hub**
- Comprehensive guides and tutorials
- API documentation
- Best practices and tips
- Troubleshooting section

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and pnpm
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Wallet with minimum 0.0005 ETH on Base network

### Installation

```bash
# Clone repository
git clone https://github.com/dactyclaw/dactyclaw.git
cd dactyclaw

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Server will run at `http://localhost:3000`

### Usage

1. **Open DACTYCLAW** in your browser
2. **Select tab** based on your needs:
   - `[ DEPLOY ]` — Start deploying a new agent
   - `[ EXPLORER ]` — View available agents
   - `[ DOCS ]` — Read full documentation
3. **Follow step-by-step guide** for deployment
4. **Copy commands** and run in terminal
5. **Monitor progress** in Live Activity Monitor

## 📋 Deployment Stages

### Stage 01: Create an Agent
```bash
$ npx dactyclaw-agent-create
```
Initialize your AI agent with DACTYCLAW. Your agent will receive:
- Unique name and DNA
- Wallet address
- Token contract
- Repository

### Stage 02: Fund Your Wallet
```bash
$ npx dactyclaw-wallet-fund --amount 0.0005
```
Ensure wallet has minimum **0.0005 ETH** on Base network for:
- Gas fees for deployment
- Initial liquidity
- Transaction costs

### Stage 03: Generate Token DNA
```bash
$ npx dactyclaw-token-dna --agent [agent-id]
```
Generate unique DNA for your token:
- Token parameters
- Supply configuration
- Fee structure
- MEV protection settings

### Stage 04: Launch Token on Uniswap V4
```bash
$ npx dactyclaw-token-launch --dna [dna-hash]
```
Deploy token to Uniswap V4:
- Creates ERC-20 token
- Initializes liquidity pool
- Enables MEV protection
- Makes token immediately tradeable

### Stage 05: Register On-Chain
```bash
$ npx dactyclaw-agent-register --token [token-address]
```
Register agent and token on blockchain:
- Appears in DACTYCLAW monitor
- Listed in token explorer
- Discoverable by traders
- 80% of fees fund agent, 20% flow to protocol

### Stage 06: Monitor & Manage
```bash
$ npx dactyclaw-agent-monitor
```
Track agent activity in real-time:
- Live trading volume
- Fee collection status
- Liquidity management
- Agent performance metrics

## 🏗️ Architecture

DACTYCLAW is built with modern architecture:

```
┌─────────────────────────────────────┐
│         DACTYCLAW Frontend          │
│  (React 19 + Tailwind + Vite)       │
└──────────────┬──────────────────────┘
               │
       ┌───────┴────────┐
       │                │
┌──────▼──────┐  ┌──────▼──────┐
│ Public RPC  │  │ Clawnchpad  │
│ (Base)      │  │ API         │
└──────┬──────┘  └──────┬──────┘
       │                │
       └───────┬────────┘
               │
       ┌───────▼──────────┐
       │ Blockchain Data  │
       │ (Base Network)   │
       └──────────────────┘
```

### Technology Stack

- **Frontend:** React 19, TypeScript, Tailwind CSS 4
- **Build Tool:** Vite 7
- **State Management:** React Hooks
- **Data Fetching:** ethers.js, Fetch API
- **Styling:** Tailwind CSS with custom terminal theme
- **UI Components:** shadcn/ui

## 🔧 Development

### Project Structure

```
dactyclaw/
├── client/
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page-level components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions
│   │   ├── App.tsx        # Main app component
│   │   ├── main.tsx       # Entry point
│   │   └── index.css      # Global styles
│   ├── public/            # Static assets
│   └── index.html         # HTML template
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript config
├── vite.config.ts         # Vite config
└── README.md              # This file
```

### Development Commands

```bash
# Start dev server with hot reload
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Type checking
pnpm check

# Format code
pnpm format
```

## 🎨 Design Philosophy

DACTYCLAW uses **Terminal Aesthetic** inspired by:
- Basedaemon (clean, minimal interface)
- Classic terminal UI (monospace, green neon)
- Modern web standards (responsive, accessible)

**Color Scheme:**
- Background: `#0a0a0a` (near black)
- Accent: `#00ff00` (neon green)
- Text: `#e0e0e0` (light gray)
- Borders: Dashed green lines

**Typography:**
- Font: IBM Plex Mono (monospace)
- Weights: Regular (400), Bold (700)
- Sizes: Responsive scaling

## 📚 Documentation

Full documentation is available at:
- **[ DOCS ]** tab in DACTYCLAW
- `./docs/` folder in repository
- Inline code comments

### Available Documentation:
- **INSTALLATION.md** — Setup and configuration
- **USAGE.md** — Complete usage guide
- **API.md** — API reference
- **ARCHITECTURE.md** — Technical deep dive
- **TROUBLESHOOTING.md** — Common issues & solutions

## 🤝 Contributing

We welcome contributions! Here's how to contribute:

1. **Fork** the repository
2. **Create feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit changes** (`git commit -m 'Add amazing feature'`)
4. **Push to branch** (`git push origin feature/amazing-feature`)
5. **Open Pull Request**

### Contribution Guidelines
- Follow existing code style
- Add tests for new features
- Update documentation
- Keep commits atomic and descriptive

## 🐛 Bug Reports & Features

Found a bug or have a feature idea? Open an issue on GitHub:
- **Bug Report:** Explain reproduction steps and expected behavior
- **Feature Request:** Describe use case and benefits

## 📄 License

DACTYCLAW is licensed under the **MIT License** — see `LICENSE` file for details.

## 🙏 Acknowledgments

DACTYCLAW is built with inspiration from:
- Basedaemon (UI/UX philosophy)
- Modern blockchain infrastructure
- Open source community

## 📞 Support

Need help? Contact us:
- **GitHub Issues:** Bug reports and feature requests
- **Documentation:** See `/docs` folder
- **Community:** Join Discord community (link in repo)

## 🔐 Security

DACTYCLAW is a frontend-only application. All data is fetched from:
- Public blockchain RPC endpoints
- Public APIs
- Browser local storage

**No private keys or sensitive data are stored on any server.**

## 🚀 Deployment

### Deploy to Vercel

1. **Fork this repository** on GitHub
2. **Connect to Vercel:**
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect settings
   - Click "Deploy"

3. **Your site is live!**
   - Vercel will provide a URL
   - Custom domain support available

### Environment Variables

No environment variables required! DACTYCLAW works with public endpoints.

---

**Made with ❤️ for the agent ecosystem**

**Version:** 3.2  
**Status:** Production Ready ✅  
**License:** MIT
