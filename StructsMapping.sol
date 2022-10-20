// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.0 <0.9.0;


//! Mappings can be seen as hash tables which are virtually initialized such that every possible key exists and is mapped to a value whose byte-representation is all zeros: a type’s default value. 
//! The similarity ends here, though: The key data is not actually stored in a mapping, only its keccak256 hash used to look up the value.
//! Because of this, mappings do not have a length or a concept of a key or value being “set”.
//! Mappings are only allowed for state variables (or as storage reference types in internal functions).

// Practice the mapping of structs
contract StructsMappings {
    
    struct Employee {
        string name;
        uint age;
    }
    
    //! Syntax (KEY_TYPE => VALUE_TYPE)
    // KEY_TYPE: any built-in types (no complex or reference types)
    // VALUE_TYPE: any type
    mapping (uint256 => Employee) employees;
    uint256 public count;
    
    function addEmployee(string memory name, uint256 age) public {
        employees[count++] = Employee(name, age);
    }

    function getEmployee(uint index) public view returns (string memory name, uint age) {
        name =  employees[index].name;
        age = employees[index].age;
    }
}
