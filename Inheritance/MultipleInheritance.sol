// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.0 <0.9.0;

// Solidity program to demonstrate Multiple Inheritance
//! Multiple Inheritance: a single contract can inherit many contracts 
// Contract inheriting 2+ other contracts

// Defining Parent contract A
contract A {

    // Declaring internal state variable
    string internal x;
    // Defining external function to set value of internal state variable x
    function setA() external {
        x = "GeeksForGeeks";
    }
}

// Defining Parent contract B
contract B { 

    // Declaring internal state variable
    uint internal pow; 

    // Defining external function to set value of internal state variable pow
    function setB() external { 
        uint a = 2;
        uint b = 20;
        pow = a ** b;
    }
} 

// Defining Child contract C, inheriting from Parent contracts A and B
contract C is A, B { 
  // Defining external function to return state variable x
    function getStr() external view returns(string memory) { 
        return x; 
    }
    
    // Defining external function to return state variable pow
    function getPow() external view returns(uint) { 
        return pow; 
    } 
} 

// Defining calling contract
contract caller { 
    // Creating object of contract C
    C contractC = new C(); 

    // Defining public function to return values from functions getStr and getPow
    function testInheritance() public returns(string memory, uint) { 
        contractC.setA(); 
        contractC.setB(); 
        return ( contractC.getStr(), contractC.getPow()); 
    } 
}