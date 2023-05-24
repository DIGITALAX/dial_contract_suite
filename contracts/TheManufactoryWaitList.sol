// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

import "./AccessControl.sol";
import "node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract ChromadinNFT is ERC721 {
    AccessControl private _accessControl;
    uint256 private _totalSupplyCount;
    string private _currentURI;

    mapping(address => uint256) private _tokenToOwner;
    mapping(address => bool) public _hasMinted;

    event TokenMinted(uint256 indexed tokenId, address minterAddress);
    event AccessControlUpdated(
        address indexed newAccessControl,
        address updater
    );

    modifier onlyAdmin() {
        require(
            _accessControl.isAdmin(msg.sender),
            "AccessControl: Only admin can perform this action"
        );
        _;
    }

    modifier uniqueMinter(address _address) {
        require(
            !_hasMinted[_address],
            "TheManufactoryWaitlist: Only one mint allowed per address."
        );
        _;
    }

    constructor(
        address _accessControlAddress,
        string memory initialURI_
    ) ERC721("TheManufactoryWaitList", "MWAIT") {
        _accessControl = AccessControl(_accessControlAddress);
        _totalSupplyCount = 0;
        _currentURI = initialURI_;
    }

    function mint() public uniqueMinter(msg.sender) {
        _hasMinted[msg.sender] = true;

        _safeMint(msg.sender, _totalSupplyCount + 1);
        _setTokenURI(_totalSupplyCount + 1, _currentURI);

        _tokenToOwner[msg.sender] = _totalSupplyCount + 1;

        _totalSupplyCount++;

        emit TokenMinted(_totalSupplyCount, msg.sender);
    }

    function updateURI(string memory newURI_) public onlyAdmin {
        _currentURI = newURI_;
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        return _currentURI;
    }

    function checkAddressMinted(
        address _address
    ) public view override returns (bool) {
        return _hasMinted[_address];
    }

    function setAccessControl(address _newAddress) public onlyAdmin {
        _accessControl = AccessControl(_newAddress);
        emit AccessControlUpdated(_newAccessControlAddress, msg.sender);
    }

    function getAccessControl() public view returns (address) {
        return _accessControl;
    }

    function getTotalSupply() public view returns (uint256) {
        return _totalSupplyCount;
    }

    function getTokenId(address _address) public view returns (uint256) {
        return _tokenToOwner[_address];
    }
}
