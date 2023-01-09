// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract CryptoLottery {
  address public manager;
  uint public entryFee;
  address payable[] public participants;


  constructor(uint amount) {
    entryFee = amount;
    manager = msg.sender;
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

  modifier onlyManager() {
        require(msg.sender == manager);
        _;
  }
  function drawWinner() public onlyManager{
    uint rand = random();
    address payable winner = participants[rand];
    payWinner(winner);
    participants = new address payable[](0);
  }

  function payWinner(address payable _winner) public{
    require(_winner.send(address(this).balance));
  }
}
