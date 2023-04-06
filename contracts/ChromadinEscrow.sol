// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./ChromadinCollection.sol";
import "./ChromadinMarketplace.sol";
import "./AccessControl.sol";
import "./ChromadinNFT.sol";

contract ChromadinEscrow is ERC721Holder {
    AccessControl public accessControl;
    ChromadinCollection public chromadinCollection;
    ChromadinMarketplace public chromadinMarketplace;
    ChromadinNFT public chromadinNFT;
    string public symbol;
    string public name;

    mapping(uint256 => bool) private _deposited;

    event ChromadinMarketplaceUpdated(
        address indexed oldChromadinMarketplace,
        address indexed newChromadinMarketplace,
        address updater
    );
    event ChromadinCollectionUpdated(
        address indexed oldChromadinCollection,
        address indexed newChromadinCollection,
        address updater
    );
    event AccessControlUpdated(
        address indexed oldAccessControl,
        address indexed newAccessControl,
        address updater
    );
    event ChromadinNFTUpdated(
        address indexed oldChromadinNFT,
        address indexed newChromadinNFT,
        address updater
    );

    constructor(
        address _chromadinCollectionContract,
        address _chromadinMarketplaceContract,
        address _accessControlContract,
        address _chromadinNFTContract,
        string memory _symbol,
        string memory _name
    ) {
        chromadinCollection = ChromadinCollection(_chromadinCollectionContract);
        chromadinMarketplace = ChromadinMarketplace(
            _chromadinMarketplaceContract
        );
        accessControl = AccessControl(_accessControlContract);
        chromadinNFT = ChromadinNFT(_chromadinNFTContract);
        symbol = _symbol;
        name = _name;
    }

    modifier onlyAdmin {
        require(
            accessControl.isAdmin(msg.sender),
            "AccessControl: Only admin can perform this action"
        );
        _;
    }

    modifier onlyDepositer {
        require(
            msg.sender == address(chromadinCollection),
            "ChromadinEscrow: Only the Chromadin Collection contract can call this function"
        );
        _;
    }

    modifier onlyReleaser(bool _isBurn, uint256 _tokenId) {
        require(
            msg.sender == address(chromadinMarketplace) ||
                msg.sender == address(chromadinCollection) ||
                msg.sender == address(chromadinNFT),
            "ChromadinEscrow: Only the Chromadin Marketplace contract can call this function"
        );
        if (_isBurn) {
            require(
                chromadinNFT.getTokenCreator(_tokenId) == msg.sender,
                "ChromadinEscrow: Only the creator of the token can transfer it to the burn address"
            );
        }
        _;
    }

    function deposit(uint256 _tokenId) external onlyDepositer {
        require(
            chromadinNFT.ownerOf(_tokenId) == address(this),
            "ChromadinEscrow: Token must be owned by escrow contract"
        );
        _deposited[_tokenId] = true;
    }

    function release(
        uint256 _tokenId,
        bool _isBurn,
        address _to
    ) external onlyReleaser(_isBurn, _tokenId) {
        require(
            _deposited[_tokenId],
            "ChromadinEscrow: Token must be in escrow"
        );
        _deposited[_tokenId] = false;
        if (_isBurn) {
            chromadinNFT.burn(_tokenId);
        } else {
            chromadinNFT.safeTransferFrom(address(this), _to, _tokenId);
        }
    }

    function updateChromadinMarketplace(
        address _newChromadinMarketplace
    ) external onlyAdmin {
        address oldAddress = address(accessControl);
        chromadinMarketplace = ChromadinMarketplace(_newChromadinMarketplace);
        emit ChromadinMarketplaceUpdated(
            oldAddress,
            _newChromadinMarketplace,
            msg.sender
        );
    }

    function updateChromadinCollection(
        address _newChromadinCollection
    ) external onlyAdmin {
        address oldAddress = address(chromadinCollection);
        chromadinCollection = ChromadinCollection(_newChromadinCollection);
        emit ChromadinCollectionUpdated(
            oldAddress,
            _newChromadinCollection,
            msg.sender
        );
    }

    function updateAccessControl(
        address _newAccessControlAddress
    ) external onlyAdmin {
        address oldAddress = address(accessControl);
        accessControl = AccessControl(_newAccessControlAddress);
        emit AccessControlUpdated(
            oldAddress,
            _newAccessControlAddress,
            msg.sender
        );
    }

    function updateChromadinNFT(
        address _newChromadinNFTAddress
    ) external onlyAdmin {
        address oldAddress = address(chromadinNFT);
        chromadinNFT = ChromadinNFT(_newChromadinNFTAddress);
        emit ChromadinNFTUpdated(
            oldAddress,
            _newChromadinNFTAddress,
            msg.sender
        );
    }
}
