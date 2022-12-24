// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.0 <0.9.0;

// Solidity program to demonstrate
//! Hierarchical inheritance: a parent contract has more than one child contracts.
// Parent has 2+ Children

// Defining Parent contract A 
contract A { 
    // Declaring internal state variable
    string internal x;
    
    // Defining external function to set value of internalstate variable
    function getA() external {
        x = "GeeksForGeeks";
    } 

    // Declaring internal state variable
    uint internal sum; 

    // Defining external function to set the value of internal state variable sum 
    function setA() external { 
        uint a = 10;
        uint b = 20;
        sum = a + b;
    }
}

// Defining Child contract B inheriting Parent contract A
contract B is A { 
    // Defining external function to return state variable x
    function getAstr() external view returns(string memory){ 
        return x; 
    } 
}

// Defining Child contract C inheriting Parent contract A
contract C is A { 

    // Defining external function to return state variable sum
    function getAValue() external view returns(uint){ 
        return sum; 
    } 
}

// Defining calling contract   
contract caller {
    // Creating object of contract B      
    B contractB = new B(); 

    // Creating object of contract C
    C contractC = new C();  

    // Defining public function to return values of state variables x and sum
    function testInheritance() public view returns (string memory, uint) { 
        return (contractB.getAstr(), contractC.getAValue()); 
    } 
}