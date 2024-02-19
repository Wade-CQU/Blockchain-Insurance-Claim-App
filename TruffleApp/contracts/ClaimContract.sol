// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
contract ClaimContract {

    struct ClaimInformation{
        string claimNumber;
        string accNumber;
        string firstName;
        string lastName;
        string email;
        string vehcileReg;
        string accidentDesc;
        string dateOfAccident;
        string progress;
    }

    ClaimInformation public claimInformation;

    constructor() public{
        claimInformation.claimNumber = "default";
        claimInformation.accNumber = "default";
        claimInformation.firstName = "default";
        claimInformation.lastName = "default";
        claimInformation.email = "default";
        claimInformation.vehcileReg = "default";
        claimInformation.accidentDesc = "default";
        claimInformation.dateOfAccident = "default";
        claimInformation.progress = "default";
    }

    function getClaimInfo() public view returns(ClaimInformation memory) {
        return claimInformation;
    }

    function setClaimInfo(string memory _claimNumber, string memory _accNumber, string memory _firstName, string memory _lastName, string memory _email, 
                            string memory _vehicleReg, string memory _accidentDesc, string memory _dateOfAccident, string memory _progress) public {
        claimInformation.claimNumber = _claimNumber;
        claimInformation.accNumber = _accNumber;
        claimInformation.firstName = _firstName;
        claimInformation.lastName = _lastName;
        claimInformation.email = _email;
        claimInformation.vehcileReg = _vehicleReg;
        claimInformation.accidentDesc = _accidentDesc;
        claimInformation.dateOfAccident = _dateOfAccident;
        claimInformation.progress = _progress;
    }
}