# DACTYCLAW

> **Agent Monitor & Deployer for Decentralized Infrastructure**

DACTYCLAW adalah platform all-in-one untuk memantau, mengelola, dan meluncurkan autonomous agents di ekosistem blockchain. Dirancang untuk memberikan kontrol penuh atas agent lifecycle dengan interface yang intuitif dan powerful.

## 🎯 Apa itu DACTYCLAW?

DACTYCLAW adalah skill yang memungkinkan developer dan operator untuk:

- **Monitor** aktivitas real-time dari semua agent yang di-deploy
- **Deploy** agent baru dengan mudah menggunakan step-by-step guide
- **Explore** ekosistem agent dan token yang tersedia
- **Manage** parameter dan konfigurasi agent dari satu dashboard

Platform ini dibangun dengan teknologi modern dan dirancang untuk memberikan pengalaman pengguna yang seamless, baik untuk pemula maupun expert.

## ✨ Fitur Utama

### 1. **Live Activity Monitor**
- Real-time tracking aktivitas agent di blockchain
- Live feed dari token deployments, trades, dan burns
- System status dengan block height tracking
- Responsive design untuk desktop dan mobile

### 2. **Agent Deployer**
- Step-by-step guide untuk membuat dan meluncurkan agent
- 6 tahap proses yang jelas:
  - Create an Agent
  - Fund Your Wallet
  - Generate Token DNA
  - Launch Token on Uniswap V4
  - Register On-Chain
  - Monitor & Manage
- Copyable commands untuk setiap step
- Minimal ETH requirement: 0.0005 ETH

### 3. **Token Explorer**
- Discover semua agent dan token yang tersedia
- Real-time data dari blockchain
- Filter dan search functionality
- Detailed statistics untuk setiap token

### 4. **Documentation Hub**
- Comprehensive guides dan tutorials
- API documentation
- Best practices dan tips
- Troubleshooting section

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ dan pnpm
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Wallet dengan minimal 0.0005 ETH di Base network

### Installation

```bash
# Clone repository
git clone https://github.com/[username]/dactyclaw.git
cd dactyclaw

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Server akan berjalan di `http://localhost:3000`

### Usage

1. **Buka DACTYCLAW** di browser
2. **Pilih tab** sesuai kebutuhan:
   - `[ DEPLOY ]` — Mulai deploy agent baru
   - `[ EXPLORER ]` — Lihat agent yang tersedia
   - `[ DOCS ]` — Baca dokumentasi lengkap
3. **Follow step-by-step guide** untuk deploy
4. **Copy commands** dan jalankan di terminal
5. **Monitor progress** di Live Activity Monitor

## 📋 Tahapan Deploy

### Step 01: Create an Agent
```bash
$ npx dactyclaw-agent-create
```
Initialize AI agent kamu dengan DACTYCLAW. Agent akan mendapat:
- Unique name dan DNA
- Wallet address
- Token contract
- Repository

### Step 02: Fund Your Wallet
```bash
$ npx dactyclaw-wallet-fund --amount 0.0005
```
Pastikan wallet memiliki minimal **0.0005 ETH** di Base network untuk:
- Gas fees untuk deployment
- Initial liquidity
- Transaction costs

### Step 03: Generate Token DNA
```bash
$ npx dactyclaw-token-dna --agent [agent-id]
```
Generate unique DNA untuk token kamu:
- Token parameters
- Supply configuration
- Fee structure
- MEV protection settings

### Step 04: Launch Token on Uniswap V4
```bash
$ npx dactyclaw-token-launch --dna [dna-hash]
```
Deploy token ke Uniswap V4:
- Creates ERC-20 token
- Initializes liquidity pool
- Enables MEV protection
- Makes token immediately tradeable

### Step 05: Register On-Chain
```bash
$ npx dactyclaw-agent-register --token [token-address]
```
Register agent dan token di blockchain:
- Appears di DACTYCLAW monitor
- Listed di token explorer
- Discoverable oleh traders
- 80% of fees fund agent, 20% flow to protocol

### Step 06: Monitor & Manage
```bash
$ npx dactyclaw-agent-monitor
```
Track agent activity real-time:
- Live trading volume
- Fee collection status
- Liquidity management
- Agent performance metrics

## 🏗️ Architecture

DACTYCLAW dibangun dengan arsitektur modern:

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
- **Styling:** Tailwind CSS dengan custom terminal theme
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
# Start dev server dengan hot reload
pnpm dev

# Build untuk production
pnpm build

# Preview production build
pnpm preview

# Type checking
pnpm check

# Format code
pnpm format
```

## 🎨 Design Philosophy

DACTYCLAW menggunakan **Terminal Aesthetic** yang terinspirasi dari:
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

Dokumentasi lengkap tersedia di:
- **[ DOCS ]** tab di DACTYCLAW
- `./docs/` folder di repository
- Inline code comments

### Dokumentasi Tersedia:
- **INSTALLATION.md** — Setup dan konfigurasi
- **USAGE.md** — Panduan penggunaan lengkap
- **API.md** — API reference
- **ARCHITECTURE.md** — Technical deep dive
- **TROUBLESHOOTING.md** — Common issues & solutions

## 🤝 Contributing

Kami welcome contributions! Berikut cara berkontribusi:

1. **Fork** repository
2. **Create feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit changes** (`git commit -m 'Add amazing feature'`)
4. **Push to branch** (`git push origin feature/amazing-feature`)
5. **Open Pull Request**

### Contribution Guidelines
- Follow existing code style
- Add tests untuk new features
- Update documentation
- Keep commits atomic dan descriptive

## 🐛 Bug Reports & Features

Menemukan bug atau punya ide fitur? Buka issue di GitHub:
- **Bug Report:** Jelaskan langkah reproduce dan expected behavior
- **Feature Request:** Describe use case dan benefit

## 📄 License

DACTYCLAW dilisensikan di bawah **MIT License** — lihat file `LICENSE` untuk detail.

## 🙏 Acknowledgments

DACTYCLAW dibangun dengan inspirasi dari:
- Basedaemon (UI/UX philosophy)
- Modern blockchain infrastructure
- Open source community

## 📞 Support

Butuh bantuan? Hubungi kami:
- **GitHub Issues:** Bug reports dan feature requests
- **Documentation:** Lihat `/docs` folder
- **Community:** Join Discord community (link di repo)

## 🔐 Security

DACTYCLAW adalah frontend-only application. Semua data diambil dari:
- Public blockchain RPC endpoints
- Public APIs
- Browser local storage

**Tidak ada private key atau sensitive data yang disimpan di server.**

---

**Made with ❤️ for the agent ecosystem**

**Version:** 3.2  
**Last Updated:** February 2026  
**Status:** Production Ready ✅
