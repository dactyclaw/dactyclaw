// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title DactyclawToken
 * @dev ERC20 token with fee distribution for Dactyclaw agents
 * Supports 80/20 fee split between agent and Dactyclaw
 */
contract DactyclawToken is ERC20, ERC20Burnable, Ownable {
    // Fee configuration
    uint256 public constant AGENT_FEE_BPS = 8000; // 80% in basis points
    uint256 public constant DACTYCLAW_FEE_BPS = 2000; // 20% in basis points
    uint256 public constant BASIS_POINTS = 10000;

    // Addresses
    address public agentWallet;
    address public dactyclawWallet;

    // Fee tracking
    uint256 public agentFeeAccumulated;
    uint256 public dactyclawFeeAccumulated;

    // Events
    event FeeDistributed(
        uint256 indexed timestamp,
        uint256 agentFee,
        uint256 dactyclawFee
    );

    event FeesWithdrawn(
        address indexed recipient,
        uint256 amount,
        string feeType
    );

    event WalletUpdated(
        address indexed oldWallet,
        address indexed newWallet,
        string walletType
    );

    /**
     * @dev Initialize token with agent and Dactyclaw wallet addresses
     * @param name Token name
     * @param symbol Token symbol
     * @param initialSupply Initial token supply (in wei)
     * @param _agentWallet Agent wallet address
     * @param _dactyclawWallet Dactyclaw wallet address
     */
    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply,
        address _agentWallet,
        address _dactyclawWallet
    ) ERC20(name, symbol) {
        require(_agentWallet != address(0), "Invalid agent wallet");
        require(_dactyclawWallet != address(0), "Invalid Dactyclaw wallet");

        agentWallet = _agentWallet;
        dactyclawWallet = _dactyclawWallet;

        _mint(msg.sender, initialSupply);
    }

    /**
     * @dev Calculate and distribute fees from a transaction
     * @param amount Transaction amount
     */
    function distributeFees(uint256 amount) external onlyOwner {
        uint256 agentFee = (amount * AGENT_FEE_BPS) / BASIS_POINTS;
        uint256 dactyclawFee = (amount * DACTYCLAW_FEE_BPS) / BASIS_POINTS;

        agentFeeAccumulated += agentFee;
        dactyclawFeeAccumulated += dactyclawFee;

        emit FeeDistributed(block.timestamp, agentFee, dactyclawFee);
    }

    /**
     * @dev Withdraw accumulated fees for agent
     */
    function withdrawAgentFees() external {
        require(msg.sender == agentWallet, "Only agent can withdraw agent fees");
        require(agentFeeAccumulated > 0, "No fees to withdraw");

        uint256 amount = agentFeeAccumulated;
        agentFeeAccumulated = 0;

        _transfer(address(this), agentWallet, amount);
        emit FeesWithdrawn(agentWallet, amount, "agent");
    }

    /**
     * @dev Withdraw accumulated fees for Dactyclaw
     */
    function withdrawDactyclawFees() external {
        require(
            msg.sender == dactyclawWallet,
            "Only Dactyclaw can withdraw Dactyclaw fees"
        );
        require(dactyclawFeeAccumulated > 0, "No fees to withdraw");

        uint256 amount = dactyclawFeeAccumulated;
        dactyclawFeeAccumulated = 0;

        _transfer(address(this), dactyclawWallet, amount);
        emit FeesWithdrawn(dactyclawWallet, amount, "dactyclaw");
    }

    /**
     * @dev Get accumulated fees for agent
     */
    function getAgentFees() external view returns (uint256) {
        return agentFeeAccumulated;
    }

    /**
     * @dev Get accumulated fees for Dactyclaw
     */
    function getDactyclawFees() external view returns (uint256) {
        return dactyclawFeeAccumulated;
    }

    /**
     * @dev Update agent wallet address
     */
    function updateAgentWallet(address newAgentWallet) external onlyOwner {
        require(newAgentWallet != address(0), "Invalid agent wallet");
        address oldWallet = agentWallet;
        agentWallet = newAgentWallet;
        emit WalletUpdated(oldWallet, newAgentWallet, "agent");
    }

    /**
     * @dev Update Dactyclaw wallet address
     */
    function updateDactyclawWallet(address newDactyclawWallet)
        external
        onlyOwner
    {
        require(newDactyclawWallet != address(0), "Invalid Dactyclaw wallet");
        address oldWallet = dactyclawWallet;
        dactyclawWallet = newDactyclawWallet;
        emit WalletUpdated(oldWallet, newDactyclawWallet, "dactyclaw");
    }

    /**
     * @dev Override transfer to support fee distribution
     */
    function transfer(address to, uint256 amount)
        public
        override
        returns (bool)
    {
        return super.transfer(to, amount);
    }

    /**
     * @dev Override transferFrom to support fee distribution
     */
    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) public override returns (bool) {
        return super.transferFrom(from, to, amount);
    }
}
