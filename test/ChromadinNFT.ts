const { expect } = require("chai");
const { ethers } = require("hardhat");
import { BigNumber } from "ethers";

describe("ChromadinNFT", function () {
  let accessControl: any,
    chromadinEscrow: any,
    chromadinCollection: any,
    chromadinNFT: any,
    chromadinMarketplace: any,
    chromadinDrop: any,
    chromadinPayment: any,
    admin: any,
    writer: any,
    nonAdmin: any;

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

    // verify payment tokens
    chromadinPayment.setVerifiedPaymentTokens([
      "0x0000000000000000000000000000000000001010",
      "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    ]);
  });

  describe("should mint a new collection + batch of tokens", () => {
    let tx: any,
      uri: string,
      collection_name: string,
      amount: number,
      acceptedTokens: string[],
      tokenPrices: string[];
    this.beforeEach("mint the collection", async () => {
      uri = "ipfs://newtoken";
      collection_name = "collection one";
      amount = 10;
      acceptedTokens = [
        "0x0000000000000000000000000000000000001010",
        "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
      ];
      tokenPrices = ["1200000000000000000", "200000000000000000"];

      tx = await chromadinCollection.mintCollection(
        uri,
        amount,
        collection_name,
        acceptedTokens,
        tokenPrices
      );
    });

    it("emits collection minted", async () => {
      expect(tx)
        .to.emit("CollectionMinted")
        .withArgs(
          chromadinCollection.collectionId(),
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
      expect(await chromadinCollection.collectionId()).to.equal(1);
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

    // escrow owns the tokens
    // expect(token.tokenId).to.equal(1);
    // expect(token.collectionId).to.equal(collectionId);
    // expect(token.creator).to.equal(creator);
    // expect(token.irlItems).to.deep.equal(irlItems);
    // expect(token.acceptedTokens).to.deep.equal(acceptedTokens);
    // expect(token.prices).to.deep.equal(prices);
    // expect(token.isBurned).to.equal(false);
    // expect(token.timestamp).to.equal(receipt.blockTimestamp);
  });

  xit("it should burn a token", async () => {});

  xit("it should burn a batch of tokens", async () => {});

  xit("it should update token URI", async () => {});

  xit("it should update access controls, collection and escrow contracts", async () => {});

  xit("it should read getters", async () => {});

  xit("it should update setters", async () => {});
});
