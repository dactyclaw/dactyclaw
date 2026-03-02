<p align="center">
  <strong>DECTYCLAW</strong><br>
  <em>Autonomous On-Chain Agent Orchestration Protocol</em>
</p>

---

## Introduction

DECTYCLAW is a fully autonomous, self-sustaining protocol designed to deploy, manage, and monitor AI-powered on-chain agents on the **Base network**. It combines a powerful command-line interface with a modern web dashboard, enabling developers and operators to launch ERC-20 tokens through [Clanker](https://clanker.world) with zero manual intervention after initialization.

Unlike traditional token launchers that require step-by-step user interaction, DECTYCLAW operates as a continuous orchestration process. Once started, it autonomously generates agent identities, provisions Ethereum wallets, monitors funding status, and executes smart contract deployments—all within a single terminal session.

Every agent deployed through DECTYCLAW is automatically tracked via an independent serverless database, ensuring complete data sovereignty without reliance on third-party infrastructure.

---

## Getting Started

### Prerequisites

- **Node.js** v18 or later
- **npm** v9 or later
- An Ethereum wallet funded with at least **0.0005 ETH** on the Base network

### Installation

No installation is required. DECTYCLAW runs directly via `npx`:

```bash
npx DECTYCLAW
```

### What Happens Next

Once the process starts, DECTYCLAW will:

1. **Generate Agent Identity** — Creates a unique DNA signature and agent profile.
2. **Provision Wallet** — Generates a new Ethereum keypair for the agent.
3. **Monitor Balance** — Continuously polls the wallet until the funding threshold is reached.
4. **Deploy Contract** — Automatically submits an ERC-20 token deployment transaction via Clanker.
5. **Sync to Dashboard** — Pushes the deployed agent metadata to the serverless tracking database.

The entire process is non-interactive after the initial command execution.

---

## Key Features

| Feature | Description |
|---|---|
| **One-Command Deployment** | Launch the full orchestration process with a single `npx DECTYCLAW` command. |
| **Autonomous Agent Lifecycle** | Automatic DNA generation, wallet provisioning, balance monitoring, and contract deployment. |
| **Base Mainnet Native** | Direct ERC-20 token deployment on Base via Clanker smart contracts. |
| **Serverless Agent Tracking** | All deployed agents are logged to an independent serverless database in real-time. |
| **Live Web Dashboard** | Terminal-themed responsive UI with live leaderboard, agent feed, and deployment documentation. |
| **Self-Funding Loop** | Continuous balance polling with automatic deployment trigger once funding threshold is met. |

---

## Architecture

DECTYCLAW follows a modular architecture consisting of three primary layers:

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
│                  Secure API Layer                        │
│        Handles routing and credential isolation          │
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
3. Deployment metadata is pushed to the serverless tracking database.
4. The Secure API Layer routes data to the Web Dashboard without exposing credentials.
5. The Web Dashboard renders live agent feeds and leaderboard data.

---

## CLI Reference

### Primary Command

```bash
npx DECTYCLAW [options]
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
npx DECTYCLAW --name "SentinelAlpha" --ticker "SNTL"
```

---

## Web Dashboard

The DECTYCLAW web interface is a fully responsive, terminal-themed dashboard built with vanilla HTML, CSS, and JavaScript. It provides real-time visibility into the protocol's operations.

### Pages

| Page | Description |
|---|---|
| **Home** | Protocol overview, feature highlights, and ecosystem statistics. |
| **Agents** | Live feed of all tokens deployed through the DECTYCLAW protocol, sourced from the independent serverless database. |
| **Leaderboard** | Broader agent token network rankings with auto-refresh every 30 seconds. |
| **Deploy** | Interactive documentation with deployment commands and configuration guides. |
| **Docs** | Complete CLI reference, architecture documentation, and external resource links. |

---

## Supported Networks

| Network | Status | Token Standard |
|---|---|---|
| **Base Mainnet** | Live | ERC-20 |

DECTYCLAW is purpose-built for the Base network. All contract deployments, wallet provisioning, and balance monitoring operate exclusively on Base Mainnet through the Clanker deployment infrastructure.

---

## Security

DECTYCLAW is designed with security as a first-class concern:

- **Local Key Storage** — All private keys and wallet credentials are generated and stored locally on your machine. They are never transmitted to external servers.
- **Credential Isolation** — API keys and authentication tokens are managed through environment variables and are never committed to version control.
- **Non-Custodial** — DECTYCLAW does not hold, manage, or have access to user funds. Wallet interactions are executed directly on-chain.

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

- **Twitter (X):** [@DECTYCLAW](https://x.com/DECTYCLAW)
- **GitHub:** [DECTYCLAW/DECTYCLAW](https://github.com/DECTYCLAW/DECTYCLAW)
- **Clanker:** [clanker.world](https://clanker.world)

---

## License

This project is licensed under the [MIT License](LICENSE).
