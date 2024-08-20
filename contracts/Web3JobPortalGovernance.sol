// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/governance/Governor.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorCountingSimple.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotes.sol";
import "./Web3JobPortalCore.sol";

abstract contract Web3JobPortalGovernance is
    Web3JobPortalCore,
    Governor,
    GovernorCountingSimple,
    GovernorVotes
{
    constructor(
        IVotes _token
    ) Governor("Web3JobPortal") GovernorVotes(_token) {}

    function createDisputeProposal(
        uint256 _disputeId,
        address _target,
        bool isAgainstEmployer
    ) public override returns (uint256) {
        require(!disputes[_disputeId].resolved, "Dispute already resolved");
        string memory description = getDisputeDescription(
            _disputeId,
            _target,
            isAgainstEmployer
        );
        return
            propose(
                new address[](0),
                new uint256[](0),
                new bytes[](0),
                description
            );
    }

    function getDisputeDescription(
        uint256 _disputeId,
        address _target,
        bool isAgainstEmployer
    ) internal view returns (string memory) {
        return
            string(
                abi.encodePacked(
                    "Resolve dispute: ",
                    disputes[_disputeId].description,
                    " against ",
                    isAgainstEmployer ? "employer" : "employee",
                    " at address ",
                    toAsciiString(_target)
                )
            );
    }

    function executeDispute(
        uint256 _disputeId,
        uint256 _proposalId,
        address _target,
        bool isAgainstEmployer
    ) public override {
        require(
            state(_proposalId) == ProposalState.Succeeded,
            "Proposal must have succeeded"
        );
        require(
            disputes[_disputeId].target == _target,
            "Target address mismatch"
        );
        require(
            disputes[_disputeId].isAgainstEmployer == isAgainstEmployer,
            "Dispute type mismatch"
        );
        disputes[_disputeId].resolved = true;
        emit DisputeResolved(_disputeId, true);
    }

    function votingDelay() public pure override returns (uint256) {
        return 1;
    }

    function votingPeriod() public pure override returns (uint256) {
        return 45818;
    }

    function quorum(uint256) public pure override returns (uint256) {
        return 4;
    }

    function proposalThreshold() public pure override returns (uint256) {
        return 0;
    }

    function toAsciiString(address x) internal pure returns (string memory) {
        bytes memory s = new bytes(40);
        for (uint i = 0; i < 20; i++) {
            bytes1 b = bytes1(uint8(uint(uint160(x)) / (2 ** (8 * (19 - i)))));
            s[2 * i] = char(b >> 4);
            s[2 * i + 1] = char(b & 0x0f);
        }
        return string(s);
    }

    function char(bytes1 b) internal pure returns (bytes1) {
        if (uint8(b) < 10) return bytes1(uint8(b) + 0x30);
        else return bytes1(uint8(b) + 0x57);
    }
}
