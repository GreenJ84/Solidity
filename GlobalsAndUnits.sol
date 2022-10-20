// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.4.0 < 0.9.0;

contract GlobalsAndUnits {

/*
Value types
    - True/false
    bool booleType;

    - Integers
    int intType;

    - Un-assigned Integers
    uint uIntType;

    - blockchain Address
    address addressType;

    - Arbitrary length of raw bytes
    byte byteType;

    - arbitrary length UTF 8 encoded string
    string stringType;
*/

/// @dev Creating a contract variable 'createdTime' of Type 'uint' available to all contracts
uint256 public createdTime;

/// @dev Set 'createdTime' to now
constructor() {
    createdTime = block.timestamp;
}

/// @dev Creating a variable 'output' of Type 'string' available to all contracts
string public output = 'oldValue';

/// @dev Function retrieving a sender of contract call
function getSenderAddress() public view returns ( address ){
    return msg.sender;
}


/// @dev Get current block number
function getBlockNumber() public view returns (uint256) {
    return block.number;
}

// Get current time value through now attribute
function checkTimeValues(uint secondsAfter) public {
    if (block.timestamp >= createdTime + secondsAfter){
        output = 'newValue';
    }
}

}
