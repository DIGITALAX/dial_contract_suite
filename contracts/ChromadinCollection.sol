// SPDX-License-Identifier: UNLICENSE

pragma solidity ^0.8.9;

import "./ChromadinNFT.sol";
import "./AccessControl.sol";
import "./ChromadinPayment.sol";
import "./ChromadinDrop.sol";
import "./ChromadinEscrow.sol";

contract ChromadinCollection {
    ChromadinNFT public chromadinNFT;
    AccessControl public accessControl;
    ChromadinPayment public chromadinPayment;
    ChromadinDrop public chromadinDrop;
    ChromadinEscrow public chromadinEscrow;
    uint256 public collectionSupply;
    string public symbol;
    string public name;

    struct Collection {
        uint256 collectionId;
        address[] acceptedTokens;
        uint256[] basePrices;
        uint256[] tokenIds;
        uint256 amount;
        address creator;
        string name;
        string uri;
        bool isBurned;
        uint256 timestamp;
        bool fulfillment;
    }

    mapping(uint256 => Collection) private collections;

    event CollectionMinted(
        uint256 indexed collectionId,
        string name,
        string uri,
        uint256 amount,
        address owner
    );

    event CollectionBurned(
        address indexed burner,
        uint256 indexed collectionId
    );

    event CollectionNameUpdated(
        uint256 indexed collectionId,
        string oldName,
        string newName,
        address updater
    );

    event CollectionURIUpdated(
        uint256 indexed collectionId,
        string oldURI,
        string newURI,
        address updater
    );

    event CollectionBasePricesUpdated(
        uint256 indexed collectionId,
        uint256[] oldPrices,
        uint256[] newPrices,
        address updater
    );

    event CollectionAcceptedTokensUpdated(
        uint256 indexed collectionId,
        address[] oldAcceptedTokens,
        address[] newAcceptedTokens,
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

    event ChromadinPaymentUpdated(
        address indexed oldChromadinPayment,
        address indexed newChromadinPayment,
        address updater
    );

    event ChromadinEscrowUpdated(
        address indexed oldChromadinEscrow,
        address indexed newChromadinEscrow,
        address updater
    );

    event ChromadinDropUpdated(
        address indexed oldChromadinDrop,
        address indexed newChromadinDrop,
        address updater
    );

    event CollectionFulfillmentUpdated(
        uint256 indexed collectionId,
        address updater
    );

    modifier onlyCreator(uint256 _collectionId) {
        require(
            msg.sender == collections[_collectionId].creator,
            "ChromadinCollection: Only the creator can edit this collection"
        );
        _;
    }

    modifier onlyAdmin() {
        require(
            accessControl.isAdmin(msg.sender),
            "AccessControl: Only admin can perform this action"
        );
        _;
    }

    constructor(
        address _chromadinNFTAddress,
        address _accessControlAddress,
        address _chromadinPaymentAddress,
        string memory _symbol,
        string memory _name
    ) {
        chromadinNFT = ChromadinNFT(_chromadinNFTAddress);
        accessControl = AccessControl(_accessControlAddress);
        chromadinPayment = ChromadinPayment(_chromadinPaymentAddress);
        collectionSupply = 0;
        symbol = _symbol;
        name = _name;
    }

    function mintCollection(
        string memory _uri,
        uint256 _amount,
        string memory _collectionName,
        address[] memory _acceptedTokens,
        uint256[] memory _basePrices
    ) external {
        require(
            _basePrices.length == _acceptedTokens.length,
            "ChromadinCollection: Invalid input"
        );
        require(
            accessControl.isAdmin(msg.sender) ||
                accessControl.isWriter(msg.sender),
            "ChromadinCollection: Only admin or writer can perform this action"
        );
        for (uint256 i = 0; i < _acceptedTokens.length; i++) {
            require(
                chromadinPayment.checkIfAddressVerified(_acceptedTokens[i]),
                "ChromadinCollection: Payment Token is Not Verified"
            );
        }

        collectionSupply++;

        uint256[] memory tokenIds = new uint256[](_amount);

        for (uint256 i = 0; i < _amount; i++) {
            tokenIds[i] = chromadinNFT.totalSupplyCount() + i + 1;
        }

        Collection memory newCollection = Collection({
            collectionId: collectionSupply,
            acceptedTokens: _acceptedTokens,
            basePrices: _basePrices,
            tokenIds: tokenIds,
            amount: _amount,
            creator: msg.sender,
            name: _collectionName,
            uri: _uri,
            isBurned: false,
            timestamp: block.timestamp,
            fulfillment: false
        });

        collections[collectionSupply] = newCollection;

        chromadinNFT.mintBatch(
            _uri,
            _amount,
            collectionSupply,
            msg.sender,
            _acceptedTokens,
            _basePrices
        );

        emit CollectionMinted(
            collectionSupply,
            _collectionName,
            _uri,
            _amount,
            msg.sender
        );
    }

    function burnCollection(
        uint256 _collectionId
    ) external onlyCreator(_collectionId) {
        require(
            !collections[_collectionId].isBurned,
            "ChromadinCollection: This collection has already been burned"
        );
        chromadinDrop.removeCollectionFromDrop(_collectionId);
        for (
            uint256 i = 0;
            i < collections[_collectionId].tokenIds.length;
            i++
        ) {
            if (
                address(chromadinEscrow) ==
                chromadinNFT.ownerOf(collections[_collectionId].tokenIds[i])
            ) {
                chromadinEscrow.release(
                    collections[_collectionId].tokenIds[i],
                    true,
                    address(0)
                );
            }
        }

        collections[_collectionId].isBurned = true;
        emit CollectionBurned(msg.sender, _collectionId);
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

    function updateChromadinPayment(
        address _newChromadinPaymentAddress
    ) external onlyAdmin {
        address oldAddress = address(chromadinPayment);
        chromadinPayment = ChromadinPayment(_newChromadinPaymentAddress);
        emit ChromadinPaymentUpdated(
            oldAddress,
            _newChromadinPaymentAddress,
            msg.sender
        );
    }

    function setChromadinEscrow(
        address _newChromadinEscrowAddress
    ) external onlyAdmin {
        address oldAddress = address(chromadinEscrow);
        chromadinEscrow = ChromadinEscrow(_newChromadinEscrowAddress);
        emit ChromadinEscrowUpdated(
            oldAddress,
            _newChromadinEscrowAddress,
            msg.sender
        );
    }

    function setChromadinDrop(
        address _newChromadinDropAddress
    ) external onlyAdmin {
        address oldAddress = address(chromadinDrop);
        chromadinDrop = ChromadinDrop(_newChromadinDropAddress);
        emit ChromadinDropUpdated(
            oldAddress,
            _newChromadinDropAddress,
            msg.sender
        );
    }

    function getCollectionCreator(
        uint256 _collectionId
    ) public view returns (address) {
        return collections[_collectionId].creator;
    }

    function getCollectionURI(
        uint256 _collectionId
    ) public view returns (string memory) {
        return collections[_collectionId].uri;
    }

    function getCollectionAmount(
        uint256 _collectionId
    ) public view returns (uint256) {
        return collections[_collectionId].amount;
    }

    function getCollectionAcceptedTokens(
        uint256 _collectionId
    ) public view returns (address[] memory) {
        return collections[_collectionId].acceptedTokens;
    }

    function getCollectionBasePrices(
        uint256 _collectionId
    ) public view returns (uint256[] memory) {
        return collections[_collectionId].basePrices;
    }

    function getCollectionFulfillment(
        uint256 _collectionId
    ) public view returns (bool) {
        return collections[_collectionId].fulfillment;
    }

    function getCollectionName(
        uint256 _collectionId
    ) public view returns (string memory) {
        return collections[_collectionId].name;
    }

    function getCollectionIsBurned(
        uint256 _collectionId
    ) public view returns (bool) {
        return collections[_collectionId].isBurned;
    }

    function getCollectionTimestamp(
        uint256 _collectionId
    ) public view returns (uint256) {
        return collections[_collectionId].timestamp;
    }

    function getCollectionTokenIds(
        uint256 _collectionId
    ) public view returns (uint256[] memory) {
        return collections[_collectionId].tokenIds;
    }

    function setCollectionName(
        string memory _collectionName,
        uint256 _collectionId
    ) external onlyCreator(_collectionId) {
        uint256[] memory tokenIds = collections[_collectionId].tokenIds;
        for (uint256 i = 0; i < tokenIds.length; i++) {
            require(
                chromadinNFT.ownerOf(tokenIds[i]) == address(chromadinEscrow),
                "ChromadinCollection: The entire collection must be owned by Escrow to update"
            );
        }
        string memory oldName = collections[_collectionId].name;
        collections[_collectionId].name = _collectionName;
        emit CollectionNameUpdated(
            _collectionId,
            oldName,
            _collectionName,
            msg.sender
        );
    }

    function setCollectionURI(
        string memory _newURI,
        uint256 _collectionId
    ) external onlyCreator(_collectionId) {
        uint256[] memory tokenIds = collections[_collectionId].tokenIds;
        for (uint256 i = 0; i < tokenIds.length; i++) {
            require(
                chromadinNFT.ownerOf(tokenIds[i]) == address(chromadinEscrow),
                "ChromadinCollection: The entire collection must be owned by Escrow to update"
            );
            chromadinNFT.setTokenURI(tokenIds[i], _newURI);
        }
        string memory oldURI = collections[_collectionId].uri;
        collections[_collectionId].uri = _newURI;
        emit CollectionURIUpdated(_collectionId, oldURI, _newURI, msg.sender);
    }

    function setCollectionBasePrices(
        uint256 _collectionId,
        uint256[] memory _newPrices
    ) external onlyCreator(_collectionId) {
        uint256[] memory tokenIds = collections[_collectionId].tokenIds;
        for (uint256 i = 0; i < tokenIds.length; i++) {
            require(
                chromadinNFT.ownerOf(tokenIds[i]) == address(chromadinEscrow),
                "ChromadinCollection: The entire collection must be owned by Escrow to update"
            );
            chromadinNFT.setBasePrices(tokenIds[i], _newPrices);
        }
        uint256[] memory oldPrices = collections[_collectionId].basePrices;
        collections[_collectionId].basePrices = _newPrices;
        emit CollectionBasePricesUpdated(
            _collectionId,
            oldPrices,
            _newPrices,
            msg.sender
        );
    }

    function setCollectionFulfillment(
        uint256 _collectionId
    ) external onlyCreator(_collectionId) {
        uint256[] memory tokenIds = collections[_collectionId].tokenIds;
        for (uint256 i = 0; i < tokenIds.length; i++) {
            chromadinNFT.setTokenFulfilled(tokenIds[i]);
        }
        collections[_collectionId].fulfillment = true;
        emit CollectionFulfillmentUpdated(_collectionId, msg.sender);
    }

    function setCollectionAcceptedTokens(
        uint256 _collectionId,
        address[] memory _newAcceptedTokens
    ) external onlyCreator(_collectionId) {
        uint256[] memory tokenIds = collections[_collectionId].tokenIds;
        for (uint256 i = 0; i < tokenIds.length; i++) {
            require(
                chromadinNFT.ownerOf(tokenIds[i]) == address(chromadinEscrow),
                "ChromadinCollection: The entire collection must be owned by Escrow to update"
            );
            chromadinNFT.setTokenAcceptedTokens(
                tokenIds[i],
                _newAcceptedTokens
            );
        }
        address[] memory oldTokens = collections[_collectionId].acceptedTokens;
        collections[_collectionId].acceptedTokens = _newAcceptedTokens;
        emit CollectionAcceptedTokensUpdated(
            _collectionId,
            oldTokens,
            _newAcceptedTokens,
            msg.sender
        );
    }
}
