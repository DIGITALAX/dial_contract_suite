import { ethers, run } from "hardhat";

const main = async () => {
  try {
    const AccessControl = await ethers.getContractFactory("AccessControl");
    const TheDialWhitelist = await ethers.getContractFactory(
      "TheDialWhitelist"
    );

    const accessControl = await AccessControl.deploy("AccessControl", "ACON");
    const theDialWhitelist = await TheDialWhitelist.deploy(
      accessControl.address
    );

    const WAIT_BLOCK_CONFIRMATIONS = 20;

    accessControl.deployTransaction.wait(WAIT_BLOCK_CONFIRMATIONS);
    theDialWhitelist.deployTransaction.wait(WAIT_BLOCK_CONFIRMATIONS);

    console.log(`Whitelist Contract deployed at\n${theDialWhitelist.address}`);
    console.log(
      `Access Control Contract deployed at\n${accessControl.address}`
    );

    // await run(`verify:verify`, {
    //   address: "",
    //   constructorArguments: ["Access Control", "ACON"],
    // });

    // await run(`verify:verify`, {
    //   address: "",
    //   constructorArguments: [""],
    // });
  } catch (err: any) {
    console.error(err.message);
  }
};

main();
