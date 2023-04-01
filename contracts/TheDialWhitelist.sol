// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./AccessControl.sol";

contract TheDialWhitelist is Ownable, ERC721("TheDialWhitelist", "DIAL") {
    AccessControl private accessControl;

    uint256 public tokenId;

    mapping(address => bool) public whitelist;
    mapping(address => uint256) public addressToTokenId;
    mapping(uint256 => string) public tokenIdToURI;

    constructor(address _accessControlAddress) {
        accessControl = AccessControl(_accessControlAddress);
        tokenId = 0;
    }

    function removeFromWhitelist(address _address) public onlyOwner {
        whitelist[_address] = false;
    }

    function mint(address _to, uint256 _tokenId, string memory _uri) public {
        require(
            accessControl.isAdmin(msg.sender),
            "Only admin can perform this action"
        );
        whitelist[_to] = true;
        addressToTokenId[_to] = tokenId++;
        _safeMint(_to, _tokenId);
        _setTokenURI(_tokenId, _uri);
    }

    function _setTokenURI(
        uint256 _tokenId,
        string memory _uri
    ) internal virtual {
        require(
            _exists(_tokenId),
            "ERC721Metadata: URI set of nonexistent token"
        );
        tokenIdToURI[_tokenId] = _uri;
    }

    function isWhitelisted(address _address) public view returns (bool) {
        return whitelist[_address];
    }

    function checkTokenId(address _address) public view returns (uint256) {
        return addressToTokenId[_address];
    }

    function tokenURI(
        uint256 _tokenId
    ) public view virtual override returns (string memory) {
        require(
            _exists(_tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );
        return tokenIdToURI[_tokenId];
    }
}
