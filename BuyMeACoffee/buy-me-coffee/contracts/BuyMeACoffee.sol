//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.9;

contract BuyMeACoffee {

    event NewMemo(
        Memo
    );

    struct Memo {
        address from;
        uint256 timestamp;
        string name;
        string message;
    }

    Memo[] memos;

    address payable owner;

    constructor(){
        owner = payable(msg.sender);
    }

    /** 
    * @dev 
    * Modify function so that the calling amount is greater than 0
    */
    modifier validBuy {
        require(msg.value > 0, "Can't buy a coffee with nothing!");
        _;
    }

    /** 
    * @dev 
    * Function individuals call to pay you coffee
    */
    function buyCoffee(string memory _name, string memory _message) public payable validBuy{
        memos.push(
            Memo(
                msg.sender,
                block.timestamp,
                _name,
                _message
            )
        );

        emit NewMemo( memos[memos.length-1] );
    }

    /** 
    * @dev 
    * Modifier makes sure function caller is the owner
    */
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    /** 
    * @dev 
    * When called by owner sends entire coffee balance to owner wallet
    */
    function withdrawTips() public onlyOwner{
        require(owner.send(address(this).balance));
    }

    /** 
    * @dev 
    * Returns all memos created
    */
    function getMemos() public view returns(Memo[] memory){
        return memos;
    }

}