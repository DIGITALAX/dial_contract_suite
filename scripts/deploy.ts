import { ethers, run } from "hardhat";

const main = async () => {
  try {
    // const AccessControl = await ethers.getContractFactory("AccessControl");
    // const TheDialWhitelist = await ethers.getContractFactory(
    //   "TheDialWhitelist"
    // );
    // const accessControl = await AccessControl.deploy("AccessControl", "CHROA");
    // const theDialWhitelist = await TheDialWhitelist.deploy(
    //   accessControl.address
    // );
    // const Sampler = await ethers.getContractFactory("Sampler");
    // const sampler = await Sampler.deploy(
    //   "0xa376FdE1e0033a2624d95E3D4345aAd32d5fE1cD",
    //   "SAMP",
    //   "SAMPLER"
    // );
    // const test = await ethers.getContractFactory("TestToken");
    // const testToken = await test.deploy();
    const WAIT_BLOCK_CONFIRMATIONS = 20;
    // sampler.deployTransaction.wait(WAIT_BLOCK_CONFIRMATIONS);
    // accessControl.deployTransaction.wait(WAIT_BLOCK_CONFIRMATIONS);
    // theDialWhitelist.deployTransaction.wait(WAIT_BLOCK_CONFIRMATIONS);
    // testToken.deployTransaction.wait(WAIT_BLOCK_CONFIRMATIONS);
    // console.log(`Test Token Contract deployed at\n${testToken.address}`);
    // console.log(`Whitelist Contract deployed at\n${theDialWhitelist.address}`);
    // console.log(
    //   `Access Control Contract deployed at\n${accessControl.address}`
    // );
    // console.log(`Sampler Contract deployed at\n${sampler.address}`);
    // const ChromadinPayment = await ethers.getContractFactory(
    //   "ChromadinPayment"
    // );
    // const ChromadinNFT = await ethers.getContractFactory("ChromadinNFT");
    // const ChromadinCollection = await ethers.getContractFactory(
    //   "ChromadinCollection"
    // );
    // const ChromadinMarketplace = await ethers.getContractFactory(
    //   "ChromadinMarketplace"
    // );
    // const ChromadinEscrow = await ethers.getContractFactory("ChromadinEscrow");

    // const ChromadinDrop = await ethers.getContractFactory("ChromadinDrop");
    // const chromadinPayment = await ChromadinPayment.deploy(
    //   "0xa376FdE1e0033a2624d95E3D4345aAd32d5fE1cD"
    // );
    // const chromadinCollection = await ChromadinCollection.deploy(
    //   "0x3A7C16d2061D0CE97BD82C22F9E105223d8195F9",
    //   "0xa376FdE1e0033a2624d95E3D4345aAd32d5fE1cD",
    //   "0xA3d9eF20CdAE81A05EDE2e428124bd46744d9397",
    //   "Chromadin Collection",
    //   "CHROC"
    // );
    // const chromadinMarketplace = await ChromadinMarketplace.deploy(
    //   chromadinCollection.address,
    //   "0xa376FdE1e0033a2624d95E3D4345aAd32d5fE1cD",
    //   "0x3A7C16d2061D0CE97BD82C22F9E105223d8195F9",
    //   "Chromadin Marketplace",
    //   "CHROM"
    // );
    // const chromadinDrop = await ChromadinDrop.deploy(
    //   "0x824eABbE8c32aA045e2d81d4a253ACa936e2e934",
    //   "0xa376FdE1e0033a2624d95E3D4345aAd32d5fE1cD",
    //   "Chromadin Drop",
    //   "CHROD"
    // );
    // const chromadinEscrow = await ChromadinEscrow.deploy(
    //   "0x824eABbE8c32aA045e2d81d4a253ACa936e2e934",
    //   "0xEa5a740F826b9F3602f800FDdB2FA2C7FF2ef6B9",
    //   "0xa376FdE1e0033a2624d95E3D4345aAd32d5fE1cD",
    //   "0x3A7C16d2061D0CE97BD82C22F9E105223d8195F9",
    //   "Chromadin Escrow",
    //   "CHROE"
    // );
    // chromadinPayment.deployTransaction.wait(WAIT_BLOCK_CONFIRMATIONS);
    // chromadinNFT.deployTransaction.wait(WAIT_BLOCK_CONFIRMATIONS);
    // chromadinCollection.deployTransaction.wait(WAIT_BLOCK_CONFIRMATIONS);
    // chromadinMarketplace.deployTransaction.wait(WAIT_BLOCK_CONFIRMATIONS);
    // chromadinDrop.deployTransaction.wait(WAIT_BLOCK_CONFIRMATIONS);
    // chromadinEscrow.deployTransaction.wait(WAIT_BLOCK_CONFIRMATIONS);
    // console.log(
    //   `Chromadin Payment Contract deployed at\n${chromadinPayment.address}`
    // );
    // console.log(`Chromadin NFT Contract deployed at\n${chromadinNFT.address}`);
    // console.log(
    //   `Chromadin Collection Contract deployed at\n${chromadinCollection.address}`
    // );
    // console.log(
    //   `Chromadin Marketplace Contract deployed at\n${chromadinMarketplace.address}`
    // );
    // console.log(
    //   `Chromadin Drop Contract deployed at\n${chromadinDrop.address}`
    // );
    // console.log(
    //   `Chromadin Escrow Contract deployed at\n${chromadinEscrow.address}`
    // );
    //   await run(`verify:verify`, {
    //   address: "0x6199A505ec1707695Ce49b59A07A147f2d50f22D",
    //   contract: "contracts/TestToken.sol:TestToken"
    // });
    // await run(`verify:verify`, {
    //   address: "0xa376FdE1e0033a2624d95E3D4345aAd32d5fE1cD",
    //   constructorArguments: ["AccessControl", "CHROA"],
    // });
    // await run(`verify:verify`, {
    //   address: "0x3A7C16d2061D0CE97BD82C22F9E105223d8195F9",
    //   constructorArguments: ["0xa376FdE1e0033a2624d95E3D4345aAd32d5fE1cD"],
    // });
    // await run(`verify:verify`, {
    //   address: "0x3A7C16d2061D0CE97BD82C22F9E105223d8195F9",
    //   constructorArguments: ["0xa376FdE1e0033a2624d95E3D4345aAd32d5fE1cD"],
    // });
    // await run(`verify:verify`, {
    //   address: "0xA3d9eF20CdAE81A05EDE2e428124bd46744d9397",
    //   constructorArguments: ["0xa376FdE1e0033a2624d95E3D4345aAd32d5fE1cD"],
    // });
    // await run(`verify:verify`, {
    //   address: "0x824eABbE8c32aA045e2d81d4a253ACa936e2e934",
    //   constructorArguments: [
    //     "0x3A7C16d2061D0CE97BD82C22F9E105223d8195F9",
    //     "0xa376FdE1e0033a2624d95E3D4345aAd32d5fE1cD",
    //     "0xA3d9eF20CdAE81A05EDE2e428124bd46744d9397",
    //     "Chromadin Collection",
    //     "CHROC",
    //   ],
    // });
    // await run(`verify:verify`, {
    //   address: "0xEa5a740F826b9F3602f800FDdB2FA2C7FF2ef6B9",
    //   constructorArguments: [
    //     "0x824eABbE8c32aA045e2d81d4a253ACa936e2e934",
    //     "0xa376FdE1e0033a2624d95E3D4345aAd32d5fE1cD",
    //     "0x3A7C16d2061D0CE97BD82C22F9E105223d8195F9",
    //     "Chromadin Marketplace",
    //     "CHROM",
    //   ],
    // });
    await run(`verify:verify`, {
      address: "0x056c985A007915aC5b6CD4Af45e11036Ee38f391",
      constructorArguments: [
        "0x824eABbE8c32aA045e2d81d4a253ACa936e2e934",
        "0xa376FdE1e0033a2624d95E3D4345aAd32d5fE1cD",
        "Chromadin Drop",
        "CHROD",
      ],
    });
    await run(`verify:verify`, {
      address: "0x91e9ae053E5Afc0192D338bBAB83e718BEe8F03A",
      constructorArguments: [
        "0x824eABbE8c32aA045e2d81d4a253ACa936e2e934",
        "0xEa5a740F826b9F3602f800FDdB2FA2C7FF2ef6B9",
        "0xa376FdE1e0033a2624d95E3D4345aAd32d5fE1cD",
        "0x3A7C16d2061D0CE97BD82C22F9E105223d8195F9",
        "Chromadin Escrow",
        "CHROE",
      ],
    });
    // await run(`verify:verify`, {
    //   address: "0x948ed9CD14Ce2B60Cee4bca0BCe1a65B95BD34d2",
    //   constructorArguments: [
    //     "0xa376FdE1e0033a2624d95E3D4345aAd32d5fE1cD",
    //     "SAMP",
    //     "SAMPLER",
    //   ],
    // });
  } catch (err: any) {
    console.error(err.message);
  }
};

main();
