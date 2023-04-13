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
        address[] acceptedTokens;
        uint256[] prices;
        address creator;
        string uri;
        bool isBurned;
        uint256 timestamp;
    }

    mapping(uint256 => Token) public tokens;

    event BatchTokenMinted(address indexed to, uint256[] tokenIds, string uri);
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
    event ChromadinEscrowUpdated(
        address indexed oldChromadinEscrow,
        address indexed newChromadinEscrow,
        address updater
    );
    event TokenBurned(uint256 indexed tokenId);
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
            "AccessControl: Only admin can perform this action"
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

    modifier tokensInEscrow(uint256 _tokenId) {
        require(
            ownerOf(_tokenId) == address(chromadinEscrow),
            "ChromadinNFT: Tokens can only be edited when whole collection is in Escrow"
        );
        _;
    }

    constructor(
        address _accessControlAddress
    ) ERC721("ChromadinNFTNFT", "CHRON") {
        accessControl = AccessControl(_accessControlAddress);
    }

    function mintBatch(
        string memory _uri,
        uint256 _amount,
        uint256 _collectionId,
        address _creator,
        address[] memory _acceptedTokens,
        uint256[] memory _prices
    ) public onlyCollectionContract {
        uint256[] memory tokenIds = new uint256[](_amount);
        for (uint256 i = 0; i < _amount; i++) {
            Token memory newToken = Token({
                tokenId: super.totalSupply() + 1,
                collectionId: _collectionId,
                acceptedTokens: _acceptedTokens,
                prices: _prices,
                creator: _creator,
                uri: _uri,
                isBurned: false,
                timestamp: block.timestamp
            });

            tokens[super.totalSupply() + 1] = newToken;
            tokenIds[i] = super.totalSupply() + 1;
            _safeMint(address(chromadinEscrow), super.totalSupply() + 1);
            chromadinEscrow.deposit(super.totalSupply(), true);
        }

        emit BatchTokenMinted(address(chromadinEscrow), tokenIds, _uri);
    }

    function burnBatch(uint256[] memory _tokenIds) public {
        for (uint256 i = 0; i < _tokenIds.length; i++) {
            require(
                msg.sender == ownerOf(_tokenIds[i]),
                "ERC721Metadata: Only token owner can burn tokens"
            );
        }

        for (uint256 i = 0; i < _tokenIds.length; i++) {
            burn(_tokenIds[i]);
        }
    }

    function burn(uint256 _tokenId) public {
        require(
            msg.sender == ownerOf(_tokenId),
            "ERC721Metadata: Only token owner can burn token"
        );
        _burn(_tokenId);
        tokens[_tokenId].isBurned = true;
        emit TokenBurned(_tokenId);
    }

    function setChromadinCollection(
        address _chromadinCollectionAddress
    ) external onlyAdmin {
        address oldAddress = address(chromadinCollection);
        chromadinCollection = ChromadinCollection(_chromadinCollectionAddress);
        emit ChromadinCollectionUpdated(
            oldAddress,
            _chromadinCollectionAddress,
            msg.sender
        );
    }

    function setChromadinEscrow(
        address _chromadinEscrowAddress
    ) external onlyAdmin {
        address oldAddress = address(chromadinEscrow);
        chromadinEscrow = ChromadinEscrow(_chromadinEscrowAddress);
        emit ChromadinEscrowUpdated(
            oldAddress,
            _chromadinEscrowAddress,
            msg.sender
        );
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

    function tokenURI(
        uint256 _tokenId
    ) public view virtual override returns (string memory) {
        return tokens[_tokenId].uri;
    }

    function getTokenCreator(uint256 _tokenId) public view returns (address) {
        return tokens[_tokenId].creator;
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

    function getTokenId(uint256 _tokenId) public view returns (uint256) {
        return tokens[_tokenId].tokenId;
    }

    function setTokenAcceptedTokens(
        uint256 _tokenId,
        address[] memory _newAcceptedTokens
    ) public onlyCollectionContract tokensInEscrow(_tokenId) {
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
        uint256[] memory _newPrices
    ) public onlyCollectionContract tokensInEscrow(_tokenId) {
        uint256[] memory oldTokens = tokens[_tokenId].prices;
        tokens[_tokenId].prices = _newPrices;
        emit TokenPricesUpdated(_tokenId, oldTokens, _newPrices, msg.sender);
    }

    function setTokenURI(
        uint256 _tokenId,
        string memory _newURI
    ) public onlyCollectionContract tokensInEscrow(_tokenId) {
        string memory oldURI = tokens[_tokenId].uri;
        tokens[_tokenId].uri = _newURI;
        emit TokenURIUpdated(_tokenId, oldURI, _newURI, msg.sender);
    }
}
