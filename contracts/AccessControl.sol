// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

contract AccessControl {
    string public symbol;
    string public name;
    mapping(address => bool) public admins;
    mapping(address => bool) public writers;

    modifier onlyAdmin() {
        require(admins[msg.sender], "Only admins can perform this action");
        _;
    }

    modifier onlyWrite() {
        require(
            writers[msg.sender],
            "Only authorized writers can perform this action"
        );
        _;
    }

    constructor(string memory _name, string memory _symbol) {
        symbol = _symbol;
        name = _name;
        admins[msg.sender] = true;
    }

    function addAdmin(address _admin) public onlyAdmin {
        require(
            !admins[_admin] && _admin != msg.sender,
            "Cannot add existing admin or yourself"
        );
        admins[_admin] = true;
    }

    function removeAdmin(address _admin) public onlyAdmin {
        require(_admin != msg.sender, "Cannot remove yourself as admin");
        admins[_admin] = false;
    }

    function addWriter(address _writer) public onlyAdmin {
        writers[_writer] = true;
    }

    function removeWriter(address _writer) public onlyAdmin {
        writers[_writer] = false;
    }

    function isAdmin(address _admin) public view returns (bool) {
        return admins[_admin];
    }

    function isWriter(address _writer) public view returns (bool) {
        return writers[_writer];
    }
}
