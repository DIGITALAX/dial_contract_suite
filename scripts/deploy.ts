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
    //   accessControl.address
    // );
    // const chromadinNFT = await ChromadinNFT.deploy(
    //   "0xa376FdE1e0033a2624d95E3D4345aAd32d5fE1cD"
    // );
    // const chromadinCollection = await ChromadinCollection.deploy(
    //   chromadinNFT.address,
    //   "0xa376FdE1e0033a2624d95E3D4345aAd32d5fE1cD",
    //   "0x072CE22Df013E72A7936a6738E694AE0a4221Ac9",
    //   "Chromadin Collection",
    //   "CHROC"
    // );
    // const chromadinMarketplace = await ChromadinMarketplace.deploy(
    //   "0x1809BD0f0Ecf31D59f055A8bA5727BCF5B01f9De",
    //   "0xa376FdE1e0033a2624d95E3D4345aAd32d5fE1cD",
    //   "0xf635Ba5A7Bfc5061F6DFffE8947c53956151A309",
    //   "Chromadin Marketplace",
    //   "CHROM"
    // );
    // const chromadinDrop = await ChromadinDrop.deploy(
    //   "0x1809BD0f0Ecf31D59f055A8bA5727BCF5B01f9De",
    //   "0xa376FdE1e0033a2624d95E3D4345aAd32d5fE1cD",
    //   "Chromadin Drop",
    //   "CHROD"
    // );
    // const chromadinEscrow = await ChromadinEscrow.deploy(
    //   "0x1809BD0f0Ecf31D59f055A8bA5727BCF5B01f9De",
    //   "0x641cf3F4Cfe8934fB40A7706CcB94fca22e99635",
    //   "0xa376FdE1e0033a2624d95E3D4345aAd32d5fE1cD",
    //   "0xf635Ba5A7Bfc5061F6DFffE8947c53956151A309",
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
    //   address: "0x464E4c5B9d8573986132c758C900f374e9165D2C",
    //   constructorArguments: ["0x50Aa3895a35087d7cfa81fb347875849083225AE"],
    // });
    // await run(`verify:verify`, {
    //   address: "0x072CE22Df013E72A7936a6738E694AE0a4221Ac9",
    //   constructorArguments: ["0xa376FdE1e0033a2624d95E3D4345aAd32d5fE1cD"],
    // });
    // await run(`verify:verify`, {
    //   address: "0xf635Ba5A7Bfc5061F6DFffE8947c53956151A309",
    //   constructorArguments: ["0xa376FdE1e0033a2624d95E3D4345aAd32d5fE1cD"],
    // });
    // await run(`verify:verify`, {
    //   address: "0x835eE8bb8be27f0749B3e2EB9DD7D6a663aa7079",
    //   constructorArguments: [
    //     "0xf635Ba5A7Bfc5061F6DFffE8947c53956151A309",
    //     "0xa376FdE1e0033a2624d95E3D4345aAd32d5fE1cD",
    //     "0x072CE22Df013E72A7936a6738E694AE0a4221Ac9",
    //     "Chromadin Collection",
    //     "CHROC",
    //   ],
    // });
    // await run(`verify:verify`, {
    //   address: "0x641cf3F4Cfe8934fB40A7706CcB94fca22e99635",
    //   constructorArguments: [
    //     "0x1809BD0f0Ecf31D59f055A8bA5727BCF5B01f9De",
    //     "0xa376FdE1e0033a2624d95E3D4345aAd32d5fE1cD",
    //     "0xf635Ba5A7Bfc5061F6DFffE8947c53956151A309",
    //     "Chromadin Marketplace",
    //     "CHROM"
    //   ],
    // });
    // await run(`verify:verify`, {
    //   address: "0xCF543C5Dd43c51e1015621Bc7Aac2eBBC9093b50",
    //   constructorArguments: [
    //     "0x1809BD0f0Ecf31D59f055A8bA5727BCF5B01f9De",
    //     "0xa376FdE1e0033a2624d95E3D4345aAd32d5fE1cD",
    //     "Chromadin Drop",
    //     "CHROD"
    //   ],
    // });
    // await run(`verify:verify`, {
    //   address: "0x3183d36DC497BE8d03f77eAb29e79F435782ea5e",
    //   constructorArguments: [
    //     "0x1809BD0f0Ecf31D59f055A8bA5727BCF5B01f9De",
    //     "0x641cf3F4Cfe8934fB40A7706CcB94fca22e99635",
    //     "0xa376FdE1e0033a2624d95E3D4345aAd32d5fE1cD",
    //     "0xf635Ba5A7Bfc5061F6DFffE8947c53956151A309",
    //     "Chromadin Escrow",
    //     "CHROE",
    //   ],
    // });
    await run(`verify:verify`, {
      address: "0x948ed9CD14Ce2B60Cee4bca0BCe1a65B95BD34d2",
      constructorArguments: [
        "0xa376FdE1e0033a2624d95E3D4345aAd32d5fE1cD",
        "SAMP",
        "SAMPLER",
      ],
    });
  } catch (err: any) {
    console.error(err.message);
  }
};

main();
