// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

contract JobTreasury {
    struct JobSchema {
        string uid;
        uint256 totalAmount;
        uint256 flashLoanAmount;
        address payable assignedTo;
        address employer;
        bool isLoanTaken;
    }

    mapping(string => JobSchema) private allJobs;

    modifier onlyUserValidForLoan(string memory _jobId) {
        // Example reputation check placeholder
        // require(checkUserReputation(msg.sender), "User reputation invalid");
        require(
            allJobs[_jobId].assignedTo == msg.sender,
            "Only assigned user can request this loan"
        );
        _;
    }

    function getLoan(string memory _jobUid)
        external
        payable
        onlyUserValidForLoan(_jobUid)
    {
        if (allJobs[_jobUid].flashLoanAmount > 0) {
            uint256 loanAmount = allJobs[_jobUid].flashLoanAmount;
            allJobs[_jobUid].isLoanTaken = true;

            payable(msg.sender).transfer(loanAmount);
        }
    }

    modifier onlyUserValidToAddJob() {
        // Example reputation check placeholder
        // require(checkEmployeeReputation(msg.sender), "Employee reputation invalid");
        _;
    }

    function addJob(
        string memory _uid,
        uint256 _totalAmount,
        uint256 _flashLoanAmount,
        address payable _assignedTo
    ) external payable onlyUserValidToAddJob {
        JobSchema memory newJob = JobSchema(
            _uid,
            _totalAmount,
            _flashLoanAmount,
            _assignedTo,
            msg.sender,
            false
        );
        allJobs[_uid] = newJob;
    }

    function getJob(string memory _uid)
        external
        view
        returns (JobSchema memory)
    {
        return allJobs[_uid];
    }

    function updateJobAssign(string memory _jobUid, address payable _assignedTo)
        public
    {
        allJobs[_jobUid].assignedTo = _assignedTo;
    }

    function releaseFund(string memory _jobId) public {
        require(msg.sender == allJobs[_jobId].employer);
        if (allJobs[_jobId].isLoanTaken) {
            uint256 remainingAmount = allJobs[_jobId].totalAmount -
                allJobs[_jobId].flashLoanAmount;
            payable(allJobs[_jobId].assignedTo).transfer(remainingAmount);
        } else {
            payable(allJobs[_jobId].assignedTo).transfer(
                allJobs[_jobId].totalAmount
            );
        }
    }
}
