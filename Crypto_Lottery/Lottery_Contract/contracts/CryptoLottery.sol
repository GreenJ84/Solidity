// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract CryptoLottery {
  address public manager;
  uint public entryFee;
  address payable[] public participants;


  constructor() {
    manager = msg.sender;
  }

  modifier onlyManager() {
        require(msg.sender == manager, "You are not the manager");
        _;
  }

  function setEntry(uint amt) public onlyManager{
    entryFee = amt;
  }

  modifier validEntry() {
    require(msg.value > entryFee, "Not enough for even 1 entry");
    _;
  }
  function newEntry() public payable validEntry{
    participants.push(payable(msg.sender));
  }


  function random() public view returns(uint){
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, participants)))%participants.length;
    }

  function drawWinner() public onlyManager{
    uint rand = random();
    address payable winner = participants[rand];
    payWinner(winner);
    participants = new address payable[](0);
  }

  function payWinner(address payable _winner) public onlyManager{
    require(_winner.send(address(this).balance));
  }
}