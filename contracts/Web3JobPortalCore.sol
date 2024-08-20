// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Web3JobPortalStorage.sol";
import "./IWeb3JobPortal.sol";

abstract contract Web3JobPortalCore is Web3JobPortalStorage, IWeb3JobPortal {
    function postJob(
        string memory _jobTitle,
        string memory _jobDescription,
        uint256 _salary
    ) public override {
        uint256 newJobId = _getNextJobId();
        jobs[newJobId] = Job(
            msg.sender,
            _jobTitle,
            _jobDescription,
            _salary,
            true,
            address(0)
        );
        emit JobPosted(
            newJobId,
            msg.sender,
            _jobTitle,
            _jobDescription,
            _salary
        );
    }

    function applyForJob(
        uint256 _jobId,
        string memory _coverLetterIpfsHash,
        string memory _resumeIpfsHash
    ) public override {
        require(jobs[_jobId].isOpen, "Job is not open");
        jobApplications[_jobId].push(
            Application(msg.sender, _coverLetterIpfsHash, _resumeIpfsHash)
        );
        emit ApplicationSubmitted(
            _jobId,
            msg.sender,
            _coverLetterIpfsHash,
            _resumeIpfsHash
        );
    }

    function hireEmployee(uint256 _jobId, address _employee) public override {
        require(
            jobs[_jobId].employer == msg.sender,
            "Only the employer can hire"
        );
        require(jobs[_jobId].isOpen, "Job is not open");
        jobs[_jobId].isOpen = false;
        jobs[_jobId].hiredEmployee = _employee;
        emit EmployeeHired(_jobId, _employee);
    }

    function raiseDispute(
        string memory _description,
        address _target,
        bool isAgainstEmployer
    ) public override {
        uint256 newDisputeId = _getNextDisputeId();
        disputes[newDisputeId] = Dispute(
            msg.sender,
            _target,
            isAgainstEmployer,
            _description,
            false
        );
        emit DisputeRaised(
            newDisputeId,
            msg.sender,
            _target,
            isAgainstEmployer,
            _description
        );
    }
}
