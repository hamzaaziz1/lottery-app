

import "hardhat/console.sol";
 // SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract lottery{
    address public manager;
    address payable [] public players;
    address payable public winner1;
    mapping(address => uint256) balances;

    constructor()  {
        manager=msg.sender;
        
    }
    function enter() public payable {
        
        require(msg.value == 1 && players.length < 2 , "error");
        players.push(payable(msg.sender));
        console.log("Successful");
    }
    function random () private view returns (uint) //psuedo random number generator
    {
        bytes memory b = abi.encodePacked(block.difficulty,block.timestamp,players); //packing them together into bytes
       
        return uint(keccak256(b));
    }
    function winner() public payable 
    {
        require(msg.sender==manager, "needs to be a manager");
        uint index=random()%players.length;
        winner1 = players[index];
        // console.log(address(this).balance);
        winner1.transfer(address(this).balance);
        
       // balances[winner1] += address(this).balance ;

    }

        function balanceOf(address account) external view returns (uint256) {
        return account.balance;
    }





}

