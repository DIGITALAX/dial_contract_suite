const { expect } = require("chai");
const { ethers } = require("hardhat");
import { BigNumber } from "ethers";

describe("ChromadinNFT + ChromadinCollection", function () {
  let accessControl: any,
    chromadinEscrow: any,
    chromadinCollection: any,
    chromadinNFT: any,
    chromadinMarketplace: any,
    chromadinDrop: any,
    chromadinPayment: any,
    admin: any,
    writer: any,
    nonAdmin: any,
    token: any;

  beforeEach(async () => {
    [admin, writer, nonAdmin] = await ethers.getSigners();
    const AccessControl = await ethers.getContractFactory("AccessControl");
    const ChromadinEscrow = await ethers.getContractFactory("ChromadinEscrow");
    const ChromadinCollection = await ethers.getContractFactory(
      "ChromadinCollection"
    );
    const ChromadinNFT = await ethers.getContractFactory("ChromadinNFT");
    const ChromadinPayment = await ethers.getContractFactory(
      "ChromadinPayment"
    );
    const ChromadinMarketplace = await ethers.getContractFactory(
      "ChromadinMarketplace"
    );
    const ChromadinDrop = await ethers.getContractFactory("ChromadinDrop");

    accessControl = await AccessControl.deploy(
      "Chromadin Access Control",
      "CHROA"
    );
    chromadinPayment = await ChromadinPayment.deploy(accessControl.address);
    chromadinNFT = await ChromadinNFT.deploy(accessControl.address);
    chromadinCollection = await ChromadinCollection.deploy(
      chromadinNFT.address,
      accessControl.address,
      chromadinPayment.address,
      "Chromadin Collection",
      "CHROC"
    );
    chromadinMarketplace = await ChromadinMarketplace.deploy(
      chromadinCollection.address,
      chromadinPayment.address,
      accessControl.address,
      chromadinNFT.address,
      "Chromadin Marketplace",
      "CHROM"
    );
    chromadinDrop = await ChromadinDrop.deploy(
      chromadinCollection.address,
      accessControl.address,
      "Chromadin Drop",
      "CHROD"
    );
    chromadinEscrow = await ChromadinEscrow.deploy(
      chromadinCollection.address,
      chromadinMarketplace.address,
      accessControl.address,
      chromadinNFT.address,
      "Chromadin Escrow",
      "CHROE"
    );
    await chromadinNFT
      .connect(admin)
      .setChromadinCollection(chromadinCollection.address);
    await chromadinNFT
      .connect(admin)
      .setChromadinEscrow(chromadinEscrow.address);
    await chromadinCollection
      .connect(admin)
      .setChromadinDrop(chromadinDrop.address);
    await chromadinCollection
      .connect(admin)
      .setChromadinEscrow(chromadinEscrow.address);
    await chromadinMarketplace
      .connect(admin)
      .setChromadinEscrow(chromadinEscrow.address);

    // add the collection contract to admin
    accessControl.addAdmin(chromadinCollection.address);

    // deploy test erc20 and transfer to nonAdmin
    const ERC20 = await ethers.getContractFactory("TestToken");
    token = await ERC20.deploy();
    await token.deployed();
    await token.transfer(nonAdmin.address, ethers.utils.parseEther("60"));

    // verify payment tokens
    chromadinPayment.setVerifiedPaymentTokens([
      token.address,
      "0x0000000000000000000000000000000000001010",
      "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    ]);
  });

  let tx: any,
    uri: string,
    collection_name: string,
    amount: number,
    acceptedTokens: string[],
    tokenPrices: string[],
    blockNumber: number;
  beforeEach("mint the collection", async () => {
    uri = "ipfs://newtoken";
    collection_name = "collection one";
    amount = 10;
    acceptedTokens = [
      token.address,
      "0x0000000000000000000000000000000000001010",
      "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    ];
    tokenPrices = [
      "200000000000000000",
      "1200000000000000000",
      "200000000000000000",
    ];

    tx = await chromadinCollection.mintCollection(
      uri,
      amount,
      collection_name,
      acceptedTokens,
      tokenPrices
    );

    blockNumber = await ethers.provider.getBlockNumber();
  });

  describe("should mint a new collection + batch of tokens", () => {
    it("emits collection minted", async () => {
      expect(tx)
        .to.emit("CollectionMinted")
        .withArgs(
          chromadinCollection.collectionSupply(),
          collection_name,
          uri,
          10,
          admin.address
        );
    });

    it("has a correct nft total supply", async () => {
      expect(await chromadinNFT.totalSupply()).to.equal(amount);
    });

    it("has a correct collection id", async () => {
      expect(await chromadinCollection.collectionSupply()).to.equal(1);
    });

    it("has correct uri for all minted tokens", async () => {
      for (let i = 1; i < amount; i++) {
        expect(await chromadinNFT.tokenURI(i)).to.equal(uri);
      }
    });

    it("has correct id for all minted tokens", async () => {
      for (let i = 1; i < amount; i++) {
        expect(await chromadinNFT.getTokenId(i)).to.equal(i);
      }
    });

    it("creator to be minter of collection", async () => {
      expect(await chromadinCollection.getCollectionCreator(1)).to.equal(
        admin.address
      );
    });

    it("collection name", async () => {
      expect(await chromadinCollection.getCollectionName(1)).to.equal(
        collection_name
      );
    });

    it("collection includes correct token ids", async () => {
      expect(await chromadinCollection.getCollectionTokenIds(1)).to.eql([
        BigNumber.from("1"),
        BigNumber.from("2"),
        BigNumber.from("3"),
        BigNumber.from("4"),
        BigNumber.from("5"),
        BigNumber.from("6"),
        BigNumber.from("7"),
        BigNumber.from("8"),
        BigNumber.from("9"),
        BigNumber.from("10"),
      ]);
    });

    it("all tokens are owned by escrow", async () => {
      for (let i = 1; i < amount; i++) {
        expect(await chromadinNFT.ownerOf(i)).to.equal(chromadinEscrow.address);
      }
    });

    it("creator to be minter for collection + nfts", async () => {
      for (let i = 1; i < amount; i++) {
        expect(await chromadinNFT.getTokenCreator(i)).to.equal(admin.address);
      }
    });

    it("accepted tokens for all", async () => {
      for (let i = 1; i < amount; i++) {
        expect(await chromadinNFT.getTokenAcceptedTokens(i)).to.deep.equal([
          token.address,
          "0x0000000000000000000000000000000000001010",
          "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
        ]);
      }
    });

    it("accepted prices for all", async () => {
      for (let i = 1; i < amount; i++) {
        expect(await chromadinNFT.getTokenPrices(i)).to.eql([
          BigNumber.from("200000000000000000"),
          BigNumber.from("1200000000000000000"),
          BigNumber.from("200000000000000000"),
        ]);
      }
    });

    it("is burn is false for all", async () => {
      for (let i = 1; i < amount; i++) {
        expect(await chromadinNFT.getTokenIsBurned(i)).to.equal(false);
      }
    });

    it("correct timestamp for all", async () => {
      const block = await ethers.provider.getBlock(blockNumber);
      for (let i = 1; i < amount; i++) {
        expect(await chromadinNFT.getTokenTimestamp(i)).to.equal(
          block.timestamp
        );
      }
    });
  });

  describe("it should correctly track 2nd collection", async () => {
    beforeEach("mints second collection", async () => {
      await chromadinCollection.mintCollection(
        "second_uri",
        15,
        collection_name,
        acceptedTokens,
        tokenPrices
      );
      blockNumber = await ethers.provider.getBlockNumber();
    });

    it("new collection id", async () => {
      expect(await chromadinCollection.collectionSupply()).to.equal(2);
    });

    it("new token ids", async () => {
      expect(await chromadinCollection.getCollectionTokenIds(2)).to.eql([
        BigNumber.from("11"),
        BigNumber.from("12"),
        BigNumber.from("13"),
        BigNumber.from("14"),
        BigNumber.from("15"),
        BigNumber.from("16"),
        BigNumber.from("17"),
        BigNumber.from("18"),
        BigNumber.from("19"),
        BigNumber.from("20"),
        BigNumber.from("21"),
        BigNumber.from("22"),
        BigNumber.from("23"),
        BigNumber.from("24"),
        BigNumber.from("25"),
      ]);
    });

    it("new total supply", async () => {
      expect(await chromadinNFT.totalSupply()).to.equal(25);
    });

    it("new uris", async () => {
      for (let i = amount + 1; i < amount + 15; i++) {
        expect(await chromadinNFT.tokenURI(i + 1)).to.equal("second_uri");
      }
    });

    it("new timestamp", async () => {
      const block = await ethers.provider.getBlock(blockNumber);
    });

    it("all tokens are owned by escrow", async () => {
      for (let i = amount + 1; i < amount + 15; i++) {
        expect(await chromadinNFT.ownerOf(i + 1)).to.equal(
          chromadinEscrow.address
        );
      }
    });
  });

  describe("it should fail to mint if not collection contract", () => {
    it("fail mint batch", async () => {
      await expect(
        chromadinNFT.mintBatch(
          "second_uri",
          3,
          3,
          admin.address,
          acceptedTokens,
          tokenPrices
        )
      ).to.be.revertedWith(
        "ChromadinNFT: Only collection contract can mint tokens"
      );
    });

    it("fails mint if token and prices are not the same length", async () => {
      await expect(
        chromadinCollection.mintCollection(
          "second_uri",
          3,
          "coll_4",
          [token.address],
          tokenPrices
        )
      ).to.be.revertedWith("ChromadinCollection: Invalid input");
    });
  });

  describe("burn tokens", () => {
    beforeEach("buy from marketplace", async () => {
      // mint a second collection
      await chromadinCollection.mintCollection(
        "second_uri",
        15,
        collection_name,
        acceptedTokens,
        tokenPrices
      );

      // add collection to a drop
      await chromadinDrop.createDrop([1, 2], "drop_uri");

      // approve allowance
      await token
        .connect(nonAdmin)
        .approve(
          chromadinMarketplace.address,
          BigNumber.from("800000000000000000")
        );

      await chromadinMarketplace
        .connect(nonAdmin)
        .buyTokens([1, 2, 13], token.address, "fullfillment content");
    });

    it("it should burn a token as buyer / owner and emit event", async () => {
      expect(await chromadinNFT.connect(nonAdmin).burn(1))
        .to.emit("TokenBurned")
        .withArgs(1);
    });

    it("it should be set as burn from nft level and owner should be burn address", async () => {
      await chromadinNFT.connect(nonAdmin).burn(1);
      expect(await chromadinNFT.getTokenIsBurned(1)).to.equal(true);
      await expect(chromadinNFT.ownerOf(1)).to.be.reverted;
    });

    it("it should burn a batch of tokens", async () => {
      await chromadinNFT.connect(nonAdmin).burnBatch([1, 2, 13]);
      expect(await chromadinNFT.getTokenIsBurned(1)).to.equal(true);
      expect(await chromadinNFT.getTokenIsBurned(2)).to.equal(true);
      expect(await chromadinNFT.getTokenIsBurned(13)).to.equal(true);
    });

    describe("it should be set as burn from collection level", () => {
      beforeEach("burn collection", async () => {
        expect(await chromadinCollection.burnCollection(2))
          .to.emit("CollectionBurned")
          .withArgs(admin.address, 2);
      });

      it("it should be set as burn from collection level", async () => {
        expect(await chromadinCollection.getCollectionIsBurned(2)).to.equal(
          true
        );
      });
    });

    it("it should fail to burn if not creator or contract", async () => {
      await expect(
        chromadinCollection.connect(nonAdmin).burnCollection(2)
      ).to.be.revertedWith(
        "ChromadinCollection: Only the creator can edit this collection"
      );
    });
  });

  describe("update contract dependencies", () => {
    beforeEach("redeploy new contracts", async () => {
      const AccessControl = await ethers.getContractFactory("AccessControl");
      const ChromadinEscrow = await ethers.getContractFactory(
        "ChromadinEscrow"
      );
      const ChromadinCollection = await ethers.getContractFactory(
        "ChromadinCollection"
      );

      const accessControl = await AccessControl.deploy(
        "Chromadin Access Control",
        "CHROA"
      );
      const ChromadinNFT = await ethers.getContractFactory("ChromadinNFT");
      const ChromadinPayment = await ethers.getContractFactory(
        "ChromadinPayment"
      );
      const ChromadinMarketplace = await ethers.getContractFactory(
        "ChromadinMarketplace"
      );
      const ChromadinDrop = await ethers.getContractFactory("ChromadinDrop");
      chromadinPayment = await ChromadinPayment.deploy(accessControl.address);
      chromadinNFT = await ChromadinNFT.deploy(accessControl.address);
      chromadinCollection = await ChromadinCollection.deploy(
        chromadinNFT.address,
        accessControl.address,
        chromadinPayment.address,
        "Chromadin Collection",
        "CHROC"
      );
      chromadinMarketplace = await ChromadinMarketplace.deploy(
        chromadinCollection.address,
        chromadinPayment.address,
        accessControl.address,
        chromadinNFT.address,
        "Chromadin Marketplace",
        "CHROM"
      );
      chromadinDrop = await ChromadinDrop.deploy(
        chromadinCollection.address,
        accessControl.address,
        "Chromadin Drop",
        "CHROD"
      );
      chromadinEscrow = await ChromadinEscrow.deploy(
        chromadinCollection.address,
        chromadinMarketplace.address,
        accessControl.address,
        chromadinNFT.address,
        "Chromadin Escrow",
        "CHROE"
      );
    });

    it("updates access controls", async () => {
      const old_access = await chromadinNFT.accessControl();
      expect(await chromadinNFT.updateAccessControl(accessControl.address))
        .to.emit("AccessControlUpdated")
        .withArgs(old_access, accessControl.address, admin.address);
      expect(await chromadinNFT.accessControl()).to.equal(
        accessControl.address
      );
      expect(
        await chromadinCollection.updateAccessControl(accessControl.address)
      )
        .to.emit("AccessControlUpdated")
        .withArgs(old_access, accessControl.address, admin.address);
      expect(await chromadinCollection.accessControl()).to.equal(
        accessControl.address
      );
    });

    it("updates escrow", async () => {
      expect(await chromadinNFT.setChromadinEscrow(chromadinEscrow.address))
        .to.emit("ChromadinEscrowUpdated")
        .withArgs(chromadinEscrow.address, admin.address);
      expect(await chromadinNFT.chromadinEscrow()).to.equal(
        chromadinEscrow.address
      );
      expect(
        await chromadinCollection.setChromadinEscrow(chromadinEscrow.address)
      )
        .to.emit("ChromadinEscrowUpdated")
        .withArgs(chromadinEscrow.address, admin.address);
      expect(await chromadinCollection.chromadinEscrow()).to.equal(
        chromadinEscrow.address
      );
    });

    it("updates collection", async () => {
      expect(
        await chromadinNFT.setChromadinCollection(chromadinCollection.address)
      )
        .to.emit("ChromadinCollectionUpdated")
        .withArgs(chromadinCollection.address, admin.address);
      expect(await chromadinNFT.chromadinCollection()).to.equal(
        chromadinCollection.address
      );
    });

    it("updates drop", async () => {
      expect(await chromadinCollection.setChromadinDrop(chromadinDrop.address))
        .to.emit("ChromadinDropUpdated")
        .withArgs(chromadinDrop.address, admin.address);
      expect(await chromadinCollection.chromadinDrop()).to.equal(
        chromadinDrop.address
      );
    });

    it("updates payment", async () => {
      expect(
        await chromadinCollection.updateChromadinPayment(
          chromadinPayment.address
        )
      )
        .to.emit("ChromadinPaymentUpdated")
        .withArgs(chromadinPayment.address, admin.address);
      expect(await chromadinCollection.chromadinPayment()).to.equal(
        chromadinPayment.address
      );
    });

    it("updates NFT", async () => {
      expect(await chromadinCollection.updateChromadinNFT(chromadinNFT.address))
        .to.emit("ChromadinNFTUpdated")
        .withArgs(chromadinNFT.address, admin.address);
      expect(await chromadinCollection.chromadinNFT()).to.equal(
        chromadinNFT.address
      );
    });

    it("should fail all updates if not admin", async () => {
      await expect(
        chromadinNFT
          .connect(nonAdmin)
          .setChromadinCollection(chromadinCollection.address)
      ).to.be.revertedWith("AccessControl: Only admin can perform this action");
      await expect(
        chromadinNFT
          .connect(nonAdmin)
          .setChromadinEscrow(chromadinEscrow.address)
      ).to.be.revertedWith("AccessControl: Only admin can perform this action");
      await expect(
        chromadinNFT
          .connect(nonAdmin)
          .updateAccessControl(accessControl.address)
      ).to.be.revertedWith("AccessControl: Only admin can perform this action");
      await expect(
        chromadinCollection
          .connect(nonAdmin)
          .updateAccessControl(accessControl.address)
      ).to.be.revertedWith("AccessControl: Only admin can perform this action");
      await expect(
        chromadinCollection
          .connect(nonAdmin)
          .updateChromadinNFT(chromadinNFT.address)
      ).to.be.revertedWith("AccessControl: Only admin can perform this action");
      await expect(
        chromadinCollection
          .connect(nonAdmin)
          .setChromadinEscrow(chromadinEscrow.address)
      ).to.be.revertedWith("AccessControl: Only admin can perform this action");
      await expect(
        chromadinCollection
          .connect(nonAdmin)
          .setChromadinDrop(chromadinDrop.address)
      ).to.be.revertedWith("AccessControl: Only admin can perform this action");
      await expect(
        chromadinCollection
          .connect(nonAdmin)
          .updateChromadinPayment(chromadinPayment.address)
      ).to.be.revertedWith("AccessControl: Only admin can perform this action");
    });
  });

  describe("it should update setters and read getters", () => {
    beforeEach("create collection with write address", async () => {
      // give access control to writer
      await accessControl.addWriter(writer.address);
      await chromadinCollection
        .connect(writer)
        .mintCollection(
          "third_uri",
          6,
          "collection_three",
          acceptedTokens,
          tokenPrices
        );
    });

    it("set URI", async () => {
      const old = await chromadinCollection.getCollectionURI(2);
      expect(
        await chromadinCollection
          .connect(writer)
          .setCollectionURI("new_token", 2)
      )
        .to.emit("CollectionURIUpdated")
        .withArgs(2, old, "new_token", writer.address);
      expect(await chromadinCollection.getCollectionURI(2)).to.equal(
        "new_token"
      );
      expect(await chromadinNFT.tokenURI(13)).to.equal("new_token");
    });

    it("set tokens accepted", async () => {
      const old = await chromadinCollection.getCollectionAcceptedTokens(2);
      expect(
        await chromadinCollection
          .connect(writer)
          .setCollectionAcceptedTokens(2, [token.address])
      )
        .to.emit("CollectionAcceptedTokensUpdated")
        .withArgs(2, old, [token.address], writer.address);
      expect(
        await chromadinCollection.getCollectionAcceptedTokens(2)
      ).to.deep.equal([token.address]);
      expect(await chromadinNFT.getTokenAcceptedTokens(13)).to.deep.equal([
        token.address,
      ]);
    });

    it("set prices", async () => {
      const old = await chromadinCollection.getCollectionPrices(2);
      expect(
        await chromadinCollection
          .connect(writer)
          .setCollectionPrices(2, ["2000000"])
      )
        .to.emit("CollectionPricesUpdated")
        .withArgs(2, old, ["2000000"], writer.address);
      expect(await chromadinCollection.getCollectionPrices(2)).to.deep.equal([
        BigNumber.from("2000000"),
      ]);
      expect(await chromadinNFT.getTokenPrices(13)).to.deep.eql([
        BigNumber.from("2000000"),
      ]);
    });

    it("set collection name", async () => {
      const old = await chromadinCollection.getCollectionName(2);
      expect(
        await chromadinCollection
          .connect(writer)
          .setCollectionName("new_name_2", 2)
      )
        .to.emit("CollectionNameUpdated")
        .withArgs(2, old, "new_name_2", writer.address);
      expect(await chromadinCollection.getCollectionName(2)).to.equal(
        "new_name_2"
      );
    });

    it("should fail all setters if not creator / collection contract", async () => {
      await expect(
        chromadinCollection.setCollectionURI("new_token", 2)
      ).to.be.revertedWith(
        "ChromadinCollection: Only the creator can edit this collection"
      );
      await expect(
        chromadinCollection.setCollectionAcceptedTokens(2, [token.address])
      ).to.be.revertedWith(
        "ChromadinCollection: Only the creator can edit this collection"
      );
      await expect(
        chromadinCollection.setCollectionName("new_name_2", 2)
      ).to.be.revertedWith(
        "ChromadinCollection: Only the creator can edit this collection"
      );
      await expect(
        chromadinCollection.setCollectionPrices(2, ["2000000"])
      ).to.be.revertedWith(
        "ChromadinCollection: Only the creator can edit this collection"
      );
      await expect(
        chromadinNFT.setTokenURI(13, "new_token")
      ).to.be.revertedWith(
        "ChromadinNFT: Only collection contract can mint tokens"
      );
      await expect(
        chromadinNFT.setTokenAcceptedTokens(13, [token.address])
      ).to.be.revertedWith(
        "ChromadinNFT: Only collection contract can mint tokens"
      );
      await expect(
        chromadinNFT.setTokenPrices(13, ["2000000"])
      ).to.be.revertedWith(
        "ChromadinNFT: Only collection contract can mint tokens"
      );
    });

    it("should fail setters if collection not all in escrow", async () => {
      // buy from another collection
      await chromadinCollection.mintCollection(
        "second_uri",
        2,
        collection_name,
        [token.address],
        ["100000"]
      );

      // add collection to a drop
      await chromadinDrop.createDrop([3], "drop_uri");

      // approve allowance
      await token
        .connect(nonAdmin)
        .approve(chromadinMarketplace.address, BigNumber.from("100000000"));

      await chromadinMarketplace
        .connect(nonAdmin)
        .buyTokens([18], token.address, "fullfillment content");

      await expect(
        chromadinCollection.setCollectionURI("new_token", 3)
      ).to.be.revertedWith(
        "ChromadinCollection: The entire collection must be owned by Escrow to update"
      );
      await expect(
        chromadinCollection.setCollectionAcceptedTokens(3, [token.address])
      ).to.be.revertedWith(
        "ChromadinCollection: The entire collection must be owned by Escrow to update"
      );
      await expect(
        chromadinCollection.setCollectionName("new_name_2", 3)
      ).to.be.revertedWith(
        "ChromadinCollection: The entire collection must be owned by Escrow to update"
      );
      await expect(
        chromadinCollection.setCollectionPrices(3, ["2000000"])
      ).to.be.revertedWith(
        "ChromadinCollection: The entire collection must be owned by Escrow to update"
      );
    });
  });
});
