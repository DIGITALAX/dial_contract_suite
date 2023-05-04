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
    //   "0x90133B9fE1E2a72F8e3F8D19656c93644c9A6B55"
    // );
    // const chromadinNFT = await ChromadinNFT.deploy(
    //   "0x90133B9fE1E2a72F8e3F8D19656c93644c9A6B55"
    // );
    // const chromadinCollection = await ChromadinCollection.deploy(
    //   "0xcE48B60b97c615c4650F7dF26AD4AFADDc319F1d",
    //   "0x90133B9fE1E2a72F8e3F8D19656c93644c9A6B55",
    //   "0x5A2099eD5A12C74C9B7A5d5Fac17252c2B29560F",
    //   "Chromadin Collection",
    //   "CHROC"
    // );
    // const chromadinMarketplace = await ChromadinMarketplace.deploy(
    //   chromadinCollection.address,
    //   "0x90133B9fE1E2a72F8e3F8D19656c93644c9A6B55",
    //   "0xcE48B60b97c615c4650F7dF26AD4AFADDc319F1d",
    //   "Chromadin Marketplace",
    //   "CHROM"
    // );
    // const chromadinDrop = await ChromadinDrop.deploy(
    //   "0xA2f8D55Ae9b9652a82Fd750B3781a1802Cc5241c",
    //   "0x90133B9fE1E2a72F8e3F8D19656c93644c9A6B55",
    //   "Chromadin Drop",
    //   "CHROD"
    // );
    // const chromadinEscrow = await ChromadinEscrow.deploy(
    //   "0xA2f8D55Ae9b9652a82Fd750B3781a1802Cc5241c",
    //   "0x0811e237a4357944C3E29f7877A7580525524357",
    //   "0x90133B9fE1E2a72F8e3F8D19656c93644c9A6B55",
    //   "0xcE48B60b97c615c4650F7dF26AD4AFADDc319F1d",
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
    //   address: "0x5A2099eD5A12C74C9B7A5d5Fac17252c2B29560F",
    //   constructorArguments: ["0x90133B9fE1E2a72F8e3F8D19656c93644c9A6B55"],
    // });
    // await run(`verify:verify`, {
    //   address: "0xcE48B60b97c615c4650F7dF26AD4AFADDc319F1d",
    //   constructorArguments: ["0x90133B9fE1E2a72F8e3F8D19656c93644c9A6B55"],
    // });
    // await run(`verify:verify`, {
    //   address: "0xf635Ba5A7Bfc5061F6DFffE8947c53956151A309",
    //   constructorArguments: ["0xa376FdE1e0033a2624d95E3D4345aAd32d5fE1cD"],
    // });
    // await run(`verify:verify`, {
    //   address: "0xA2f8D55Ae9b9652a82Fd750B3781a1802Cc5241c",
    //   constructorArguments: [
    //     "0xcE48B60b97c615c4650F7dF26AD4AFADDc319F1d",
    //     "0x90133B9fE1E2a72F8e3F8D19656c93644c9A6B55",
    //     "0x5A2099eD5A12C74C9B7A5d5Fac17252c2B29560F",
    //     "Chromadin Collection",
    //     "CHROC",
    //   ],
    // });
    // await run(`verify:verify`, {
    //   address: "0x0811e237a4357944C3E29f7877A7580525524357",
    //   constructorArguments: [
    //     "0xA2f8D55Ae9b9652a82Fd750B3781a1802Cc5241c",
    //     "0x90133B9fE1E2a72F8e3F8D19656c93644c9A6B55",
    //     "0xcE48B60b97c615c4650F7dF26AD4AFADDc319F1d",
    //     "Chromadin Marketplace",
    //     "CHROM",
    //   ],
    // });
    await run(`verify:verify`, {
      address: "0x66f5320fDA50b9090C8508B81C678F477b77ec4c",
      constructorArguments: [
        "0xA2f8D55Ae9b9652a82Fd750B3781a1802Cc5241c",
        "0x90133B9fE1E2a72F8e3F8D19656c93644c9A6B55",
        "Chromadin Drop",
        "CHROD"
      ],
    });
    await run(`verify:verify`, {
      address: "0x9a7F05B65E00Ee4B09b40e55eb55843C0E5BD211",
      constructorArguments: [
        "0xA2f8D55Ae9b9652a82Fd750B3781a1802Cc5241c",
        "0x0811e237a4357944C3E29f7877A7580525524357",
        "0x90133B9fE1E2a72F8e3F8D19656c93644c9A6B55",
        "0xcE48B60b97c615c4650F7dF26AD4AFADDc319F1d",
        "Chromadin Escrow",
        "CHROE"
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
