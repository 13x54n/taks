// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Web3JobPortalStorage {
    struct Job {
        address employer;
        string jobTitle;
        string jobDescription;
        uint256 salary;
        bool isOpen;
        address hiredEmployee;
    }

    struct Application {
        address applicant;
        string coverLetterIpfsHash;
        string resumeIpfsHash;
    }

    struct Dispute {
        address initiator;
        address target;
        bool isAgainstEmployer;
        string description;
        bool resolved;
    }

    uint256 internal _jobIdCounter;
    uint256 internal _disputeIdCounter;

    mapping(uint256 => Job) public jobs;
    mapping(uint256 => Application[]) public jobApplications;
    mapping(uint256 => Dispute) public disputes;

    event JobPosted(
        uint256 jobId,
        address employer,
        string jobTitle,
        string jobDescription,
        uint256 salary
    );
    event ApplicationSubmitted(
        uint256 jobId,
        address applicant,
        string coverLetterIpfsHash,
        string resumeIpfsHash
    );
    event EmployeeHired(uint256 jobId, address employee);
    event DisputeRaised(
        uint256 disputeId,
        address initiator,
        address target,
        bool isAgainstEmployer,
        string description
    );
    event DisputeResolved(uint256 disputeId, bool result);

    function _getNextJobId() internal returns (uint256) {
        _jobIdCounter++;
        return _jobIdCounter;
    }

    function _getNextDisputeId() internal returns (uint256) {
        _disputeIdCounter++;
        return _disputeIdCounter;
    }
}
