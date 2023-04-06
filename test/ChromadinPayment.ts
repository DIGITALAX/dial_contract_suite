import { expect } from "chai";
import { ethers } from "hardhat";

describe("ChromadinPayment", function () {
  let accessControl: any,
    chromadinPayment: any,
    admin: any,
    nonAdmin: any,
    token: any;

  beforeEach(async () => {
    [admin, nonAdmin] = await ethers.getSigners();
    const AccessControl = await ethers.getContractFactory("AccessControl");
    const ChromadinPayment = await ethers.getContractFactory(
      "ChromadinPayment"
    );

    accessControl = await AccessControl.deploy(
      "Chromadin Access Control",
      "CHROA"
    );
    chromadinPayment = await ChromadinPayment.deploy(accessControl.address);

    // deploy test erc20 and transfer to nonAdmin
    const ERC20 = await ethers.getContractFactory("TestToken");
    token = await ERC20.deploy();
  });

  describe("approve tokens and mint", () => {
    beforeEach("verify tokens", async () => {
      await chromadinPayment.setVerifiedPaymentTokens([
        token.address,
        "0x0000000000000000000000000000000000001010",
        "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
      ]);
    });

    it("checks tokens are verified", async () => {
      expect(await chromadinPayment.getVerifiedPaymentTokens()).to.deep.equal([
        token.address,
        "0x0000000000000000000000000000000000001010",
        "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
      ]);
    });

    it("fails verification for non-admin", async () => {
      await (
        expect(
          chromadinPayment
            .connect(nonAdmin)
            .setVerifiedPaymentTokens([
              token.address,
              "0x0000000000000000000000000000000000001010",
              "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
            ])
        ).to.be as any
      ).revertedWith("AccessControl: Only admin can perform this action");
    });

    it("updates verified tokens", async () => {
      await chromadinPayment.setVerifiedPaymentTokens([token.address]);
      expect(await chromadinPayment.getVerifiedPaymentTokens()).to.deep.equal([
        token.address,
      ]);
    });

    it("updates access control", async () => {
      (
        expect(await chromadinPayment.updateAccessControl(token.address))
          .to as any
      )
        .emit("AccessControlUpdated")
        .withArgs(accessControl, token.address, admin.address);
      expect(await chromadinPayment.accessControl()).to.equal(token.address);
    });

    it("fails access control update for non-admin", async () => {
      await (
        expect(
          chromadinPayment.connect(nonAdmin).updateAccessControl(token.address)
        ).to.be as any
      ).revertedWith("AccessControl: Only admin can perform this action");
    });
  });
});
