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
    // const test = await ethers.getContractFactory("TestToken");
    // const testToken = await test.deploy();
    // const WAIT_BLOCK_CONFIRMATIONS = 20;
    // accessControl.deployTransaction.wait(WAIT_BLOCK_CONFIRMATIONS);
    // theDialWhitelist.deployTransaction.wait(WAIT_BLOCK_CONFIRMATIONS);
    // testToken.deployTransaction.wait(WAIT_BLOCK_CONFIRMATIONS);
    // console.log(`Test Token Contract deployed at\n${testToken.address}`);
    // console.log(`Whitelist Contract deployed at\n${theDialWhitelist.address}`);
    // console.log(
    //   `Access Control Contract deployed at\n${accessControl.address}`
    // );
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
    //   "0x90133B9fE1E2a72F8e3F8D19656c93644c9A6B55"
    // );
    // const chromadinCollection = await ChromadinCollection.deploy(
    //   chromadinNFT.address,
    //   "0x90133B9fE1E2a72F8e3F8D19656c93644c9A6B55",
    //   "0xA75fcf895b35EE1871E088b8a737A0Fb7245bA62",
    //   "Chromadin Collection",
    //   "CHROC"
    // );
    // const chromadinMarketplace = await ChromadinMarketplace.deploy(
    //   "0x835eE8bb8be27f0749B3e2EB9DD7D6a663aa7079",
    //   "0x90133B9fE1E2a72F8e3F8D19656c93644c9A6B55",
    //   "0xF66259f32347a23F36256393b448071eD783F873",
    //   "Chromadin Marketplace",
    //   "CHROM"
    // );
    // const chromadinDrop = await ChromadinDrop.deploy(
    //   "0x835eE8bb8be27f0749B3e2EB9DD7D6a663aa7079",
    //   "0x90133B9fE1E2a72F8e3F8D19656c93644c9A6B55",
    //   "Chromadin Drop",
    //   "CHROD"
    // );
    // const chromadinEscrow = await ChromadinEscrow.deploy(
    //   "0x835eE8bb8be27f0749B3e2EB9DD7D6a663aa7079",
    //   "0xA25A094c4Dab3c8985d2B2e5BfcD221CCd81f809",
    //   "0x90133B9fE1E2a72F8e3F8D19656c93644c9A6B55",
    //   "0xF66259f32347a23F36256393b448071eD783F873",
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
      await run(`verify:verify`, {
      address: "0x6199A505ec1707695Ce49b59A07A147f2d50f22D",
      contract: "contracts/TestToken.sol:TestToken"
    });
    // await run(`verify:verify`, {
    //   address: "0x90133B9fE1E2a72F8e3F8D19656c93644c9A6B55",
    //   constructorArguments: ["AccessControl", "CHROA"],
    // });
    // await run(`verify:verify`, {
    //   address: "0x464E4c5B9d8573986132c758C900f374e9165D2C",
    //   constructorArguments: ["0x50Aa3895a35087d7cfa81fb347875849083225AE"],
    // });
    // await run(`verify:verify`, {
    //   address: "0xA75fcf895b35EE1871E088b8a737A0Fb7245bA62",
    //   constructorArguments: ["0x90133B9fE1E2a72F8e3F8D19656c93644c9A6B55"],
    // });
    // await run(`verify:verify`, {
    //   address: "0xF66259f32347a23F36256393b448071eD783F873",
    //   constructorArguments: ["0x90133B9fE1E2a72F8e3F8D19656c93644c9A6B55"],
    // });
    // await run(`verify:verify`, {
    //   address: "0x835eE8bb8be27f0749B3e2EB9DD7D6a663aa7079",
    //   constructorArguments: [
    //     "0xF66259f32347a23F36256393b448071eD783F873",
    //     "0x90133B9fE1E2a72F8e3F8D19656c93644c9A6B55",
    //     "0xA75fcf895b35EE1871E088b8a737A0Fb7245bA62",
    //     "Chromadin Collection",
    //     "CHROC",
    //   ],
    // });
    // await run(`verify:verify`, {
    //   address: "0xA25A094c4Dab3c8985d2B2e5BfcD221CCd81f809",
    //   constructorArguments: [
    //     "0x835eE8bb8be27f0749B3e2EB9DD7D6a663aa7079",
    //     "0x90133B9fE1E2a72F8e3F8D19656c93644c9A6B55",
    //     "0xF66259f32347a23F36256393b448071eD783F873",
    //     "Chromadin Marketplace",
    //     "CHROM",
    //   ],
    // });
    // await run(`verify:verify`, {
    //   address: "0x1669673e7080ef47e7d5c781b5da99eb2D46F190",
    //   constructorArguments: [
    //     "0x835eE8bb8be27f0749B3e2EB9DD7D6a663aa7079",
    //     "0x90133B9fE1E2a72F8e3F8D19656c93644c9A6B55",
    //     "Chromadin Drop",
    //     "CHROD",
    //   ],
    // });
    // await run(`verify:verify`, {
    //   address: "0x58d242c41518242FCb622EEC12371E7f9E507FC6",
    //   constructorArguments: [
    //     "0x835eE8bb8be27f0749B3e2EB9DD7D6a663aa7079",
    //     "0xA25A094c4Dab3c8985d2B2e5BfcD221CCd81f809",
    //     "0x90133B9fE1E2a72F8e3F8D19656c93644c9A6B55",
    //     "0xF66259f32347a23F36256393b448071eD783F873",
    //     "Chromadin Escrow",
    //     "CHROE",
    //   ],
    // });
  } catch (err: any) {
    console.error(err.message);
  }
};

main();
