import { expect } from "chai";
import { ethers } from "hardhat";
import { BigNumber } from "ethers";

describe("ChromadinMarketplace", function () {
  let accessControl: any,
    chromadinEscrow: any,
    chromadinCollection: any,
    chromadinNFT: any,
    chromadinMarketplace: any,
    chromadinDrop: any,
    chromadinPayment: any,
    admin: any,
    nonAdmin: any,
    token2: any,
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
    token2 = await ERC20.deploy();
    await token2.deployed();
    await token2.transfer(nonAdmin.address, ethers.utils.parseEther("60"));

    // verify payment tokens
    chromadinPayment.setVerifiedPaymentTokens([
      token.address,
      "0x0000000000000000000000000000000000001010",
      "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
      token2.address,
    ]);
  });

  describe("update contracts", () => {
    beforeEach("deploy new contracts", async () => {
      const AccessControl = await ethers.getContractFactory("AccessControl");
      const ChromadinNFT = await ethers.getContractFactory("ChromadinNFT");
      const ChromadinEscrow = await ethers.getContractFactory(
        "ChromadinEscrow"
      );
      const ChromadinCollection = await ethers.getContractFactory(
        "ChromadinCollection"
      );
      const ChromadinMarketplace = await ethers.getContractFactory(
        "ChromadinMarketplace"
      );
      const ChromadinDrop = await ethers.getContractFactory("ChromadinDrop");
      const ChromadinPayment = await ethers.getContractFactory(
        "ChromadinPayment"
      );
      accessControl = await AccessControl.deploy(
        "Chromadin Access Control",
        "CHROA"
      );
      chromadinNFT = await ChromadinNFT.deploy(accessControl.address);
      chromadinPayment = await ChromadinPayment.deploy(accessControl.address);
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
      const old = await chromadinMarketplace.accessControl();
      (
        expect(
          await chromadinMarketplace.updateAccessControl(accessControl.address)
        ).to as any
      )
        .emit("AccessControlUpdated")
        .withArgs(old, accessControl.address, admin.address);
      expect(await chromadinMarketplace.accessControl()).to.equal(
        accessControl.address
      );
    });
    it("updates collection", async () => {
      const old = await chromadinMarketplace.chromadinCollection();
      (
        expect(
          await chromadinMarketplace.updateChromadinCollection(
            chromadinCollection.address
          )
        ).to as any
      )
        .emit("ChromadinCollectionUpdated")
        .withArgs(old, chromadinCollection.address, admin.address);
      expect(await chromadinMarketplace.chromadinCollection()).to.equal(
        chromadinCollection.address
      );
    });
    it("updates escrow", async () => {
      const old = await chromadinMarketplace.chromadinEscrow();
      (
        expect(
          await chromadinMarketplace.setChromadinEscrow(chromadinEscrow.address)
        ).to as any
      )
        .emit("ChromadinEscrowUpdated")
        .withArgs(old, chromadinEscrow.address, admin.address);
      expect(await chromadinMarketplace.chromadinEscrow()).to.equal(
        chromadinEscrow.address
      );
    });
    it("updates nft", async () => {
      const old = await chromadinMarketplace.chromadinNFT();
      (
        expect(
          await chromadinMarketplace.updateChromadinNFT(chromadinNFT.address)
        ).to as any
      )
        .emit("ChromadinNFTUpdated")
        .withArgs(old, chromadinNFT.address, admin.address);
      expect(await chromadinMarketplace.chromadinNFT()).to.equal(
        chromadinNFT.address
      );
    });
    it("updates fail for all without admin", async () => {
      (
        (await expect(
          chromadinMarketplace
            .connect(nonAdmin)
            .updateChromadinNFT(chromadinNFT.address)
        ).to) as any
      ).be.revertedWith("AccessControl: Only admin can perform this action");
      (
        (await expect(
          chromadinMarketplace
            .connect(nonAdmin)
            .updateChromadinCollection(chromadinCollection.address)
        ).to.be) as any
      ).revertedWith("AccessControl: Only admin can perform this action");
      (
        (await expect(
          chromadinMarketplace
            .connect(nonAdmin)
            .setChromadinEscrow(chromadinEscrow.address)
        ).to.be) as any
      ).revertedWith("AccessControl: Only admin can perform this action");
      (
        (await expect(
          chromadinMarketplace
            .connect(nonAdmin)
            .updateAccessControl(accessControl.address)
        ).to.be) as any
      ).revertedWith("AccessControl: Only admin can perform this action");
    });
  });

  describe("interactions", () => {
    beforeEach("mint collection + add to drop", async () => {
      await chromadinCollection.mintCollection(
        "uri1",
        10,
        "col 1",
        [token.address],
        ["20000"]
      );
      await chromadinCollection.mintCollection(
        "uri2",
        10,
        "col 2",
        [token.address],
        ["20000"]
      );
      await chromadinDrop.createDrop([1, 2], "drop_uri_1");

      await chromadinCollection.mintCollection(
        "uri3",
        4,
        "col 3",
        [token.address],
        ["20000"]
      );
      await chromadinCollection.mintCollection(
        "uri4",
        4,
        "col 4",
        [token.address],
        ["20000"]
      );
      await chromadinDrop.createDrop([3, 4], "drop_uri_2");

      // mint with token2
      await chromadinCollection.mintCollection(
        "uri5",
        4,
        "col 5",
        [token.address, token2.address],
        ["50000000000000000000", "50000000000000000000"]
      );
      await chromadinDrop.createDrop([5], "drop_uri_3");
    });

    describe("buy second token address", async () => {
      beforeEach("approve", async () => {
        token2
          .connect(nonAdmin)
          .approve(
            chromadinMarketplace.address,
            BigNumber.from("50000000000000000000")
          );
      });

      it("purchases with correct second token", async () => {
        (
          expect(
            await chromadinMarketplace
              .connect(nonAdmin)
              .buyTokens([30], token2.address)
          ).to as any
        )
          .emit("TokensBought")
          .withArgs([30], "50000000000000000000", nonAdmin.address);
      });

      it("sends correct second funds to creator", async () => {
        const balanceBefore = await token2.balanceOf(admin.address);
        await chromadinMarketplace
          .connect(nonAdmin)
          .buyTokens([31], token2.address);
        const expectedBalance = balanceBefore.add(
          BigNumber.from("50000000000000000000")
        );

        expect(await token2.balanceOf(admin.address)).to.equal(expectedBalance);
      });
    });

    describe("buy token", () => {
      beforeEach("approve", async () => {
        token
          .connect(nonAdmin)
          .approve(
            chromadinMarketplace.address,
            BigNumber.from("50000000000000000000")
          );
      });

      it("sends funds to creator", async () => {
        const balanceBefore = await token.balanceOf(admin.address);
        await chromadinMarketplace
          .connect(nonAdmin)
          .buyTokens([1, 5, 10, 11, 27, 26, 22], token.address);
        const expectedBalance = balanceBefore.add(BigNumber.from("140000"));

        expect(await token.balanceOf(admin.address)).to.equal(expectedBalance);
      });
      it("purchase one token", async () => {
        (
          expect(
            await chromadinMarketplace
              .connect(nonAdmin)
              .buyTokens([6], token.address)
          ).to as any
        )
          .emit("TokensBought")
          .withArgs([6], "20000", nonAdmin.address);
      });
      it("purchase multiple tokens", async () => {
        (
          expect(
            await chromadinMarketplace
              .connect(nonAdmin)
              .buyTokens([1, 5, 10, 11, 27, 26, 22], token.address)
          ).to as any
        )
          .emit("TokensBought")
          .withArgs([1, 5, 10, 11, 27, 26, 22], "140000", nonAdmin.address);
      });

      it("reject purchase if not approved", async () => {
        (
          (await expect(
            chromadinMarketplace
              .connect(admin)
              .buyTokens([1, 5, 10, 11, 27, 26, 22], token.address)
          ).to.be) as any
        ).revertedWith("ChromadinMarketplace: Insufficient Approval Allowance");
      });

      it("reject purchase if token not in escrow", async () => {
        await chromadinMarketplace
          .connect(nonAdmin)
          .buyTokens([1, 5, 10, 11, 27, 26, 22], token.address);
        (
          (await expect(
            chromadinMarketplace
              .connect(nonAdmin)
              .buyTokens([22, 10, 3], token.address)
          ).to.be) as any
        ).revertedWith("ChromadinMarketplace: Token must be owned by Escrow");
      });
      it("reject purchase if insufficient funds", async () => {
        token
          .connect(nonAdmin)
          .approve(
            chromadinMarketplace.address,
            BigNumber.from("200000000000000000000")
          );
        // await chromadinCollection.mintCollection(
        //   "uri1",
        //   10,
        //   "col 1",
        //   [token.address],
        //   ["50000000000000000000"]
        // );
        // await chromadinCollection.mintCollection(
        //   "uri2",
        //   10,
        //   "col 2",
        //   [token.address],
        //   ["50000000000000000000"]
        // );
        // await chromadinDrop.createDrop([5, 6], "drop_uri_3");

        (
          (await expect(
            chromadinMarketplace
              .connect(nonAdmin)
              .buyTokens([29, 30, 40], token.address)
          ).to.be) as any
        ).revertedWith("ChromadinMarketplace: Insufficient balance");
      });

      it("reject purchase if insufficient approval", async () => {
        token
          .connect(nonAdmin)
          .approve(
            chromadinMarketplace.address,
            BigNumber.from("40000000000000000000")
          );
        // await chromadinCollection.mintCollection(
        //   "uri1",
        //   10,
        //   "col 1",
        //   [token.address],
        //   ["50000000000000000000"]
        // );
        // await chromadinCollection.mintCollection(
        //   "uri2",
        //   10,
        //   "col 2",
        //   [token.address],
        //   ["50000000000000000000"]
        // );
        // await chromadinDrop.createDrop([5, 6], "drop_uri_3");

        (
          (await expect(
            chromadinMarketplace
              .connect(nonAdmin)
              .buyTokens([29], token.address)
          ).to.be) as any
        ).revertedWith("ChromadinMarketplace: Insufficient Approval Allowance");
      });

      it("reject purchase if token not approved / accepted for that nft + collection", async () => {
        (
          (await expect(
            chromadinMarketplace.buyTokens(
              [13],
              "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619"
            )
          ).to.be) as any
        ).revertedWith(
          "ChromadinMarketplace: Chosen token address is not an accepted token for the collection"
        );
      });
    });

    describe("sold", () => {
      beforeEach("approve and buy for different collections", async () => {
        token
          .connect(nonAdmin)
          .approve(
            chromadinMarketplace.address,
            BigNumber.from("60000000000000000000")
          );
        chromadinMarketplace
          .connect(nonAdmin)
          .buyTokens([1, 12, 24, 27, 28], token.address);
      });
      it("map how many have been sold in collection", async () => {
        expect(await chromadinMarketplace.getCollectionSoldCount(1)).to.equal(
          1
        );
        expect(await chromadinMarketplace.getCollectionSoldCount(2)).to.equal(
          1
        );
        expect(await chromadinMarketplace.getCollectionSoldCount(3)).to.equal(
          1
        );
        expect(await chromadinMarketplace.getCollectionSoldCount(4)).to.equal(
          2
        );
      });
      it("specific tokens sold in collection", async () => {
        expect(
          await chromadinMarketplace.getTokensSoldCollection(1)
        ).to.deep.equal([BigNumber.from("1")]);
        expect(
          await chromadinMarketplace.getTokensSoldCollection(2)
        ).to.deep.equal([BigNumber.from("12")]);
        expect(
          await chromadinMarketplace.getTokensSoldCollection(3)
        ).to.deep.equal([BigNumber.from("24")]);
        expect(
          await chromadinMarketplace.getTokensSoldCollection(4)
        ).to.deep.equal([BigNumber.from("27"), BigNumber.from("28")]);
      });
    });
  });
});
