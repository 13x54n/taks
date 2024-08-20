// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Web3JobPortalGovernance.sol";

contract Web3JobPortal is Web3JobPortalGovernance {
    constructor(IVotes _token) Web3JobPortalGovernance(_token) {}
}
