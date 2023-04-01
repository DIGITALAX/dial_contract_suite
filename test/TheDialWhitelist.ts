import { expect } from "chai";
import { ethers } from "hardhat";

describe("The Dial Whitelist Test Suite", () => {
  let admin: any, deployer: any, user: any, theDialWhitelist: any;
  beforeEach(async () => {
    [deployer, admin, user] = await ethers.getSigners();
    const AccessControl = await ethers.getContractFactory("AccessControl");
    const TheDialWhitelist = await ethers.getContractFactory(
      "TheDialWhitelist"
    );
    const accessControl = await AccessControl.deploy("AccessControl", "ACON");
    await accessControl.addAdmin(admin.address);
    theDialWhitelist = await TheDialWhitelist.deploy(accessControl.address);
  });

  describe("mint", () => {
    it("should mint a new token to the specified address", async () => {
      const tokenId = await theDialWhitelist.tokenId();
      const uri = "tokenURI";
      expect(tokenId).to.equal(0);
      await theDialWhitelist.connect(admin).mint(user.address, uri);
      const tokenOwner = await theDialWhitelist.ownerOf(tokenId);
      expect(tokenOwner).to.equal(user.address);
      const tokenURI = await theDialWhitelist.tokenURI(tokenId);
      expect(tokenURI).to.equal(uri);
      const tokenIdAfter = await theDialWhitelist.tokenId();
      expect(tokenIdAfter).to.equal(1);
    });

    it("should revert if the caller is not an admin", async () => {
      const tokenId = await theDialWhitelist.tokenId();
      const uri = "tokenURI";
      await (
        expect(theDialWhitelist.connect(user).mint(user.address, uri)).to
          .be as any
      ).revertedWith("Only admin can perform this action");
    });
  });

  describe("removeFromWhitelist", () => {
    it("should remove the specified address from the whitelist", async () => {
      await theDialWhitelist.connect(admin).removeFromWhitelist(user.address);
      const isWhitelisted = await theDialWhitelist.isWhitelisted(user.address);
      expect(isWhitelisted).to.be.false;
    });

    it("should revert if the caller is not whitelisted admin", async () => {
      await (
        expect(theDialWhitelist.connect(user).removeFromWhitelist(user.address))
          .to.be as any
      ).revertedWith("Only admin can perform this action");
    });
  });

  describe("isWhitelisted", () => {
    it("should return true if the address is whitelisted", async () => {
      await theDialWhitelist.connect(admin).mint(user.address, "tokenURI");
      const isWhitelisted = await theDialWhitelist.isWhitelisted(user.address);
      expect(isWhitelisted).to.be.true;
    });

    it("should return false if the address is not whitelisted", async () => {
      const isWhitelisted = await theDialWhitelist.isWhitelisted(user.address);
      expect(isWhitelisted).to.be.false;
    });
  });

  describe("checkTokenId", () => {
    it("should return the correct token ID for the specified address", async () => {
      await theDialWhitelist.connect(admin).mint(user.address, "tokenURI");
      const tokenId = await theDialWhitelist.checkTokenId(user.address);
      expect(tokenId).to.equal(0);
    });

    it("should return 0 if the address has not been whitelisted", async () => {
      const tokenId = await theDialWhitelist.checkTokenId(user.address);
      expect(tokenId).to.equal(0);
    });
  });

  describe("transferPeriod", () => {
    beforeEach(async () => {
      await theDialWhitelist.mint(user.address, "uri");
    });

    it("should not be transferrable before 180 days", async () => {
      await (
        expect(
          theDialWhitelist
            .connect(user)
            .transferFrom(user.address, admin.address, 0)
        ).to.be as any
      ).revertedWith("This token is non-transferable at the moment.");
    });

    it("can be transferred after 180 days", async () => {
      const currentTime = Math.floor(Date.now() / 1000) + 1000;

      const duration = 180 * 24 * 60 * 60; // 180 days in seconds
      await ethers.provider.send("evm_setNextBlockTimestamp", [
        currentTime + duration,
      ]);
      await theDialWhitelist
        .connect(user)
        .transferFrom(user.address, admin.address, 0);
      const newOwner = await theDialWhitelist.ownerOf(0);
      expect(newOwner).to.equal(admin.address);
    });
  });
});
