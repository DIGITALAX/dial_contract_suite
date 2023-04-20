import { expect } from "chai";
import { ethers } from "hardhat";
import { BigNumber } from "ethers";

describe("ChromadinEscrow", function () {
  let accessControl: any,
    chromadinEscrow: any,
    chromadinCollection: any,
    chromadinNFT: any,
    chromadinMarketplace: any,
    chromadinDrop: any,
    chromadinPayment: any,
    admin: any,
    nonAdmin: any,
    token: any;

  beforeEach(async () => {
    [admin, nonAdmin] = await ethers.getSigners();
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

  describe("update contracts", () => {
    beforeEach("redeploy contracts", async () => {
      const AccessControl = await ethers.getContractFactory("AccessControl");
      const ChromadinEscrow = await ethers.getContractFactory(
        "ChromadinEscrow"
      );
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
    it("updates access", async () => {
      const old = await chromadinEscrow.accessControl();
      expect(await chromadinEscrow.updateAccessControl(accessControl.address))
        .to.emit("AccessControlUpdated")
        .withArgs(old, accessControl.address, admin.address);
      expect(await chromadinEscrow.accessControl()).to.equal(
        accessControl.address
      );
    });
    it("updates collection", async () => {
      const old = await chromadinEscrow.chromadinCollection();
      expect(
        await chromadinEscrow.updateChromadinCollection(
          chromadinCollection.address
        )
      )
        .to.emit("ChromadinCollectionUpdated")
        .withArgs(old, chromadinCollection.address, admin.address);
      expect(await chromadinEscrow.chromadinCollection()).to.equal(
        chromadinCollection.address
      );
    });
    it("updates marketplace", async () => {
      const old = await chromadinEscrow.chromadinMarketplace();
      expect(
        await chromadinEscrow.updateChromadinMarketplace(
          chromadinMarketplace.address
        )
      )
        .to.emit("ChromadinMarketplaceUpdated")
        .withArgs(old, chromadinMarketplace.address, admin.address);
      expect(await chromadinEscrow.chromadinMarketplace()).to.equal(
        chromadinMarketplace.address
      );
    });
    it("updates nft", async () => {
      const old = await chromadinEscrow.chromadinNFT();
      expect(await chromadinEscrow.updateChromadinNFT(chromadinNFT.address))
        .to.emit("ChromadinNFTUpdated")
        .withArgs(old, chromadinNFT.address, admin.address);
      expect(await chromadinEscrow.chromadinNFT()).to.equal(
        chromadinNFT.address
      );
    });
    it("updates fail for all without admin", async () => {
      await expect(
        chromadinEscrow
          .connect(nonAdmin)
          .updateAccessControl(accessControl.address)
      ).to.be.revertedWith("AccessControl: Only admin can perform this action");
      await expect(
        chromadinEscrow
          .connect(nonAdmin)
          .updateChromadinCollection(chromadinCollection.address)
      ).to.be.revertedWith("AccessControl: Only admin can perform this action");
      await expect(
        chromadinEscrow
          .connect(nonAdmin)
          .updateChromadinMarketplace(chromadinMarketplace.address)
      ).to.be.revertedWith("AccessControl: Only admin can perform this action");
      await expect(
        chromadinEscrow
          .connect(nonAdmin)
          .updateChromadinNFT(chromadinNFT.address)
      ).to.be.revertedWith("AccessControl: Only admin can perform this action");
    });
  });

  describe("deposit and release", () => {
    beforeEach("mint collection and add to drop", async () => {
      await chromadinCollection.mintCollection(
        "uri",
        3,
        "collection_one",
        [token.address],
        ["20000"],
        ["7000000000000000000", "32000000000000000000", "54000000000000000000"],
        ["200000000000000000", "1200000000000000000", "200000000000000000"],
        [
          "7000000000000000000",
          "32000000000000000000",
          "54000000000000000000",
          "7000000000000000000",
          "32000000000000000000",
          "54000000000000000000",
          "7000000000000000000",
          "32000000000000000000",
          "54000000000000000000",
        ]
      );
      await chromadinDrop.createDrop([1], "drop_uri");
    });

    describe("deposit", () => {
      it("calls deposit on mint to escrow", async () => {
        expect(await chromadinNFT.ownerOf(1)).to.equal(chromadinEscrow.address);
        expect(await chromadinNFT.ownerOf(2)).to.equal(chromadinEscrow.address);
        expect(await chromadinNFT.ownerOf(3)).to.equal(chromadinEscrow.address);
      });
      it("fails deposit if not depositer role", async () => {
        await expect(chromadinEscrow.deposit(2, false)).to.be.revertedWith(
          "ChromadinEscrow: Only the Chromadin Collection or NFT contract can call this function"
        );
      });
    });

    describe("release", () => {
      it("calls release on buy", async () => {
        // approve buyer
        token
          .connect(nonAdmin)
          .approve(
            chromadinMarketplace.address,
            BigNumber.from("50000000000000000000")
          );
        await chromadinMarketplace
          .connect(nonAdmin)
          .buyTokens([1, 3], token.address);
        expect(await chromadinNFT.ownerOf(1)).to.equal(nonAdmin.address);
        expect(await chromadinNFT.ownerOf(3)).to.equal(nonAdmin.address);
      });

      it("calls release on burn", async () => {
        await chromadinCollection.burnCollection(1);
        await expect(chromadinNFT.ownerOf(1)).to.be.reverted;
      });
      it("fails release if not creator", async () => {
        await expect(
          chromadinCollection.connect(nonAdmin).burnCollection(1)
        ).to.be.revertedWith(
          "ChromadinCollection: Only the creator can edit this collection"
        );
        expect(await chromadinNFT.ownerOf(1)).to.equal(chromadinEscrow.address);
        expect(await chromadinNFT.ownerOf(2)).to.equal(chromadinEscrow.address);
        expect(await chromadinNFT.ownerOf(3)).to.equal(chromadinEscrow.address);
      });
      it("fails release if not buyer for burn", async () => {
        await expect(chromadinNFT.connect(nonAdmin).burn(1)).to.be.revertedWith(
          "ERC721Metadata: Only token owner can burn token"
        );
      });
      it("fails release if not buyer for burn batch", async () => {
        await expect(
          chromadinNFT.connect(nonAdmin).burnBatch([1, 3])
        ).to.be.revertedWith(
          "ERC721Metadata: Only token owner can burn tokens"
        );
      });

      it("fails to release if not release role", async () => {
        await expect(
          chromadinEscrow.release(1, false, nonAdmin.address)
        ).to.be.revertedWith(
          "ChromadinEscrow: Only the Chromadin Marketplace contract can call this function"
        );
      });
    });
  });
});
