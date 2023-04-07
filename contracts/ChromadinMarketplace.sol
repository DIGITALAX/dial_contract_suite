// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

import "./AccessControl.sol";
import "./ChromadinCollection.sol";
import "./ChromadinEscrow.sol";
import "./ChromadinNFT.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ChromadinMarketplace {
    ChromadinCollection public chromadinCollection;
    ChromadinEscrow public chromadinEscrow;
    ChromadinNFT public chromadinNFT;
    AccessControl public accessControl;
    string public symbol;
    string public name;

    mapping(address => string[]) private buyerToFulfillment;
    mapping(uint256 => uint256) private tokensSold;
    mapping(uint256 => uint256[]) private tokenIdsSold;

    modifier onlyAdmin() {
        require(
            accessControl.isAdmin(msg.sender),
            "AccessControl: Only admin can perform this action"
        );
        _;
    }

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
    event ChromadinNFTUpdated(
        address indexed oldChromadinNFT,
        address indexed newChromadinNFT,
        address updater
    );
    event ChromadinEscrowUpdated(
        address indexed oldChromadinEscrow,
        address indexed newChromadinEscrow,
        address updater
    );
    event TokensBought(uint256[] tokenIds, uint256 totalPrice, address buyer);

    constructor(
        address _collectionContract,
        address _accessControlContract,
        address _NFTContract,
        string memory _symbol,
        string memory _name
    ) {
        chromadinCollection = ChromadinCollection(_collectionContract);
        accessControl = AccessControl(_accessControlContract);
        chromadinNFT = ChromadinNFT(_NFTContract);
        symbol = _symbol;
        name = _name;
    }

    function buyTokens(
        uint256[] memory _tokenIds,
        address _chosenTokenAddress,
        string memory _fulfillmentContent
    ) external {
        uint256 totalPrice = 0;
        uint256[] memory prices = new uint256[](_tokenIds.length);

        for (uint256 i = 0; i < _tokenIds.length; i++) {
            require(
                chromadinNFT.ownerOf(_tokenIds[i]) == address(chromadinEscrow),
                "ChromadinMarketplace: Token must be owned by Escrow"
            );
            bool isAccepted = false;
            address[] memory acceptedTokens = chromadinNFT
                .getTokenAcceptedTokens(_tokenIds[i]);
            for (uint256 j = 0; j < acceptedTokens.length; j++) {
                if (acceptedTokens[j] == _chosenTokenAddress) {
                    isAccepted = true;
                    break;
                }
            }
            require(
                isAccepted,
                "ChromadinMarketplace: Chosen token address is not an accepted token for the collection"
            );
        }

        for (uint256 i = 0; i < _tokenIds.length; i++) {
            address[] memory acceptedTokens = chromadinNFT
                .getTokenAcceptedTokens(_tokenIds[i]);
            for (uint256 j = 0; j < acceptedTokens.length; j++) {
                if (acceptedTokens[j] == _chosenTokenAddress) {
                    prices[i] = chromadinNFT.getTokenPrices(_tokenIds[i])[j];
                    totalPrice += prices[i];
                    break;
                }
            }
        }

        uint256 buyerBalance = IERC20(_chosenTokenAddress).balanceOf(
            msg.sender
        );
        require(
            buyerBalance >= totalPrice,
            "ChromadinMarketplace: Insufficient balance"
        );

        uint256 allowance = IERC20(_chosenTokenAddress).allowance(
            msg.sender,
            address(this)
        );

        require(
            allowance >= totalPrice,
            "ChromadinMarketplace: Insufficient Approval Allowance"
        );

        for (uint256 i = 0; i < _tokenIds.length; i++) {
            IERC20(_chosenTokenAddress).transferFrom(
                msg.sender,
                chromadinNFT.getTokenCreator(_tokenIds[i]),
                prices[i]
            );
            chromadinEscrow.release(_tokenIds[i], false, msg.sender);
        }

        buyerToFulfillment[msg.sender].push(_fulfillmentContent);
        for (uint256 i = 0; i < _tokenIds.length; i++) {
            tokensSold[chromadinNFT.getTokenCollection(_tokenIds[i])] += 1;
            tokenIdsSold[chromadinNFT.getTokenCollection(_tokenIds[i])].push(
                _tokenIds[i]
            );
        }

        emit TokensBought(_tokenIds, totalPrice, msg.sender);
    }

    function removeFulfillmentContent(
        uint index,
        address _address
    ) external onlyAdmin {
        require(
            index < buyerToFulfillment[_address].length,
            "ChromadinMarketplace: Index out of range"
        );

        for (uint i = index; i < buyerToFulfillment[_address].length - 1; i++) {
            buyerToFulfillment[_address][i] = buyerToFulfillment[_address][
                i + 1
            ];
        }

        buyerToFulfillment[_address].pop();
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

    function getBuyerToFulfillment(
        address _address
    ) public view returns (string[] memory) {
        return buyerToFulfillment[_address];
    }

    function getCollectionSoldCount(
        uint256 _collectionId
    ) public view returns (uint256) {
        return tokensSold[_collectionId];
    }

    function getTokensSoldCollection(
        uint256 _collectionId
    ) public view returns (uint256[] memory) {
        return tokenIdsSold[_collectionId];
    }
}
