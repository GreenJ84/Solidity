//* "Hello World" of Solidity

// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.4.0 < 0.9.0;

contract SimpleStorage {

    // Contract state
    uint storedData;

    function set(uint x) public{
        storedData = x;
    }

    function get() public view returns (uint){
        return storedData;
    }
}