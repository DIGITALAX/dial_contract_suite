// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

import "./ChromadinCollection.sol";
import "./AccessControl.sol";

contract ChromadinDrop {
    AccessControl public accessControl;
    ChromadinCollection public chromadinCollection;
    uint256 public dropSupply;
    string public symbol;
    string public name;

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

    event DropURIUpdated(uint256 indexed dropId, string dropURI);

    event AccessControlUpdated(
        address indexed oldAccessControl,
        address indexed newAccessControl,
        address updater
    );

    event ChromadinCollectionUpdated(
        address indexed oldChromadinCollection,
        address indexed newChromadinCollection,
        address updater
    );

    event DropDeleted(uint256 indexed dropId, address deleter);

    modifier onlyCreator(uint256 _collectionId) {
        require(
            chromadinCollection.getCollectionCreator(_collectionId) ==
                msg.sender,
            "ChromadinDrop: Only the owner of a collection can add it to a drop"
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
        address _chromadinCollectionAddress,
        address _accessControlAddress,
        string memory _symbol,
        string memory _name
    ) {
        chromadinCollection = ChromadinCollection(_chromadinCollectionAddress);
        accessControl = AccessControl(_accessControlAddress);
        dropSupply = 0;
        symbol = _symbol;
        name = _name;
    }

    function createDrop(
        uint256[] memory _collectionIds,
        string memory _dropURI
    ) external {
        for (uint256 i = 0; i < _collectionIds.length; i++) {
            require(
                chromadinCollection.getCollectionCreator(_collectionIds[i]) ==
                    msg.sender &&
                    (accessControl.isWriter(msg.sender) ||
                        accessControl.isAdmin(msg.sender)),
                "ChromadinDrop: Only the owner of a collection can add it to a drop"
            );
            require(
                _collectionIds[i] != 0 &&
                    _collectionIds[i] <= chromadinCollection.collectionSupply(),
                "ChromadinDrop: Collection does not exist"
            );
            require(
                collectionIdToDrop[_collectionIds[i]] == 0,
                "ChromadinDrop: Collection is already part of another existing drop"
            );
        }

        dropSupply++;

        Drop memory newDrop = Drop({
            dropId: dropSupply,
            collectionIds: _collectionIds,
            dropURI: _dropURI,
            creator: msg.sender,
            timestamp: block.timestamp
        });

        for (uint256 i = 0; i < _collectionIds.length; i++) {
            collectionIdToDrop[_collectionIds[i]] = dropSupply;
        }

        drops[dropSupply] = newDrop;

        emit DropCreated(dropSupply, _collectionIds, msg.sender);
    }

    function addCollectionToDrop(
        uint256 _dropId,
        uint256 _collectionId
    ) external onlyCreator(_collectionId) {
        require(
            drops[_dropId].dropId != 0,
            "ChromadinDrop: Drop does not exist"
        );
        require(
            collectionIdToDrop[_collectionId] == 0 ||
                collectionIdToDrop[_collectionId] == _dropId,
            "ChromadinDrop: Collection is already part of another existing drop"
        );

        drops[_dropId].collectionIds.push(_collectionId);
        collectionIdToDrop[_collectionId] = dropSupply;

        emit CollectionAddedToDrop(_dropId, _collectionId);
    }

    function removeCollectionFromDrop(uint256 _collectionId) external {
        require(
            drops[collectionIdToDrop[_collectionId]].dropId != 0,
            "ChromadinDrop: Collection is not part of a drop"
        );
        require(
            chromadinCollection.getCollectionCreator(_collectionId) ==
                msg.sender ||
                address(chromadinCollection) == msg.sender,
            "ChromadinDrop: Only creator or collection contract can remove collection"
        );

        uint256[] storage collectionIds = drops[
            collectionIdToDrop[_collectionId]
        ].collectionIds;
        uint256 collectionIndex = findIndex(collectionIds, _collectionId);
        require(
            collectionIndex < collectionIds.length,
            "ChromadinDrop: Collection not found"
        );

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

    function deleteDrop(uint256 _dropId) external {
        require(
            drops[_dropId].dropId != 0,
            "ChromadinDrop: Drop does not exist"
        );
        for (uint256 i = 0; i < drops[_dropId].collectionIds.length; i++) {
            require(
                chromadinCollection.getCollectionCreator(
                    drops[_dropId].collectionIds[i]
                ) ==
                    msg.sender &&
                    (accessControl.isWriter(msg.sender) ||
                        accessControl.isAdmin(msg.sender)),
                "ChromadinDrop: Only the owner of a collection can add it to a drop"
            );
        }

        uint256[] memory collectionIds = drops[_dropId].collectionIds;
        for (uint256 i = 0; i < collectionIds.length; i++) {
            collectionIdToDrop[collectionIds[i]] = 0;
        }
        delete drops[_dropId];

        emit DropDeleted(_dropId, msg.sender);
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

    function updateChromadinCollection(
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

    function getCollectionsInDrop(
        uint256 _dropId
    ) public view returns (uint256[] memory) {
        return drops[_dropId].collectionIds;
    }

    function getDropURI(uint256 _dropId) public view returns (string memory) {
        return drops[_dropId].dropURI;
    }

    function getDropCreator(uint256 _dropId) public view returns (address) {
        return drops[_dropId].creator;
    }

    function getDropTimestamp(uint256 _dropId) public view returns (uint256) {
        return drops[_dropId].timestamp;
    }

    function setDropURI(uint256 _dropId, string memory _dropURI) external {
        for (uint256 i = 0; i < drops[_dropId].collectionIds.length; i++) {
            require(
                chromadinCollection.getCollectionCreator(
                    drops[_dropId].collectionIds[i]
                ) ==
                    msg.sender &&
                    (accessControl.isWriter(msg.sender) ||
                        accessControl.isAdmin(msg.sender)),
                "ChromadinDrop: Only the owner of a drop can edit a drop"
            );
        }
        drops[_dropId].dropURI = _dropURI;
        emit DropURIUpdated(_dropId, _dropURI);
    }
}
