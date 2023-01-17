// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract ChainBattles is ERC721URIStorage{
    using Strings for uint256;
    using Counters for Counters.Counter;
    struct NFTData {
        string character;
        uint256 level;
        uint256 attack;
        uint256 speed;
        uint256 health;
    }

    Counters.Counter private _tokenIds;
    mapping(uint256 => NFTData) public tokenIdToData;

    constructor() ERC721 ("Chain Battles", "CBTLS"){
        
    }

    function generateCharacter(uint256 tokenId) public view returns(string memory){
        bytes memory svg = abi.encodePacked(
            '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350">',
            '<style>.base { fill: white; font-family: serif; font-size: 14px; }</style>',
            '<rect width="100%" height="100%" fill="black" />',
            '<text x="50%" y="30%" class="base" dominant-baseline="middle" text-anchor="middle">',getCharacter(tokenId),'</text>',
            '<text x="50%" y="40%" class="base" dominant-baseline="middle" text-anchor="middle">', "Levels: ",getLevel(tokenId),'</text>',
            '<text x="50%" y="50%" class="base" dominant-baseline="middle" text-anchor="middle">', "Levels: ",getAttack(tokenId),'</text>',
            '<text x="50%" y="60%" class="base" dominant-baseline="middle" text-anchor="middle">', "Levels: ",getSpeed(tokenId),'</text>',
            '<text x="50%" y="70%" class="base" dominant-baseline="middle" text-anchor="middle">', "Levels: ",getHealth(tokenId),'</text>',
            '</svg>'
        );
        return string(
            abi.encodePacked(
                "data:image/svg+xml;base64,", 
                Base64.encode(svg)
            )
        );
    }

    //# Get NFT Stats functions
    function getCharacter(uint256 tokenId) public view returns(string memory){
        string memory character = tokenIdToData[tokenId].character;
        return character;
    }
    function getLevel(uint256 tokenId) public view returns(string memory){
        uint256 level = tokenIdToData[tokenId].level;
        return level.toString();
    }
    function getAttack(uint256 tokenId) public view returns(string memory){
        uint256 attack = tokenIdToData[tokenId].attack;
        return attack.toString();
    }
    function getSpeed(uint256 tokenId) public view returns(string memory){
        uint256 speed = tokenIdToData[tokenId].speed;
        return speed.toString();
    }
    function getHealth(uint256 tokenId) public view returns(string memory){
        uint256 health = tokenIdToData[tokenId].health;
        return health.toString();
    }

    //# Function creating NFT URI
    function getTokenURI(uint256 tokenId) public view returns (string memory){
        bytes memory dataURI = abi.encodePacked(
            '{',
                '"name": "Chain Battles #', tokenId.toString(),'",',
                '"description": "Battles on chain",',
                '"image": "', generateCharacter(tokenId), '"',
            '}'
        );
        return string(
            abi.encodePacked(
                "data:application/json;base64,",
                Base64.encode(dataURI)
            )
        );
    }

    //# Mint NFT function
    function mint() public{
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        
        _safeMint(msg.sender, newItemId);
        
        string memory chara;
        if (newItemId % 3 == 0){
            chara = "Warrior";
        }
        else if (newItemId % 3 == 1){
            chara = "Mage";
        }
        else{
            chara = "Healer";
        }

        tokenIdToData[newItemId] = NFTData(
            chara, 0, 50, 50, 70
        );
        _setTokenURI(newItemId, getTokenURI(newItemId));
    }

    //# Update NFT stats
    function train(uint256 tokenId) public{
        require(_exists(tokenId), "");
        require(ownerOf(tokenId)==msg.sender, "");
        require(tokenIdToData[tokenId].level <= 2, "You have attained Max Level. No further upgrades");
        
        uint256 currentLevel = tokenIdToData[tokenId].level;
        tokenIdToData[tokenId].level = currentLevel+1;

        bytes32 tokenChar = keccak256(
            abi.encodePacked(
                tokenIdToData[tokenId].character
        ));
        if (tokenChar == keccak256("Warrior")){
            tokenIdToData[tokenId].attack += 20;
            tokenIdToData[tokenId].speed += 20;
            tokenIdToData[tokenId].health += 5;
        } else if(tokenChar == (keccak256("Healer"))){
            tokenIdToData[tokenId].attack += 20;
            tokenIdToData[tokenId].speed += 10;
            tokenIdToData[tokenId].health += 10;
        } else if(tokenChar == keccak256("Mage")){
            tokenIdToData[tokenId].attack += 20;
            tokenIdToData[tokenId].speed += 14;
            tokenIdToData[tokenId].health += 8;
        }
        _setTokenURI(tokenId, getTokenURI(tokenId));
    }
}