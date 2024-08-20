// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IWeb3JobPortal {
    function postJob(
        string memory _jobTitle,
        string memory _jobDescription,
        uint256 _salary
    ) external;

    function applyForJob(
        uint256 _jobId,
        string memory _coverLetterIpfsHash,
        string memory _resumeIpfsHash
    ) external;

    function hireEmployee(uint256 _jobId, address _employee) external;

    function raiseDispute(
        string memory _description,
        address _target,
        bool isAgainstEmployer
    ) external;

    function createDisputeProposal(
        uint256 _disputeId,
        address _target,
        bool isAgainstEmployer
    ) external returns (uint256);

    function executeDispute(
        uint256 _disputeId,
        uint256 _proposalId,
        address _target,
        bool isAgainstEmployer
    ) external;
}
