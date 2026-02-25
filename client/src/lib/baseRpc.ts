/**
 * Base Blockchain RPC Service
 * Menggunakan public RPC endpoint untuk query data dari Clawncher contracts
 */

const BASE_RPC_URL = 'https://mainnet.base.org';
const BASE_SEPOLIA_RPC_URL = 'https://sepolia.base.org';

// Clawncher Contract Addresses (Base Mainnet)
export const CLAWNCHER_CONTRACTS = {
  FACTORY: '0xE85A59c628F7d27878ACeB4bf3b35733630083a9',
  LP_LOCKER: '0x63D2DfEA64b3433F4071A98665bcD7Ca14d93496',
  FEE_LOCKER: '0xF3622742b1E446D92e45E22923Ef11C2fcD55D68',
  MEV_MODULE: '0xebB25BB797D82CB78E1bc70406b13233c0854413',
  VAULT: '0x8E845EAd15737bF71904A30BdDD3aEE76d6ADF6C',
};

export interface RpcResponse<T> {
  jsonrpc: string;
  id: number;
  result?: T;
  error?: {
    code: number;
    message: string;
  };
}

export interface LogEntry {
  address: string;
  topics: string[];
  data: string;
  blockNumber: string;
  transactionHash: string;
  transactionIndex: string;
  blockHash: string;
  logIndex: string;
  removed: boolean;
}

/**
 * Membuat JSON-RPC call ke Base RPC endpoint
 */
async function rpcCall<T>(method: string, params: any[]): Promise<T> {
  try {
    const response = await fetch(BASE_RPC_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method,
        params,
      }),
    });

    const data: RpcResponse<T> = await response.json();

    if (data.error) {
      throw new Error(`RPC Error: ${data.error.message}`);
    }

    return data.result as T;
  } catch (error) {
    console.error(`RPC call failed for ${method}:`, error);
    throw error;
  }
}

/**
 * Mendapatkan latest block number
 */
export async function getLatestBlockNumber(): Promise<number> {
  const blockNumberHex = await rpcCall<string>('eth_blockNumber', []);
  return parseInt(blockNumberHex, 16);
}

/**
 * Query logs dari contract (untuk event tracking)
 * Ini digunakan untuk mendapatkan token deployments, trades, burns, dll
 */
export async function getLogs(
  address: string,
  fromBlock: string | number = 'latest',
  toBlock: string | number = 'latest',
  topics?: string[]
): Promise<LogEntry[]> {
  const params = [
    {
      address,
      fromBlock: typeof fromBlock === 'number' ? `0x${fromBlock.toString(16)}` : fromBlock,
      toBlock: typeof toBlock === 'number' ? `0x${toBlock.toString(16)}` : toBlock,
      ...(topics && { topics }),
    },
  ];

  return rpcCall<LogEntry[]>('eth_getLogs', params);
}

/**
 * Mendapatkan balance dari address
 */
export async function getBalance(address: string, blockTag: string = 'latest'): Promise<string> {
  return rpcCall<string>('eth_getBalance', [address, blockTag]);
}

/**
 * Call contract function (read-only)
 */
export async function callContract(
  to: string,
  data: string,
  blockTag: string = 'latest'
): Promise<string> {
  return rpcCall<string>('eth_call', [
    {
      to,
      data,
    },
    blockTag,
  ]);
}

/**
 * Mendapatkan transaction receipt
 */
export async function getTransactionReceipt(txHash: string) {
  return rpcCall('eth_getTransactionReceipt', [txHash]);
}

/**
 * Mendapatkan block details
 */
export async function getBlock(blockNumber: string | number = 'latest') {
  const blockParam = typeof blockNumber === 'number' ? `0x${blockNumber.toString(16)}` : blockNumber;
  return rpcCall('eth_getBlockByNumber', [blockParam, false]);
}

/**
 * Decode log topics untuk mendapatkan event name
 * Ini adalah common event signatures untuk token/DEX events
 */
export const EVENT_SIGNATURES = {
  // ERC20 Transfer
  TRANSFER: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
  // Uniswap V4 Swap
  SWAP: '0xc42079f94a6350d7e6235f29174924f928cc2ac818eb64fed8004e115fbcca67',
  // Uniswap V4 Mint
  MINT: '0x7a53080ba414158be7ec69b987b5fb7d07dee101fe85b1db05aeb5d2a27d4e6d',
  // Token Deployment (custom event)
  TOKEN_DEPLOYED: '0x0000000000000000000000000000000000000000000000000000000000000000',
};

/**
 * Helper untuk decode address dari log data
 */
export function decodeAddress(data: string): string {
  // Remove 0x prefix dan ambil last 40 characters (20 bytes)
  const hex = data.slice(-40);
  return `0x${hex}`;
}

/**
 * Helper untuk decode uint256 dari log data
 */
export function decodeUint256(data: string): string {
  return data.slice(-64);
}

/**
 * Fetch recent token deployments dari Clawncher Factory
 */
export async function getRecentTokenDeployments(limit: number = 10) {
  try {
    const currentBlock = await getLatestBlockNumber();
    const fromBlock = Math.max(0, currentBlock - 5000); // Last 5000 blocks

    const logs = await getLogs(
      CLAWNCHER_CONTRACTS.FACTORY,
      fromBlock,
      currentBlock,
      // Filter untuk TokenDeployed events (topic 0)
      ['0x0000000000000000000000000000000000000000000000000000000000000001']
    );

    return logs.slice(0, limit);
  } catch (error) {
    console.error('Failed to fetch token deployments:', error);
    return [];
  }
}

/**
 * Fetch recent swap/trade events
 */
export async function getRecentSwaps(limit: number = 10) {
  try {
    const currentBlock = await getLatestBlockNumber();
    const fromBlock = Math.max(0, currentBlock - 1000); // Last 1000 blocks

    const logs = await getLogs(
      CLAWNCHER_CONTRACTS.LP_LOCKER,
      fromBlock,
      currentBlock,
      [EVENT_SIGNATURES.SWAP]
    );

    return logs.slice(0, limit);
  } catch (error) {
    console.error('Failed to fetch swaps:', error);
    return [];
  }
}

/**
 * Fetch recent burn events
 */
export async function getRecentBurns(limit: number = 10) {
  try {
    const currentBlock = await getLatestBlockNumber();
    const fromBlock = Math.max(0, currentBlock - 2000); // Last 2000 blocks

    // Query transfer events ke address 0x0 (burn)
    const logs = await getLogs(
      CLAWNCHER_CONTRACTS.FACTORY,
      fromBlock,
      currentBlock,
      [EVENT_SIGNATURES.TRANSFER]
    );

    return logs.slice(0, limit);
  } catch (error) {
    console.error('Failed to fetch burns:', error);
    return [];
  }
}

/**
 * Get contract statistics
 */
export async function getClawnchStats() {
  try {
    const currentBlock = await getLatestBlockNumber();
    const blockData = await getBlock(currentBlock) as any;

    return {
      currentBlock,
      timestamp: blockData?.timestamp,
      gasLimit: blockData?.gasLimit,
    };
  } catch (error) {
    console.error('Failed to fetch stats:', error);
    return null;
  }
}
