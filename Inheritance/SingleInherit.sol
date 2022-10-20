// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.0 <0.9.0;


// Super(Parent) contract single inheritance in solidity
contract Parent {

  //this field is inherited
  uint public parentAttr;
  
  //this method is also inherited
  function setValue() public returns (string memory) {
      parentAttr += 2;
      return "Inherit this!";
  }
  
}

// Inherited(Child) contract
contract Child is Parent {

  function getValue() external view returns( uint ){
    return parentAttr;
  }

  //? is setValue inherited (Yes)
}

// Calling contract
contract caller {

    // Creating child contract object
    Child cc = new Child();  

    // Defining function to call
    // setValue and getValue functions
    function testInheritance(
    ) public returns (uint) { 
        cc.setValue(); 
        return cc.getValue(); 
    } 
}