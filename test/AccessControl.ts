import { expect } from "chai";
import { ethers } from "hardhat";

describe("Child FGO Test Suite", () => {
  let admin: any,
    nonAdmin: any,
    writer: any,
    nonWriter: any,
    accessControl: any;
  beforeEach(async () => {
    [admin, writer, nonAdmin, nonWriter] = await ethers.getSigners();
    const AccessControl = await ethers.getContractFactory("AccessControl");
    accessControl = await AccessControl.deploy("AccessControl", "ACON");
  });

  describe("addAdmin", () => {
    it("should fail when non-admin adds a new admin", async () => {
      await (
        expect(accessControl.connect(nonAdmin).addAdmin(writer)).to.be as any
      ).revertedWith("Only admins can perform this action");
    });

    it("should add a new admin", async () => {
      await accessControl.addAdmin(nonAdmin.address);
      expect(await accessControl.isAdmin(nonAdmin.address)).to.equal(true);
    });

    it("should fail when an admin adds themselves", async () => {
      await (
        expect(accessControl.connect(admin).addAdmin(admin)).to.be as any
      ).revertedWith("Cannot add existing admin or yourself");
    });

    it("should fail when an admin already exists", async () => {
      await (
        expect(accessControl.connect(admin).addAdmin(nonAdmin)).to.be as any
      ).revertedWith("Cannot add existing admin or yourself");
    });
  });

  describe("removeAdmin", () => {
    it("should remove an existing admin", async () => {
      await accessControl.removeAdmin(admin);
      expect(await accessControl.isAdmin(admin)).to.equal(false);
    });

    it("should fail when non-admin removes an admin", async () => {
      await (
        expect(accessControl.connect(nonAdmin).removeAdmin(admin)).to.be as any
      ).revertedWith("Only admins can perform this action");
    });

    it("should fail when an admin removes themselves", async () => {
      await (
        expect(accessControl.connect(nonAdmin).removeAdmin(nonAdmin)).to
          .be as any
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
});
