// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.0 <0.9.0;


//! Very similar structure to JS Arrays and Class

// Practice the arrays and structs
contract StructsArray {
    
    // Create a struce named 'Employee'
    struct Employee {
        string name;
        uint age;
    }
    
    // Create an Array of Employee instances
    Employee[] employees;
    
    // Create a new Employee instance and add it to the array
    function addEmployee(string memory name, uint256 age) public {
        employees.push(Employee(name, age));
    }
    
    // Given an array index, get the details of the Employee at that index
    function getEmployee(uint index) public view returns (string memory name, uint age) {
        name =  employees[index].name;
        age = employees[index].age;
    }
    
    // Count the Employees in the array
    function getEmployeeCount() public view returns (uint count) {
        count = employees.length;
    }
}
