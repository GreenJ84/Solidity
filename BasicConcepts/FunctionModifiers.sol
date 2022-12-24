// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.0 <0.9.0;

// Practice with modifiers
//! Setting the contract constructor tp recieve contract initiator (sender).
//! Use a modifier to check the owner of the contract and make sure they can run the function

contract FunctionModifiers {
    address owner;
    //set the owner to the deployer of the contract
    constructor(){
        owner = msg.sender;
    } 
    
    // Modifier w/o arguments
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this.");
        // The mark below tells where the actual function runs in relation to modifer code
        _;
    }

    // Gets results from the modifier to run function (run / dont run)
    function get() public view onlyOwner returns (string memory)  {
            return "hello solidity";
        }
    
}
