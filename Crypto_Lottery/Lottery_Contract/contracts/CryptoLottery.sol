// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract CryptoLottery {
  event WinningAccount(address _winner);

  address public manager;
  uint public entryFee = 0;
  address payable[] public participants;


  constructor() {
    manager = msg.sender;
  }

  // Manager Functions Set Pool, Pick Winner(random), and Pay Winner
  modifier onlyManager() {
        require(msg.sender == manager, "You are not the manager");
        _;
  }
  function setEntry() public payable onlyManager{
    require(entryFee==0, "Cannot reset entry fee during an open session");
    require(msg.value>=1000000000000000, "Entry Fee must be over 1 finney");
    entryFee = msg.value;
    participants.push(payable(msg.sender));
  }
  function drawWinner() public onlyManager{
    uint rand = random();
    address payable winner = participants[rand];
    emit WinningAccount(winner);
    payWinner(winner);
    participants = new address payable[](0);
  }
  function payWinner(address payable _winner) public onlyManager{
    require(_winner.send(address(this).balance));
  }

  modifier validEntry() {
    require(participants.length>0, "Session not started for the next pool.");
    require(msg.value > entryFee, "Not enough for even 1 entry");
    _;
  }
  function newEntry() public payable validEntry{
    uint x = msg.value/entryFee;
    uint i;
    for(i = 0; i < x; i++){
        participants.push(payable(msg.sender));
    }
  }


  function random() public view returns(uint){
    return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, participants)))%participants.length;
  }
  function getParticipants() public view returns(uint){
    return participants.length;
  }
}