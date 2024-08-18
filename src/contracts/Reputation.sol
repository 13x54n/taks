// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ReputationSystem {
    // Define a single struct for all roles
    struct Profile {
        int reputation;        // Reputation can be positive or negative
        uint successCount;
        uint failureCount;
        uint reportCount;
        uint totalDisputes;
        bool initialized;
    }

    // Mappings to store data for each role
    mapping(address => Profile) public jurors;
    mapping(address => Profile) public employers;
    mapping(address => Profile) public employees;

    // Events
    event ProfileInitialized(address indexed profileAddress, string role, int initialReputation);
    event MetricsUpdated(address indexed profileAddress, uint successCount, uint failureCount, uint reportCount, uint totalDisputes, int newReputation);

    // Function to initialize a new juror with default values
    function initializeJuror(address _jurorAddress) external {
        require(!jurors[_jurorAddress].initialized, "Juror already initialized");

        jurors[_jurorAddress] = Profile({
            reputation: 4,  // Starting reputation
            successCount: 0,
            failureCount: 0,
            reportCount: 0,
            totalDisputes: 0,
            initialized: true
        });

        emit ProfileInitialized(_jurorAddress, "Juror", 4);
    }

    // Function to initialize a new employer with default values
    function initializeEmployer(address _employerAddress) external {
        require(!employers[_employerAddress].initialized, "Employer already initialized");

        employers[_employerAddress] = Profile({
            reputation: 4,  // Starting reputation
            successCount: 0,
            failureCount: 0,
            reportCount: 0,
            totalDisputes: 0,
            initialized: true
        });

        emit ProfileInitialized(_employerAddress, "Employer", 4);
    }

    // Function to initialize a new employee with default values
    function initializeEmployee(address _employeeAddress) external {
        require(!employees[_employeeAddress].initialized, "Employee already initialized");

        employees[_employeeAddress] = Profile({
            reputation: 4,  // Starting reputation
            successCount: 0,
            failureCount: 0,
            reportCount: 0,
            totalDisputes: 0,
            initialized: true
        });

        emit ProfileInitialized(_employeeAddress, "Employee", 4);
    }

    modifier _checkOwnership(address _address) {
        require(msg.sender == _address,"Invalid user");
        _;
    }

    // Function to update metrics for jurors
    function updateJurorMetrics(address _jurorAddress, uint _successCount, uint _failureCount, uint _reportCount) _checkOwnership(_jurorAddress) external {
        Profile storage profile = jurors[_jurorAddress];

        require(profile.initialized, "Juror not initialized");

        profile.successCount += _successCount;
        profile.failureCount += _failureCount;
        profile.reportCount += _reportCount;
        profile.totalDisputes += _successCount + _failureCount;

        int newReputation = calculateReputation(profile);

        profile.reputation = newReputation;

        emit MetricsUpdated(_jurorAddress, profile.successCount, profile.failureCount, profile.reportCount, profile.totalDisputes, newReputation);
    }

    // Function to update metrics for employers
    function updateEmployerMetrics(address _employerAddress, uint _successCount, uint _failureCount, uint _reportCount) _checkOwnership(_employerAddress) external {
        Profile storage profile = employers[_employerAddress];

        require(profile.initialized, "Employer not initialized");

        profile.successCount += _successCount;
        profile.failureCount += _failureCount;
        profile.reportCount += _reportCount;
        profile.totalDisputes += _successCount + _failureCount;

        int newReputation = calculateReputation(profile);

        profile.reputation = newReputation;

        emit MetricsUpdated(_employerAddress, profile.successCount, profile.failureCount, profile.reportCount, profile.totalDisputes, newReputation);
    }

    // Function to update metrics for employees
    function updateEmployeeMetrics(address _employeeAddress, uint _successCount, uint _failureCount, uint _reportCount) _checkOwnership(_employeeAddress) external {
        Profile storage profile = employees[_employeeAddress];

        require(profile.initialized, "Employee not initialized");

        profile.successCount += _successCount;
        profile.failureCount += _failureCount;
        profile.reportCount += _reportCount;
        profile.totalDisputes += _successCount + _failureCount;

        int newReputation = calculateReputation(profile);

        profile.reputation = newReputation;

        emit MetricsUpdated(_employeeAddress, profile.successCount, profile.failureCount, profile.reportCount, profile.totalDisputes, newReputation);
    }

    // Function to calculate reputation based on success, failure, and report counts
    function calculateReputation(Profile memory profile) internal pure returns (int) {
        int reputationChange = int(profile.successCount) - int(profile.failureCount) - int(profile.reportCount);
        int newReputation = profile.reputation + reputationChange;
        return min(max(newReputation, 0), 100);
    }

    // Helper function for int bounds 
    function max(int a, int b) internal pure returns (int) {
        return a >= b ? a : b;
    }

    function min(int a, int b) internal pure returns (int) {
        return a <= b ? a : b;
    }

    // Function to get a juror's data
    function getJurorData(address _jurorAddress) external view returns (int reputation, uint successCount, uint failureCount, uint reportCount, uint totalDisputes, bool initialized) {
        Profile memory profile = jurors[_jurorAddress];
        return (profile.reputation, profile.successCount, profile.failureCount, profile.reportCount, profile.totalDisputes, profile.initialized);
    }

    // Function to get an employer's data
    function getEmployerData(address _employerAddress) external view returns (int reputation, uint successCount, uint failureCount, uint reportCount, uint totalDisputes, bool initialized) {
        Profile memory profile = employers[_employerAddress];
        return (profile.reputation, profile.successCount, profile.failureCount, profile.reportCount, profile.totalDisputes, profile.initialized);
    }

    // Function to get an employee's data
    function getEmployeeData(address _employeeAddress) external view returns (int reputation, uint successCount, uint failureCount, uint reportCount, uint totalDisputes, bool initialized) {
        Profile memory profile = employees[_employeeAddress];
        return (profile.reputation, profile.successCount, profile.failureCount, profile.reportCount, profile.totalDisputes, profile.initialized);
    }
}
