// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

import "./ChromadinCollection.sol";
import "./AccessControl.sol";

contract ChromadinDrop {
    AccessControl public accessControl;
    ChromadinCollection public chromadinCollection;
    uint256 public dropId;

    struct Drop {
        uint256 dropId;
        uint256[] collectionIds;
        string dropURI;
        address creator;
        uint256 timestamp;
    }

    mapping(uint256 => Drop) public drops;
    mapping(uint256 => uint256) public collectionIdToDrop;

    event DropCreated(
        uint256 indexed dropId,
        uint256[] collectionIds,
        address creator
    );

    event CollectionAddedToDrop(uint256 indexed dropId, uint256 collectionId);

    event CollectionRemovedFromDrop(
        uint256 indexed dropId,
        uint256 collectionId
    );

    event DropURIAdded(uint256 indexed dropId, string dropURI);

    event AccessControlUpdated(
        address indexed oldAccessControls,
        address indexed newAccessControls,
        address updater
    );

    event ChromadinCollectionUpdated(
        address indexed oldChromadinNFT,
        address indexed newChromadinNFT,
        address updater
    );

    modifier onlyCreator(uint256 _collectionId) {
        require(
            chromadinCollection.getCollectionCreator(_collectionId) ==
                msg.sender,
            "Only the owner of a collection can add it to a drop"
        );
        _;
    }

    modifier onlyAdmin() {
        require(
            accessControl.isAdmin(msg.sender),
            "Only admin can perform this action"
        );
        _;
    }

    constructor(
        address _chromadinCollectionAddress,
        address _accessControlAddress
    ) {
        chromadinCollection = ChromadinCollection(_chromadinCollectionAddress);
        accessControl = AccessControl(_accessControlAddress);
        dropId = 0;
    }

    function createDrop(
        uint256[] calldata _collectionIds,
        string calldata _dropURI
    ) external {
        for (uint256 i = 0; i < _collectionIds.length; i++) {
            require(
                chromadinCollection.getCollectionCreator(_collectionIds[i]) ==
                    msg.sender,
                "Only the owner of a collection can add it to a drop"
            );
        }

        dropId++;

        Drop memory newDrop = Drop({
            dropId: dropId,
            collectionIds: _collectionIds,
            dropURI: _dropURI,
            creator: msg.sender,
            timestamp: block.timestamp
        });

        for (uint256 i = 0; i < _collectionIds.length; i++) {
            collectionIdToDrop[_collectionIds[i]] = dropId;
        }

        drops[dropId] = newDrop;

        emit DropCreated(dropId, _collectionIds, msg.sender);
    }

    function addCollectionToDrop(
        uint256 _dropId,
        uint256 _collectionId
    ) external onlyCreator(_collectionId) {
        require(drops[_dropId].dropId != 0, "Drop does not exist");

        drops[_dropId].collectionIds.push(_collectionId);

        emit CollectionAddedToDrop(_dropId, _collectionId);
    }

    function removeCollectionFromDrop(
        uint256 _collectionId
    ) external onlyCreator(_collectionId) {
        require(
            drops[collectionIdToDrop[_collectionId]].dropId != 0,
            "Collection is not part of a drop"
        );

        uint256[] storage collectionIds = drops[
            collectionIdToDrop[_collectionId]
        ].collectionIds;
        uint256 collectionIndex = findIndex(collectionIds, _collectionId);
        require(collectionIndex < collectionIds.length, "Collection not found");

        collectionIds[collectionIndex] = collectionIds[
            collectionIds.length - 1
        ];
        collectionIds.pop();

        emit CollectionRemovedFromDrop(
            collectionIdToDrop[_collectionId],
            _collectionId
        );
    }

    function findIndex(
        uint256[] storage array,
        uint256 value
    ) internal view returns (uint256) {
        for (uint256 i = 0; i < array.length; i++) {
            if (array[i] == value) {
                return i;
            }
        }
        return array.length;
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
        address _newChromadinCollectionAddress
    ) external onlyAdmin {
        address oldAddress = address(chromadinCollection);
        chromadinCollection = ChromadinCollection(
            _newChromadinCollectionAddress
        );
        emit ChromadinCollectionUpdated(
            oldAddress,
            _newChromadinCollectionAddress,
            msg.sender
        );
    }
}
