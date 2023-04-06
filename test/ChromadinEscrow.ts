import { expect } from "chai";
import { ethers } from "hardhat";

describe("ChromadinEscrow", function () {
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

  xdescribe("update contracts", () => {
    xit("updates access", async () => {});
    xit("updates collection", async () => {});
    xit("updates marketplace", async () => {});
    xit("updates nft", async () => {});
    xit("updates fail for all without admin", async () => {});
  });

  xdescribe("deposit", () => {
    xit("calls deposit on mint", async () => {});
    xit("fails deposit if not depositer role", async () => {});
  });

  xdescribe("release", () => {
    xit("calls deposit on mint", async () => {});
    xit("fails deposit if not depositer role", async () => {});
  });

  xdescribe("release", () => {
    xit("calls release on buy", async () => {});
    xit("calls release on burn", async () => {});
    xit("fails release if not creator", async () => {});
    xit("fails release if not buyer", async () => {});
  });
});
