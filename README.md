<p align="center">
  <strong>DACTYCLAW</strong><br>
  <em>Autonomous On-Chain Agent Orchestration Protocol</em>
</p>

---

## Introduction

Dactyclaw is a fully autonomous, self-sustaining protocol designed to deploy, manage, and monitor AI-powered on-chain agents on the **Base network**. It combines a powerful command-line interface with a modern web dashboard, enabling developers and operators to launch ERC-20 tokens through [Clanker](https://clanker.world) with zero manual intervention after initialization.

Unlike traditional token launchers that require step-by-step user interaction, Dactyclaw operates as a continuous orchestration process. Once started, it autonomously generates agent identities, provisions Ethereum wallets, monitors funding status, and executes smart contract deployments—all within a single terminal session.

Every agent deployed through Dactyclaw is automatically tracked via an independent serverless database, ensuring complete data sovereignty without reliance on third-party infrastructure.

---

## Getting Started

### Prerequisites

- **Node.js** v18 or later
- **npm** v9 or later
- An Ethereum wallet funded with at least **0.0005 ETH** on the Base network

### Installation

No installation is required. Dactyclaw runs directly via `npx`:

```bash
npx dactyclaw
```

### What Happens Next

Once the process starts, Dactyclaw will:

1. **Generate Agent Identity** — Creates a unique DNA signature and agent profile.
2. **Provision Wallet** — Generates a new Ethereum keypair for the agent.
3. **Monitor Balance** — Continuously polls the wallet until the funding threshold is reached.
4. **Deploy Contract** — Automatically submits an ERC-20 token deployment transaction via Clanker.
5. **Sync to Dashboard** — Pushes the deployed agent metadata to the serverless tracking database.

The entire process is non-interactive after the initial command execution.

---

## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [Key Features](#key-features)
- [Architecture](#architecture)
- [CLI Reference](#cli-reference)
- [Web Dashboard](#web-dashboard)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [Resources](#resources)
- [License](#license)

---

## Key Features

| Feature | Description |
|---|---|
| **One-Command Deployment** | Launch the full orchestration process with a single `npx dactyclaw` command. |
| **Autonomous Agent Lifecycle** | Automatic DNA generation, wallet provisioning, balance monitoring, and contract deployment. |
| **Base Mainnet Native** | Direct ERC-20 token deployment on Base via Clanker smart contracts. |
| **Serverless Agent Tracking** | All deployed agents are logged to an independent JSONBin database in real-time. |
| **Live Web Dashboard** | Terminal-themed responsive UI with live leaderboard, agent feed, and deployment documentation. |
| **Self-Funding Loop** | Continuous balance polling with automatic deployment trigger once funding threshold is met. |
| **CORS Proxy Router** | Built-in local proxy server for secure API communication without exposing credentials. |

---

## Architecture

Dactyclaw follows a modular architecture consisting of three primary layers:

```
┌─────────────────────────────────────────────────────────┐
│                     Web Dashboard                       │
│  ┌──────────┐  ┌──────────┐  ┌────────┐  ┌──────────┐  │
│  │   Home   │  │  Agents  │  │ Leader │  │   Docs   │  │
│  │          │  │   Feed   │  │ board  │  │          │  │
│  └──────────┘  └──────────┘  └────────┘  └──────────┘  │
└─────────────────────┬───────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────┐
│                   Proxy Router                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  /api/tokens │  │ /api/agents  │  │   CORS HDR   │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────┬───────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────┐
│                  CLI Orchestrator                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────────┐  │
│  │  Agent   │  │  Wallet  │  │  Clanker Contract    │  │
│  │   DNA    │  │  Funding │  │  Deployment Engine   │  │
│  └──────────┘  └──────────┘  └──────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

**Data Flow:**
1. The CLI Orchestrator generates agent credentials and monitors wallet balances.
2. Upon receiving sufficient ETH, the orchestrator triggers Clanker contract deployment.
3. Deployment metadata is pushed to JSONBin (serverless database).
4. The Proxy Router securely serves data to the Web Dashboard.
5. The Web Dashboard renders live agent feeds and leaderboard data.

---

## CLI Reference

### Primary Command

```bash
npx dactyclaw [options]
```

### Options

| Flag | Description |
|---|---|
| `--name <name>` | Specify a custom agent name (default: auto-generated). |
| `--ticker <symbol>` | Set the token ticker symbol. |
| `--image <url>` | Provide a custom token image URL. |
| `--help` | Display usage information. |

### Example

```bash
npx dactyclaw --name "SentinelAlpha" --ticker "SNTL"
```

---

## Web Dashboard

The Dactyclaw web interface is a fully responsive, terminal-themed dashboard built with vanilla HTML, CSS, and JavaScript. It provides real-time visibility into the protocol's operations.

### Pages

| Page | Description |
|---|---|
| **Home** | Protocol overview, feature highlights, and ecosystem statistics. |
| **Agents** | Live feed of all tokens deployed through the Dactyclaw protocol, sourced from the independent serverless database. |
| **Leaderboard** | Broader agent token network rankings with auto-refresh every 30 seconds. |
| **Deploy** | Interactive documentation with deployment commands and configuration guides. |
| **Docs** | Complete CLI reference, architecture documentation, and external resource links. |

---

## Project Structure

```
dactyclaw/
├── index.html          # Web dashboard (single-page application)
├── proxy.js            # CORS proxy router for API endpoints
├── package.json        # NPM package configuration and dependencies
├── bin/
│   ├── dactyclaw.js    # Main CLI orchestrator (autonomous deployment loop)
│   ├── dacty-create.js # Agent DNA and wallet generator
│   └── dacty-launch.js # Token deployment executor
├── .gitignore          # Git exclusion rules
└── README.md           # This file
```

---

## Contributing

Contributions are welcome. To get started:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request against `main`.

Please ensure all commits follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

---

## Resources

- **Twitter (X):** [@dactyclaw](https://x.com/dactyclaw)
- **GitHub:** [dactyclaw/dactyclaw](https://github.com/dactyclaw/dactyclaw)
- **Clanker:** [clanker.world](https://clanker.world)

---

## License

This project is licensed under the [MIT License](LICENSE).
