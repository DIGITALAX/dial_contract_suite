// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

import "./AccessControl.sol";
import "./ChromadinNFT.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ChromadinFulfillment {
    ChromadinNFT public chromadinNFT;
    AccessControl public accessControl;
    uint256 public orderSupply;
    string public symbol;
    string public name;

    struct Order {
        uint256 orderId;
        uint256 tokenId;
        string uri;
        address buyer;
        address chosenAddress;
        uint256 totalPrice;
        uint256 timestamp;
        string status;
        bool isFulfilled;
        uint256 fulfillerId;
    }

    struct Fulfiller {
        uint256 fulfillerId;
        uint256 fulfillerPercent;
        address fulfillerAddress;
    }

    mapping(uint256 => Order) public orders;
    mapping(uint256 => Fulfiller) public fulfillers;

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

    event OrderCreated(
        uint256 indexed orderId,
        address buyer,
        uint256 totalPrice
    );

    event FulfillerAddressUpdated(
        uint256 indexed fulfillerId,
        address newFulfillerAddress
    );

    event FulfillerPercentUpdated(
        uint256 indexed fulfillerId,
        uint256 newFulfillerPercent
    );

    modifier onlyAdmin() {
        require(
            accessControl.isAdmin(msg.sender),
            "AccessControl: Only admin can perform this action"
        );
        _;
    }

    modifier ownNFT(uint256 _tokenId) {
        require(
            msg.sender == chromadinNFT.ownerOf(_tokenId),
            "ChromadinFulfillment: Must own token"
        );
        _;
    }

    constructor(
        address _accessControlContract,
        address _NFTContract,
        string memory _symbol,
        string memory _name
    ) {
        accessControl = AccessControl(_accessControlContract);
        chromadinNFT = ChromadinNFT(_NFTContract);
        orderSupply = 0;
        symbol = _symbol;
        name = _name;
    }

    function fulfillItems(
        uint256 _tokenId,
        uint256[] memory _apparelItems,
        uint256[] memory _stickerItems,
        uint256[] memory _posterItems,
        address _chosenTokenAddress,
        string memory _uri,
        uint256 _fulfillerId
    ) external ownNFT(_tokenId) {
        address[] memory acceptedTokens = chromadinNFT.getTokenAcceptedTokens(
            _tokenId
        );
        bool isAccepted = false;

        for (uint256 j = 0; j < acceptedTokens.length; j++) {
            if (acceptedTokens[j] == _chosenTokenAddress) {
                isAccepted = true;
                break;
            }
        }
        require(
            isAccepted,
            "ChromadinFulfillment: Chosen token address is not an accepted token for the collection"
        );

        uint256 totalPrice = calculateTotalPrice(
            _apparelItems,
            _stickerItems,
            _posterItems,
            _tokenId
        );

        uint256 buyerBalance = IERC20(_chosenTokenAddress).balanceOf(
            msg.sender
        );
        require(
            buyerBalance >= totalPrice,
            "ChromadinFulfillment: Insufficient balance"
        );

        uint256 allowance = IERC20(_chosenTokenAddress).allowance(
            msg.sender,
            address(this)
        );

        require(
            allowance >= totalPrice,
            "ChromadinFulfillment: Insufficient Approval Allowance"
        );

        orderSupply++;

        transferPayment(
            _tokenId,
            _uri,
            _chosenTokenAddress,
            totalPrice,
            _fulfillerId
        );

        emit OrderCreated(orderSupply, msg.sender, totalPrice);
    }

    function transferPayment(
        uint256 _tokenId,
        string memory _uri,
        address _chosenTokenAddress,
        uint256 _totalPrice,
        uint256 _fulfillerId
    ) internal {
        Order memory newOrder = Order({
            orderId: orderSupply,
            tokenId: _tokenId,
            uri: _uri,
            buyer: msg.sender,
            chosenAddress: _chosenTokenAddress,
            totalPrice: _totalPrice,
            timestamp: block.timestamp,
            status: "ordered",
            isFulfilled: false,
            fulfillerId: _fulfillerId
        });

        orders[orderSupply] = newOrder;
        address creator = chromadinNFT.getTokenCreator(_tokenId);

        IERC20(_chosenTokenAddress).transferFrom(
            msg.sender,
            creator,
            _totalPrice -
                _totalPrice *
                fulfillers[_fulfillerId].fulfillerPercent
        );

        IERC20(_chosenTokenAddress).transferFrom(
            msg.sender,
            fulfillers[_fulfillerId].fulfillerAddress,
            _totalPrice * fulfillers[_fulfillerId].fulfillerPercent
        );
    }

    function calculateTotalPrice(
        uint256[] memory _apparelItems,
        uint256[] memory _stickerItems,
        uint256[] memory _posterItems,
        uint256 _tokenId
    ) internal view returns (uint256) {
        uint256 totalPrice = 0;

        if (_apparelItems.length > 0) {
            uint256[] memory apparelPrices = chromadinNFT.getApparelPrices(
                _tokenId
            );

            for (uint256 i = 0; i < _apparelItems.length; i++) {
                totalPrice += apparelPrices[_apparelItems[i]];
            }
        }

        if (_stickerItems.length > 0) {
            uint256[] memory stickerPrices = chromadinNFT.getStickerPrices(
                _tokenId
            );
            for (uint256 i = 0; i < _stickerItems.length; i++) {
                totalPrice += stickerPrices[_stickerItems[i]];
            }
        }

        if (_posterItems.length > 0) {
            uint256[] memory posterPrices = chromadinNFT.getPosterPrices(
                _tokenId
            );
            for (uint256 i = 0; i < _posterItems.length; i++) {
                totalPrice += posterPrices[_posterItems[i]];
            }
        }

        return totalPrice;
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

    function updateFulfillerPercent(
        uint256 _fulfillerId,
        uint256 _fulfillerPercent
    ) public {
        fulfillers[_fulfillerId].fulfillerPercent = _fulfillerPercent;
        emit FulfillerPercentUpdated(_fulfillerId, _fulfillerPercent);
    }

    function getFulfillerPercent(
        uint256 _fulfillerId
    ) public view returns (uint256) {
        return fulfillers[_fulfillerId].fulfillerPercent;
    }

    function updateFulfillerAddress(
        uint256 _fulfillerId,
        address _fulfillerAddress
    ) public {
        fulfillers[_fulfillerId].fulfillerAddress = _fulfillerAddress;
        emit FulfillerAddressUpdated(_fulfillerId, _fulfillerAddress);
    }

    function getFulfillerAddress(
        uint256 _fulfillerId
    ) public view returns (address) {
        return fulfillers[_fulfillerId].fulfillerAddress;
    }

    function getOrderTokenId(uint256 _orderId) public view returns (uint256) {
        return orders[_orderId].tokenId;
    }

    function getOrderUri(uint256 _orderId) public view returns (string memory) {
        return orders[_orderId].uri;
    }

    function getOrderBuyer(uint256 _orderId) public view returns (address) {
        return orders[_orderId].buyer;
    }

    function getOrderChosenAddress(
        uint256 _orderId
    ) public view returns (address) {
        return orders[_orderId].chosenAddress;
    }

    function getOrderTotalPrice(
        uint256 _orderId
    ) public view returns (uint256) {
        return orders[_orderId].totalPrice;
    }

    function getOrderTimestamp(uint256 _orderId) public view returns (uint256) {
        return orders[_orderId].timestamp;
    }

    function getOrderStatus(
        uint256 _orderId
    ) public view returns (string memory) {
        return orders[_orderId].status;
    }

    function getOrderIsFulfilled(uint256 _orderId) public view returns (bool) {
        return orders[_orderId].isFulfilled;
    }

    function getOrderFulfillerId(
        uint256 _orderId
    ) public view returns (uint256) {
        return orders[_orderId].fulfillerId;
    }
}
