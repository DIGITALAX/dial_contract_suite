// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./AccessControl.sol";

contract TheDialWhitelist is ERC721("TheDialWhitelist", "DIAL") {
    AccessControl private accessControl;

    uint256 public tokenId;

    mapping(address => bool) public whitelist;
    mapping(address => uint256) public addressToTokenId;
    mapping(uint256 => string) public tokenIdToURI;
    mapping(uint256 => uint256) public tokenToTimestamp;

    uint256 constant transferLockTime = 15552000;

    modifier isTransferable(uint256 _tokenId) {
        require(
            block.timestamp >= tokenToTimestamp[_tokenId] + transferLockTime,
            "This token is non-transferable at the moment."
        );
        _;
    }

    constructor(address _accessControlAddress) {
        accessControl = AccessControl(_accessControlAddress);
        tokenId = 0;
    }

    function removeFromWhitelist(address _address) public {
        require(
            accessControl.isAdmin(msg.sender),
            "Only admin can perform this action"
        );
        whitelist[_address] = false;
    }

    function mint(address _to, string memory _uri) public {
        require(
            accessControl.isAdmin(msg.sender),
            "Only admin can perform this action"
        );
        whitelist[_to] = true;
        addressToTokenId[_to] = tokenId;
        tokenToTimestamp[tokenId] = block.timestamp;
        _safeMint(_to, tokenId);
        _setTokenURI(tokenId, _uri);
        tokenId++;
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

    function transferFrom(
        address _from,
        address _to,
        uint256 _tokenId
    ) public override isTransferable(_tokenId) {
        super.transferFrom(_from, _to, _tokenId);
    }
}
