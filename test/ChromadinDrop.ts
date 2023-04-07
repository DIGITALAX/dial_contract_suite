const { expect } = require("chai");
const { ethers } = require("hardhat");
import { BigNumber } from "ethers";

describe("ChromadinDrop", function () {
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

  let uri: string,
    collection_name: string,
    amount: number,
    acceptedTokens: string[],
    tokenPrices: string[];

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

    await chromadinCollection.mintCollection(
      uri,
      amount,
      collection_name,
      acceptedTokens,
      tokenPrices
    );
  });

  describe("create drop", () => {
    beforeEach("create multiple collections", async () => {
      await accessControl.addWriter(writer.address);
      await chromadinCollection.mintCollection(
        uri,
        amount,
        collection_name,
        acceptedTokens,
        tokenPrices
      );
      await chromadinCollection.mintCollection(
        uri,
        amount,
        collection_name,
        acceptedTokens,
        tokenPrices
      );
    });

    it("it creates a drop with multiple collections", async () => {
      expect(await chromadinDrop.createDrop([1, 2, 3], "drop_uri"))
        .to.emit("DropCreated")
        .withArgs(
          1,
          [BigNumber.from("1"), BigNumber.from("2"), BigNumber.from("3")],
          admin.address
        );
      expect(await chromadinDrop.collectionIdToDrop(1)).to.equal(1);
      expect(await chromadinDrop.collectionIdToDrop(2)).to.equal(1);
      expect(await chromadinDrop.collectionIdToDrop(3)).to.equal(1);
    });

    it("it fails to create a drop if not writer + owner of collections", async () => {
      // no writer
      await expect(
        chromadinDrop.connect(nonAdmin).createDrop([1, 2, 3], "drop_uri")
      ).to.be.revertedWith(
        "ChromadinDrop: Only the owner of a collection can add it to a drop"
      );

      // no owner of collection
      await expect(
        chromadinDrop.connect(writer).createDrop([1, 2, 3], "drop_uri")
      ).to.be.revertedWith(
        "ChromadinDrop: Only the owner of a collection can add it to a drop"
      );
    });

    it("fails to create a drop if collection does not exist", async () => {
      await expect(chromadinDrop.createDrop([0, 6], "drop")).to.be.reverted;
    });
  });

  describe("add collection to existing drop", () => {
    beforeEach("create drop", async () => {
      await chromadinCollection.mintCollection(
        uri,
        amount,
        collection_name,
        acceptedTokens,
        tokenPrices
      );
      await chromadinCollection.mintCollection(
        uri,
        amount,
        collection_name,
        acceptedTokens,
        tokenPrices
      );
      await chromadinDrop.createDrop([1, 2, 3], "drop_uri");
    });

    it("it adds collections", async () => {
      await chromadinCollection.mintCollection(
        uri,
        amount,
        collection_name,
        acceptedTokens,
        tokenPrices
      );
      expect(await chromadinDrop.addCollectionToDrop(1, 4))
        .to.emit("CollectionAddedToDrop")
        .withArgs(1, 4);
      expect(await chromadinDrop.getCollectionsInDrop(1)).to.deep.equal([
        BigNumber.from("1"),
        BigNumber.from("2"),
        BigNumber.from("3"),
        BigNumber.from("4"),
      ]);
      expect(await chromadinDrop.collectionIdToDrop(1)).to.equal(1);
      expect(await chromadinDrop.collectionIdToDrop(2)).to.equal(1);
      expect(await chromadinDrop.collectionIdToDrop(3)).to.equal(1);
      expect(await chromadinDrop.collectionIdToDrop(4)).to.equal(1);
    });

    it("fails to add a collection if it is already part of another drop", async () => {
      await expect(chromadinDrop.createDrop([1], "drop_uri")).to.be.reverted;
      chromadinDrop.createDrop([4], "drop_uri");
      await expect(chromadinDrop.addCollectionToDrop(2, 4)).to.be.reverted;
    });

    it("it fails to add a drop if not writer + owner of collections", async () => {
      chromadinDrop.createDrop([4], "drop_uri");
      await expect(chromadinDrop.connect(nonAdmin).addCollectionToDrop(2, 4)).to
        .be.reverted;
    });

    describe("delete drop / collection ", () => {
      it("removes a collection from a drop", async () => {
        expect(await chromadinDrop.removeCollectionFromDrop(1))
          .to.emit("CollectionRemovedFromDrop")
          .withArgs(1, 1);
        expect(await chromadinDrop.getCollectionsInDrop(1)).to.deep.equal([
          BigNumber.from("3"),
          BigNumber.from("2"),
        ]);
      });

      it("it fails to remove a collection if not writer + owner of collections", async () => {
        await expect(
          chromadinDrop.connect(nonAdmin).removeCollectionFromDrop(1)
        ).to.be.revertedWith(
          "ChromadinDrop: Only creator or collection contract can remove collection"
        );
      });

      it("it fails to remove a collection if the collection is not in the drop", async () => {
        await expect(chromadinDrop.removeCollectionFromDrop(5)).to.be.reverted;
      });

      it("deletes a drop and removes all collections", async () => {
        expect(await chromadinDrop.deleteDrop(1))
          .to.emit("DropDeleted")
          .withArgs(1, admin.address);

        expect(await chromadinDrop.collectionIdToDrop(1)).to.equal(0);
        expect(await chromadinDrop.collectionIdToDrop(2)).to.equal(0);
        expect(await chromadinDrop.collectionIdToDrop(3)).to.equal(0);
      });

      it("fails to delete drop if not drop owner/creator", async () => {
        await expect(
          chromadinDrop.connect(nonAdmin).deleteDrop(1)
        ).to.be.revertedWith(
          "ChromadinDrop: Only the owner of a collection can add it to a drop"
        );
      });
    });
  });

  describe("contract updates", () => {
    beforeEach("deploy new contracts", async () => {
      const AccessControl = await ethers.getContractFactory("AccessControl");
      const ChromadinNFT = await ethers.getContractFactory("ChromadinNFT");
      accessControl = await AccessControl.deploy(
        "Chromadin Access Control",
        "CHROA"
      );
      chromadinNFT = await ChromadinNFT.deploy(accessControl.address);
    });

    it("updates access", async () => {
      const old = await chromadinDrop.accessControl();
      expect(await chromadinDrop.updateAccessControl(accessControl.address))
        .to.emit("AccessControlUpdated")
        .withArgs(old, accessControl.address, admin.address);
      expect(await chromadinDrop.accessControl()).to.equal(
        accessControl.address
      );
    });

    it("updates collection", async () => {
      const old = await chromadinDrop.chromadinCollection();
      expect(
        await chromadinDrop.updateChromadinCollection(
          chromadinCollection.address
        )
      )
        .to.emit("ChromadinCollectionUpdated")
        .withArgs(old, chromadinCollection.address, admin.address);
      expect(await chromadinDrop.chromadinCollection()).to.equal(
        chromadinCollection.address
      );
    });

    it("fails to update if not admin", async () => {
      await expect(
        chromadinDrop
          .connect(nonAdmin)
          .updateChromadinCollection(chromadinCollection.address)
      ).to.be.revertedWith("AccessControl: Only admin can perform this action");

      await expect(
        chromadinDrop
          .connect(nonAdmin)
          .updateAccessControl(accessControl.address)
      ).to.be.revertedWith("AccessControl: Only admin can perform this action");
    });
  });

  describe("drop getters and setters", async () => {
    let blockNumber: any;
    beforeEach("create drop", async () => {
      await chromadinCollection.mintCollection(
        uri,
        amount,
        collection_name,
        acceptedTokens,
        tokenPrices
      );
      await chromadinCollection.mintCollection(
        uri,
        amount,
        collection_name,
        acceptedTokens,
        tokenPrices
      );
      await chromadinDrop.createDrop([1, 2, 3], "drop_uri");
      blockNumber = await ethers.provider.getBlockNumber();
    });

    it("returns the collections", async () => {
      expect(await chromadinDrop.getCollectionsInDrop(1)).to.deep.equal([
        BigNumber.from("1"),
        BigNumber.from("2"),
        BigNumber.from("3"),
      ]);
    });

    it("returns the uri", async () => {
      expect(await chromadinDrop.getDropURI(1)).to.equal("drop_uri");
    });

    it("returns the creator", async () => {
      expect(await chromadinDrop.getDropCreator(1)).to.equal(admin.address);
    });

    it("returns the timestamp", async () => {
      const block = await ethers.provider.getBlock(blockNumber);
      expect(await chromadinDrop.getDropTimestamp(1)).to.equal(block.timestamp);
    });

    it("updates the uri", async () => {
      expect(await chromadinDrop.setDropURI(1, "new_uri"))
        .to.emit("DropURIUpdated")
        .withArgs(1, "new_uri");
      expect(await chromadinDrop.getDropURI(1)).to.equal("new_uri");
    });

    it("fails to update the uri if not creator", async () => {
      await expect(
        chromadinDrop.connect(nonAdmin).setDropURI(1, "new_uri")
      ).to.be.revertedWith(
        "ChromadinDrop: Only the owner of a drop can edit a drop"
      );
    });

    it("collection removed from drop when burned", async () => {
      await chromadinCollection.burnCollection(1);
      expect(await chromadinDrop.getCollectionsInDrop(1)).to.deep.equal([
        BigNumber.from("2"),
        BigNumber.from("3"),
      ]);
    });
  });
});
