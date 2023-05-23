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
    // const chromadinNFT = await ChromadinNFT.deploy(
    //   "0x90133B9fE1E2a72F8e3F8D19656c93644c9A6B55"
    // );
    // const chromadinCollection = await ChromadinCollection.deploy(
    //   chromadinNFT.address,
    //   "0x90133B9fE1E2a72F8e3F8D19656c93644c9A6B55",
    //   "0x5A2099eD5A12C74C9B7A5d5Fac17252c2B29560F",
    //   "Chromadin Collection",
    //   "CHROC"
    // );
    // const chromadinMarketplace = await ChromadinMarketplace.deploy(
    //   chromadinCollection.address,
    //   "0x90133B9fE1E2a72F8e3F8D19656c93644c9A6B55",
    //   chromadinNFT.address,
    //   "Chromadin Marketplace",
    //   "CHROM"
    // );
    // const chromadinDrop = await ChromadinDrop.deploy(
    //   "0xe36805ff8b9Bd6Eb8b023aD96dC6dC63C41dB8b0",
    //   "0x90133B9fE1E2a72F8e3F8D19656c93644c9A6B55",
    //   "Chromadin Drop",
    //   "CHROD"
    // );
    // const chromadinEscrow = await ChromadinEscrow.deploy(
    //   "0xe36805ff8b9Bd6Eb8b023aD96dC6dC63C41dB8b0",
    //   "0x0EcF9f53a916b9d8BcDED673F88B474FE3b2beAA",
    //   "0x90133B9fE1E2a72F8e3F8D19656c93644c9A6B55",
    //   "0x7129a0827c925b69Bd99EC82268685a3091F8840",
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

    await run(`verify:verify`, {
      address: "0x7129a0827c925b69Bd99EC82268685a3091F8840",
      constructorArguments: ["0x90133B9fE1E2a72F8e3F8D19656c93644c9A6B55"],
    });
    await run(`verify:verify`, {
      address: "0xe36805ff8b9Bd6Eb8b023aD96dC6dC63C41dB8b0",
      constructorArguments: [
        "0x7129a0827c925b69Bd99EC82268685a3091F8840",
        "0x90133B9fE1E2a72F8e3F8D19656c93644c9A6B55",
        "0x5A2099eD5A12C74C9B7A5d5Fac17252c2B29560F",
        "Chromadin Collection",
        "CHROC",
      ],
    });
    // await run(`verify:verify`, {
    //   address: "0xCA2e188436454C06b296e7ab0588920aE9500b9f",
    //   constructorArguments: [
    //     "0x1ACeCeDBC54d65D72338A2c0b55b479aF5B45870",
    //     "0xa376FdE1e0033a2624d95E3D4345aAd32d5fE1cD",
    //     "0xD80Fcc6856A4A88C1FD031e191CD4A014a0536Dc",
    //     "Chromadin Marketplace",
    //     "CHROM",
    //   ],
    // });
    await run(`verify:verify`, {
      address: "0x0EcF9f53a916b9d8BcDED673F88B474FE3b2beAA",
      constructorArguments: [
        "0xe36805ff8b9Bd6Eb8b023aD96dC6dC63C41dB8b0",
        "0x90133B9fE1E2a72F8e3F8D19656c93644c9A6B55",
        "0x7129a0827c925b69Bd99EC82268685a3091F8840",
        "Chromadin Marketplace",
        "CHROM",
      ],
    });
    await run(`verify:verify`, {
      address: "0xefe47d8107A60925F01701c64B8d44aD22B83332",
      constructorArguments: [
        "0xe36805ff8b9Bd6Eb8b023aD96dC6dC63C41dB8b0",
        "0x90133B9fE1E2a72F8e3F8D19656c93644c9A6B55",
        "Chromadin Drop",
        "CHROD",
      ],
    });
    await run(`verify:verify`, {
      address: "0x6735f3a51DB6619D5904f616171b559e49125ee2",
      constructorArguments: [
        "0xe36805ff8b9Bd6Eb8b023aD96dC6dC63C41dB8b0",
        "0x0EcF9f53a916b9d8BcDED673F88B474FE3b2beAA",
        "0x90133B9fE1E2a72F8e3F8D19656c93644c9A6B55",
        "0x7129a0827c925b69Bd99EC82268685a3091F8840",
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
