// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Web3JobPortalToken is ERC20, Ownable {
    uint256 public constant TOTAL_SUPPLY = 1000000 * 10 ** 18; // 1 million tokens with 18 decimals
    address public deployer;

    // Constructor that initializes the token with a name, symbol, and initial supply
    constructor(
        uint256 initialSupply
    ) ERC20("TaskHubToken", "THT") Ownable(msg.sender) {
        require(
            initialSupply <= TOTAL_SUPPLY,
            "Initial supply exceeds total supply"
        );
        deployer = msg.sender; // Store the deployer's address
        _mint(msg.sender, initialSupply);
    }

    /**
     * @notice Mints new tokens to a specified address.
     * @param to The address to receive the new tokens.
     * @param amount The amount of tokens to be minted.
     */
    function mint(address to, uint256 amount) external onlyOwner {
        require(
            totalSupply() + amount <= TOTAL_SUPPLY,
            "Minting would exceed total supply"
        );
        _mint(to, amount);
    }

    /**
     * @notice Burns tokens from a specified address.
     * @param from The address whose tokens will be burned.
     * @param amount The amount of tokens to be burned.
     */
    function burn(address from, uint256 amount) external onlyOwner {
        _burn(from, amount);
    }

    /**
     * @notice Overrides the update function to enforce the 50% holding rule.
     * @param from The address of the sender.
     * @param to The address of the recipient.
     * @param amount The amount of tokens to transfer.
     */
    function _update(
        address from,
        address to,
        uint256 amount
    ) internal override {
        if (to != address(0) && to != deployer) {
            uint256 newBalance = balanceOf(to) + amount;
            require(
                newBalance <= (TOTAL_SUPPLY / 2),
                "Cannot hold more than 50% of total supply"
            );
        }
        super._update(from, to, amount);
    }
}
