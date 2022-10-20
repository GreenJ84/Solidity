// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.0 <0.9.0;

//! Similar to single inheritance, except the levels of the relationship between the parent and the child. 
//! The child contract derived from a parent also acts as a parent for the contract which is derived from it.
// Generational inheritance so to say


// Solidity program to demonstrate Multi-Level Inheritance

// Defining Grand-Parent contract A
contract A { 
    // Declaring state variables
    string internal x;
    string a = "Geeks" ;
    string b = "For";

    // Defining external function to return concatenated string
    function getA() external{ 
        x = string(abi.encodePacked(a, b));
    } 
} 

// Defining Parent contract B inheriting Grand-Parent contract A
contract B is A { 
    // Declaring state variables of child contract B
    string public y;
    string c = "Geeks";

    // Defining external function to return concatenated string
    function getB() external { 
        y = string(abi.encodePacked(x, c));
    } 
} 

// Defining child contract C inheriting parent contract A
contract C is B { 
    // Defining external function 
    // returning concatenated string
    // generated in child contract B
    function getC() external view returns(string memory){ 
        return y; 
    } 
} 

// Defining calling contract 
contract caller {
    // Creating object of child C
    C cc = new C(); 

    // Defining public function to return final concatenated string 
    function testInheritance() public returns (string memory) { 
        cc.getA();
        cc.getB();
        return cc.getC(); 
    } 
}