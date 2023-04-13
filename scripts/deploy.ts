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
    const WAIT_BLOCK_CONFIRMATIONS = 20;
    // accessControl.deployTransaction.wait(WAIT_BLOCK_CONFIRMATIONS);
    // theDialWhitelist.deployTransaction.wait(WAIT_BLOCK_CONFIRMATIONS);
    // console.log(`Whitelist Contract deployed at\n${theDialWhitelist.address}`);
    // console.log(
    //   `Access Control Contract deployed at\n${accessControl.address}`
    // );
    // const ChromadinEscrow = await ethers.getContractFactory("ChromadinEscrow");
    // const ChromadinCollection = await ethers.getContractFactory(
    //   "ChromadinCollection"
    // );
    // const ChromadinNFT = await ethers.getContractFactory("ChromadinNFT");
    // const ChromadinPayment = await ethers.getContractFactory(
    //   "ChromadinPayment"
    // );
    // const ChromadinMarketplace = await ethers.getContractFactory(
    //   "ChromadinMarketplace"
    // );
    // const ChromadinDrop = await ethers.getContractFactory("ChromadinDrop");
    // const chromadinPayment = await ChromadinPayment.deploy(
    //   "0x50Aa3895a35087d7cfa81fb347875849083225AE"
    // );
    // const chromadinNFT = await ChromadinNFT.deploy(
    //   "0x50Aa3895a35087d7cfa81fb347875849083225AE"
    // );
    // const chromadinCollection = await ChromadinCollection.deploy(
    //   "0x5b5777c24D8513B8cc3CF5f9471C3A6D5Cb83CAd",
    //   "0x50Aa3895a35087d7cfa81fb347875849083225AE",
    //   "0x147c8f1b98efeA8d91D501172aceaDA074eb4E44",
    //   "Chromadin Collection",
    //   "CHROC"
    // );
    // const chromadinMarketplace = await ChromadinMarketplace.deploy(
    //   chromadinCollection.address,
    //   "0x50Aa3895a35087d7cfa81fb347875849083225AE",
    //   "0x5b5777c24D8513B8cc3CF5f9471C3A6D5Cb83CAd",
    //   "Chromadin Marketplace",
    //   "CHROM"
    // );
    // const chromadinDrop = await ChromadinDrop.deploy(
    //   "0x7879BF38C556a48CBe75E69056caF8517Bd6826F",
    //   "0x50Aa3895a35087d7cfa81fb347875849083225AE",
    //   "Chromadin Drop",
    //   "CHROD"
    // );
    // const chromadinEscrow = await ChromadinEscrow.deploy(
    //   "0x7879BF38C556a48CBe75E69056caF8517Bd6826F",
    //   "0x9767b700F2Fb86722F084c3af9A46E919FAdDC4f",
    //   "0x50Aa3895a35087d7cfa81fb347875849083225AE",
    //   "0x5b5777c24D8513B8cc3CF5f9471C3A6D5Cb83CAd",
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
    // await run(`verify:verify`, {
    //   address: "0x50Aa3895a35087d7cfa81fb347875849083225AE",
    //   constructorArguments: ["AccessControl", "CHROA"],
    // });
    // await run(`verify:verify`, {
    //   address: "0x464E4c5B9d8573986132c758C900f374e9165D2C",
    //   constructorArguments: ["0x50Aa3895a35087d7cfa81fb347875849083225AE"],
    // });
    // await run(`verify:verify`, {
    //   address: "0x5b5777c24D8513B8cc3CF5f9471C3A6D5Cb83CAd",
    //   constructorArguments: ["0x50Aa3895a35087d7cfa81fb347875849083225AE"],
    // });
    // await run(`verify:verify`, {
    //   address: "0x147c8f1b98efeA8d91D501172aceaDA074eb4E44",
    //   constructorArguments: ["0x50Aa3895a35087d7cfa81fb347875849083225AE"],
    // });
    // await run(`verify:verify`, {
    //   address: "0x7879BF38C556a48CBe75E69056caF8517Bd6826F",
    //   constructorArguments: [
    //     "0x5b5777c24D8513B8cc3CF5f9471C3A6D5Cb83CAd",
    //     "0x50Aa3895a35087d7cfa81fb347875849083225AE",
    //     "0x147c8f1b98efeA8d91D501172aceaDA074eb4E44",
    //     "Chromadin Collection",
    //     "CHROC",
    //   ],
    // });
    // await run(`verify:verify`, {
    //   address: "0x9767b700F2Fb86722F084c3af9A46E919FAdDC4f",
    //   constructorArguments: [
    //     "0x7879BF38C556a48CBe75E69056caF8517Bd6826F",
    //     "0x50Aa3895a35087d7cfa81fb347875849083225AE",
    //     "0x5b5777c24D8513B8cc3CF5f9471C3A6D5Cb83CAd",
    //     "Chromadin Marketplace",
    //     "CHROM",
    //   ],
    // });
    await run(`verify:verify`, {
      address: "0x1DDccd7A89c98c963d218269Ea954813dB1c8C35",
      constructorArguments: [
        "0x7879BF38C556a48CBe75E69056caF8517Bd6826F",
        "0x50Aa3895a35087d7cfa81fb347875849083225AE",
        "Chromadin Drop",
        "CHROD",
      ],
    });
    await run(`verify:verify`, {
      address: "0xb9025d4b2A9581080205300bBc363480A50cCfd2",
      constructorArguments: [
        "0x7879BF38C556a48CBe75E69056caF8517Bd6826F",
        "0x9767b700F2Fb86722F084c3af9A46E919FAdDC4f",
        "0x50Aa3895a35087d7cfa81fb347875849083225AE",
        "0x5b5777c24D8513B8cc3CF5f9471C3A6D5Cb83CAd",
        "Chromadin Escrow",
        "CHROE",
      ],
    });
  } catch (err: any) {
    console.error(err.message);
  }
};

main();
