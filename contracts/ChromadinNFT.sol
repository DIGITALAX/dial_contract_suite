// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

import "./ChromadinCollection.sol";
import "./AccessControl.sol";
import "./ChromadinEscrow.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract ChromadinNFT is ERC721Enumerable {
    AccessControl public accessControl;
    ChromadinEscrow public chromadinEscrow;
    ChromadinCollection public chromadinCollection;

    struct Token {
        uint256 tokenId;
        uint256 collectionId;
        string[] irlItems;
        address[] acceptedTokens;
        uint256[] prices;
        address creator;
        string uri;
        bool isBurned;
        uint256 timestamp;
    }

    mapping(uint256 => string) public tokenIdToURI;
    mapping(uint256 => Token) public tokens;

    event TokenMinted(address indexed to, uint256 tokenId, string uri);
    event BatchTokenMinted(
        address indexed to,
        uint256[] tokenIds,
        string[] uris
    );
    event TokenURIUpdated(uint256 indexed tokenId, string newURI);
    event AccessControlUpdated(
        address indexed oldChromadinCollection,
        address indexed newChromadinCollection,
        address updater
    );
    event ChromadinCollectionUpdated(
        address indexed oldChromadinCollection,
        address indexed newChromadinCollection,
        address updater
    );
    event TokenBurned(uint256 indexed tokenId);
    event TokenIRLUpdated(
        uint256 indexed tokenId,
        string[] oldIRLItems,
        string[] newIRLItems,
        address updater
    );
    event TokenPricesUpdated(
        uint256 indexed tokenId,
        uint256[] oldPrices,
        uint256[] newPrices,
        address updater
    );
    event TokenAcceptedTokensUpdated(
        uint256 indexed tokenId,
        address[] oldAcceptedTokens,
        address[] newAcceptedTokens,
        address updater
    );
    event TokenURIUpdated(
        uint256 indexed tokenId,
        string oldURI,
        string newURI,
        address updater
    );

    modifier onlyAdmin() {
        require(
            accessControl.isAdmin(msg.sender),
            "Access Control: Only admin can perform this action"
        );
        _;
    }

    modifier onlyCreator(uint256 _tokenId) {
        require(
            tokens[_tokenId].creator == msg.sender,
            "ChromadinNFT: Only Token Creator Can Update Token URI"
        );
        _;
    }

    modifier onlyCollectionContract() {
        require(
            msg.sender == address(chromadinCollection),
            "ChromadinNFT: Only collection contract can mint tokens"
        );
        _;
    }

    constructor(
        address _accessControlAddress,
        address _chromadinCollectionAddress,
        address _chromadinEscrowAddress
    ) ERC721("ChromadinNFTNFT", "CHRO") {
        accessControl = AccessControl(_accessControlAddress);
        chromadinCollection = ChromadinCollection(_chromadinCollectionAddress);
        chromadinEscrow = ChromadinEscrow(_chromadinEscrowAddress);
    }

    function mint(
        string calldata _uri,
        uint256 _collectionId,
        address _creator,
        string[] calldata _irlItems,
        address[] calldata _acceptedTokens,
        uint256[] calldata _prices
    ) public onlyCollectionContract {

        Token memory newToken = Token({
            tokenId: super.totalSupply() + 1,
            collectionId: _collectionId,
            irlItems: _irlItems,
            acceptedTokens: _acceptedTokens,
            prices: _prices,
            creator: _creator,
            uri: _uri,
            isBurned: false,
            timestamp: block.timestamp
        });

        tokens[super.totalSupply() + 1] = newToken;

        _safeMint(address(chromadinEscrow), super.totalSupply() + 1);
        _setTokenURI(super.totalSupply() + 1, _uri);

        emit TokenMinted(address(chromadinEscrow), super.totalSupply() + 1, _uri);
    }

    function mintBatch(
        string[] calldata _uris,
        uint256 _collectionId,
        address _creator,
        string[] calldata _irlItems,
        address[] calldata _acceptedTokens,
        uint256[] calldata _prices
    ) public onlyCollectionContract {
        uint256[] memory tokenIds = new uint256[](_uris.length);
        for (uint256 i = 0; i < _uris.length; i++) {

            Token memory newToken = Token({
                tokenId: super.totalSupply() + 1,
                collectionId: _collectionId,
                irlItems: _irlItems,
                acceptedTokens: _acceptedTokens,
                prices: _prices,
                creator: _creator,
                uri: _uris[i],
                isBurned: false,
                timestamp: block.timestamp
            });

            tokens[super.totalSupply() + 1] = newToken;

            _safeMint(address(chromadinEscrow), super.totalSupply() + 1);
            _setTokenURI(super.totalSupply() + 1, _uris[i]);
            tokenIds[i] = super.totalSupply() + 1;
        }

        emit BatchTokenMinted(address(chromadinEscrow), tokenIds, _uris);
    }

    function _setTokenURI(
        uint256 _tokenId,
        string calldata _uri
    ) internal virtual {
        require(
            _exists(_tokenId),
            "ERC721Metadata: URI set of nonexistent token"
        );
        tokenIdToURI[_tokenId] = _uri;
    }

    function burnBatch(uint256[] calldata _tokenIds) public {
        for (uint256 i = 0; i < _tokenIds.length; i++) {
            require(
                msg.sender == ownerOf(_tokenIds[i]),
                "ERC721Metadata: Only token owner can burn tokens"
            );
        }

        for (uint256 i = 0; i < _tokenIds.length; i++) {
            _burn(_tokenIds[i]);
        }
    }

    function burn(uint256 _tokenId) public {
        require(
            msg.sender == ownerOf(_tokenId),
            "ERC721Metadata: Only token owner can burn token"
        );
        _burn(_tokenId);
        tokens[_tokenId].isBurned = true;
    }

    function updateTokenURI(
        uint256 _tokenId,
        string calldata _newURI
    ) public onlyCreator(_tokenId) {
        _setTokenURI(_tokenId, _newURI);
        setTokenURI(_tokenId, _newURI);
        emit TokenURIUpdated(_tokenId, _newURI);
    }

    function updateAccessControl(
        address _newAccessControlAddress
    ) public onlyAdmin {
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
    ) public onlyAdmin {
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

    function checkURI(uint256 _tokenId) public view returns (string memory) {
        return tokenIdToURI[_tokenId];
    }

    function getTokenCreator(uint256 _tokenId) public view returns (address) {
        return tokens[_tokenId].creator;
    }

    function getTokenURI(uint256 _tokenId) public view returns (string memory) {
        return tokens[_tokenId].uri;
    }

    function getTokenIRLItems(
        uint256 _tokenId
    ) public view returns (string[] memory) {
        return tokens[_tokenId].irlItems;
    }

    function getTokenAcceptedTokens(
        uint256 _tokenId
    ) public view returns (address[] memory) {
        return tokens[_tokenId].acceptedTokens;
    }

    function getTokenPrices(
        uint256 _tokenId
    ) public view returns (uint256[] memory) {
        return tokens[_tokenId].prices;
    }

     function getTokenCollection(
        uint256 _tokenId
    ) public view returns (uint256) {
        return tokens[_tokenId].collectionId;
    }

    function getTokenIsBurned(uint256 _tokenId) public view returns (bool) {
        return tokens[_tokenId].isBurned;
    }

    function getTokenTimestamp(uint256 _tokenId) public view returns (uint256) {
        return tokens[_tokenId].timestamp;
    }

    function setTokenAcceptedTokens(
        uint256 _tokenId,
        address[] calldata _newAcceptedTokens
    ) public onlyCollectionContract {
        address[] memory oldTokens = tokens[_tokenId].acceptedTokens;
        tokens[_tokenId].acceptedTokens = _newAcceptedTokens;
        emit TokenAcceptedTokensUpdated(
            _tokenId,
            oldTokens,
            _newAcceptedTokens,
            msg.sender
        );
    }

    function setTokenPrices(
        uint256 _tokenId,
        uint256[] calldata _newPrices
    ) public onlyCollectionContract {
        uint256[] memory oldTokens = tokens[_tokenId].prices;
        tokens[_tokenId].prices = _newPrices;
        emit TokenPricesUpdated(_tokenId, oldTokens, _newPrices, msg.sender);
    }

    function setTokenURI(
        uint256 _tokenId,
        string calldata _newURI
    ) public onlyCollectionContract {
        string memory oldURI = tokens[_tokenId].uri;
        tokens[_tokenId].uri = _newURI;
        emit TokenURIUpdated(_tokenId, oldURI, _newURI, msg.sender);
    }

    function setTokenIRLItems(
        uint256 _tokenId,
        string[] calldata _newIRLItems
    ) public onlyCollectionContract {
        string[] memory oldTokens = tokens[_tokenId].irlItems;
        tokens[_tokenId].irlItems = _newIRLItems;
        emit TokenIRLUpdated(_tokenId, oldTokens, _newIRLItems, msg.sender);
    }
}
