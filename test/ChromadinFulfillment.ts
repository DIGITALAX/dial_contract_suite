import { expect } from "chai";
import { ethers } from "hardhat";

describe("ChromadinFulfillment", function () {
  let accessControl: any,
    chromadinNFT: any,
    chromadinFulfillment: any,
    chromadinPayment: any,
    chromadinCollection: any,
    chromadinDrop: any,
    admin: any,
    nonAdmin: any,
    token: any;

  beforeEach(async () => {
    [admin, nonAdmin] = await ethers.getSigners();
    const AccessControl = await ethers.getContractFactory("AccessControl");
    const ChromadinNFT = await ethers.getContractFactory("ChromadinNFT");
    const ChromadinFulfillment = await ethers.getContractFactory(
      "ChromadinFulfillment"
    );
    const ChromadinPayment = await ethers.getContractFactory(
      "ChromadinPayment"
    );
    const ChromadinCollection = await ethers.getContractFactory(
      "ChromadinCollection"
    );
    const ChromadinDrop = await ethers.getContractFactory("ChromadinDrop");

    accessControl = await AccessControl.deploy(
      "Chromadin Access Control",
      "CHROA"
    );
    chromadinPayment = await ChromadinPayment.deploy(accessControl.address);
    chromadinNFT = await ChromadinNFT.deploy(accessControl.address);
    chromadinFulfillment = await ChromadinFulfillment.deploy(
      accessControl.address,
      chromadinNFT.address,
      "Chromadin Fulfillment",
      "CHROF"
    );
    chromadinCollection = await ChromadinCollection.deploy(
      chromadinNFT.address,
      accessControl.address,
      chromadinPayment.address,
      "Chromadin Collection",
      "CHROC"
    );
    chromadinDrop = await ChromadinDrop.deploy(
      chromadinCollection.address,
      accessControl.address,
      "Chromadin Drop",
      "CHROD"
    );

    // add the collection contract to admin  ////
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
      const old = await chromadinFulfillment.accessControl();
      (
        expect(
          await chromadinFulfillment.updateAccessControl(accessControl.address)
        ).to as any
      )
        .emit("AccessControlUpdated")
        .withArgs(old, accessControl.address, admin.address);
      expect(await chromadinFulfillment.accessControl()).to.equal(
        accessControl.address
      );
    });
    it("updates nft", async () => {
      const old = await chromadinFulfillment.chromadinNFT();
      (
        expect(
          await chromadinFulfillment.updateChromadinNFT(chromadinNFT.address)
        ).to as any
      )
        .emit("ChromadinNFTUpdated")
        .withArgs(old, chromadinNFT.address, admin.address);
      expect(await chromadinFulfillment.chromadinNFT()).to.equal(
        chromadinNFT.address
      );
    });

    it("updates fail for all without admin", async () => {
      (
        (await expect(
          chromadinFulfillment
            .connect(nonAdmin)
            .updateChromadinNFT(chromadinNFT.address)
        ).to.be) as any
      ).revertedWith("AccessControl: Only admin can perform this action");
      (
        (await expect(
          chromadinFulfillment
            .connect(nonAdmin)
            .updateAccessControl(accessControl.address)
        ).to.be) as any
      ).revertedWith("AccessControl: Only admin can perform this action");
    });
  });

  describe("item fulfillment", async () => {
    beforeEach("mint collection + add to drop", async () => {
      // all items
      await chromadinCollection.mintCollection(
        "uri1",
        10,
        "col 1",
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
      // only apparel
      await chromadinCollection.mintCollection(
        "uri2",
        10,
        "col 2",
        [token.address],
        ["20000"],
        [],
        ["7000000000000000000", "32000000000000000000", "54000000000000000000"],
        []
      );
      await chromadinDrop.createDrop([1, 2], "drop_uri_1");

      // only stickers
      await chromadinCollection.mintCollection(
        "uri3",
        4,
        "col 3",
        [token.address],
        ["20000"],
        ["7000000000000000000", "32000000000000000000", "54000000000000000000"],
        [],
        []
      );

      // only posters
      await chromadinCollection.mintCollection(
        "uri4",
        4,
        "col 4",
        [token.address],
        ["20000"],
        [],
        [],
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
      await chromadinDrop.createDrop([3, 4], "drop_uri_2");
    });

    describe("fulfill item", () => {
      xit("apparel fulfill", async () => {
        await (
          expect(
            chromadinFulfillment
              .connect(nonAdmin)
              .fulfillItems(
                13,
                [1, 3],
                [],
                [],
                token.address,
                "encrypteduri",
                1
              )
          ).to as any
        )
          .emit("OrderCreated")
          .withArgs(1, nonAdmin.address);
      });

      xit("sticker fulfill", async () => {
        chromadinFulfillment.fulfillItems(1, [1, 3], [], []);
      });

      xit("poster fulfill", async () => {
        chromadinFulfillment.fulfillItems(1, [1, 3], [], []);
      });

      xit("all fulfill", async () => {
        chromadinFulfillment.fulfillItems(1, [1, 3], [], []);
      });

      xit("reverts fulfillment if index out of range for inputted apparel, sticker, poster indexes", async () => {})

      xit("only fulfills items that are in order", async () => {});

      xit("check total price correct", async () => {});

      xit("reverts if dont own NFT", async () => {});

      xit("reverts if not approved", async () => {});

      xit("reverts if insufficient funds", async () => {});

      xit("reverts if token not accepted", async () => {});

      xit("creates the correct order variables", async () => {});
    });
  });

  describe("check if approved", () => {});

  describe("transfer if approved", () => {});

  describe("setters and getters for orders", () => {});

  describe("setters and getters for fulfillers", () => {});
});
