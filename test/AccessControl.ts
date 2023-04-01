import { expect } from "chai";
import { ethers } from "hardhat";

describe("Access Control Test Suite", () => {
  let admin: any, nonAdmin: any, writer: any, accessControl: any;
  beforeEach(async () => {
    [admin, writer, nonAdmin] = await ethers.getSigners();
    const AccessControl = await ethers.getContractFactory("AccessControl");
    accessControl = await AccessControl.deploy("AccessControl", "ACON");
  });

  describe("addAdmin", () => {
    it("the deployer should be an admin", async () => {
      expect(
        await accessControl.connect(admin).isAdmin(admin.address)
      ).to.equal(true);
    });

    it("should fail when non-admin adds a new admin", async () => {
      await (
        expect(accessControl.connect(nonAdmin).addAdmin(writer.address)).to
          .be as any
      ).revertedWith("Only admins can perform this action");
    });

    it("should add a new admin", async () => {
      await accessControl.addAdmin(nonAdmin.address);
      expect(await accessControl.isAdmin(nonAdmin.address)).to.equal(true);
    });

    it("should fail when an admin adds themselves", async () => {
      await (
        expect(accessControl.connect(admin).addAdmin(admin.address)).to
          .be as any
      ).revertedWith("Cannot add existing admin or yourself");
    });

    it("should fail when an admin already exists", async () => {
      await accessControl.addAdmin(nonAdmin.address);
      await (
        expect(accessControl.connect(admin).addAdmin(nonAdmin.address)).to
          .be as any
      ).revertedWith("Cannot add existing admin or yourself");
    });
  });

  describe("removeAdmin", () => {
    it("should remove an existing admin", async () => {
      await accessControl.addAdmin(nonAdmin.address);
      await accessControl.removeAdmin(nonAdmin.address);
      expect(await accessControl.isAdmin(nonAdmin.address)).to.equal(false);
    });

    it("should fail when non-admin removes an admin", async () => {
      await (
        expect(accessControl.connect(nonAdmin).removeAdmin(admin.address)).to
          .be as any
      ).revertedWith("Only admins can perform this action");
    });

    it("should fail when an admin removes themselves", async () => {
      await (
        expect(accessControl.removeAdmin(admin.address)).to.be as any
      ).revertedWith("Cannot remove yourself as admin");
    });
  });

  describe("addWriter", () => {
    it("should add a new writer", async () => {
      await accessControl.addWriter(writer.address);
      expect(await accessControl.isWriter(writer.address)).to.equal(true);
    });

    it("should fail when non-admin adds a new writer", async () => {
      await (
        expect(accessControl.connect(nonAdmin).addWriter(writer.address)).to
          .be as any
      ).revertedWith("Only admins can perform this action");
    });
  });

  describe("removeWriter", () => {
    it("should remove an existing writer", async () => {
      await accessControl.removeWriter(writer.address);
      expect(await accessControl.isWriter(writer.address)).to.equal(false);
    });

    it("should fail when non-admin removes a writer", async () => {
      await (
        expect(accessControl.connect(nonAdmin).removeWriter(writer.address)).to
          .be as any
      ).revertedWith("Only admins can perform this action");
    });
  });

  describe("constants", () => {
    it("returns the symbol", async () => {
      expect(await accessControl.symbol()).to.equal("ACON");
    });

    it("returns the name", async () => {
      expect(await accessControl.name()).to.equal("AccessControl");
    });
  });
});
