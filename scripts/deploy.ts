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
    // const WAIT_BLOCK_CONFIRMATIONS = 20;
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
    //   "0xC79826DBC66A5945Fa29B908ffFC6248454b0804"
    // );
    // const chromadinNFT = await ChromadinNFT.deploy(
    //   "0xC79826DBC66A5945Fa29B908ffFC6248454b0804"
    // );
    // const chromadinCollection = await ChromadinCollection.deploy(
    //   "0xa0B2f6E23745aa254867A93Aad56DdCdbEFB3aa8",
    //   "0xC79826DBC66A5945Fa29B908ffFC6248454b0804",
    //   "0xa2079eF3Bb10294780B01faCA6F38DFe55AbbDDf",
    //   "Chromadin Collection",
    //   "CHROC"
    // );
    // const chromadinMarketplace = await ChromadinMarketplace.deploy(
    //   chromadinCollection.address,
    //   "0xC79826DBC66A5945Fa29B908ffFC6248454b0804",
    //   "0xa0B2f6E23745aa254867A93Aad56DdCdbEFB3aa8",
    //   "Chromadin Marketplace",
    //   "CHROM"
    // );
    // const chromadinDrop = await ChromadinDrop.deploy(
    //   "0xB5352f0BD934f240129fF3E5565EA442A7E7af2f",
    //   "0xC79826DBC66A5945Fa29B908ffFC6248454b0804",
    //   "Chromadin Drop",
    //   "CHROD"
    // );
    // const chromadinEscrow = await ChromadinEscrow.deploy(
    //   "0xB5352f0BD934f240129fF3E5565EA442A7E7af2f",
    //   "0x411ddf465dc59914E8ee30af64EA73510a62d247",
    //   "0xC79826DBC66A5945Fa29B908ffFC6248454b0804",
    //   "0xa0B2f6E23745aa254867A93Aad56DdCdbEFB3aa8",
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
    //   address: "0xC79826DBC66A5945Fa29B908ffFC6248454b0804",
    //   constructorArguments: ["AccessControl", "CHROA"],
    // });
    // await run(`verify:verify`, {
    //   address: "0x666cb31B20657F8b1F72Bc69db195274f64719aC",
    //   constructorArguments: ["0xC79826DBC66A5945Fa29B908ffFC6248454b0804"],
    // });
    // await run(`verify:verify`, {
    //   address: "0xa2079eF3Bb10294780B01faCA6F38DFe55AbbDDf",
    //   constructorArguments: ["0xC79826DBC66A5945Fa29B908ffFC6248454b0804"],
    // });
    // await run(`verify:verify`, {
    //   address: "0xa0B2f6E23745aa254867A93Aad56DdCdbEFB3aa8",
    //   constructorArguments: ["0xC79826DBC66A5945Fa29B908ffFC6248454b0804"],
    // });
    // await run(`verify:verify`, {
    //   address: "0xB5352f0BD934f240129fF3E5565EA442A7E7af2f",
    //   constructorArguments: [
    //     "0xa0B2f6E23745aa254867A93Aad56DdCdbEFB3aa8",
    //     "0xC79826DBC66A5945Fa29B908ffFC6248454b0804",
    //     "0xa2079eF3Bb10294780B01faCA6F38DFe55AbbDDf",
    //     "Chromadin Collection",
    //     "CHROC",
    //   ],
    // });
    // await run(`verify:verify`, {
    //   address: "0x411ddf465dc59914E8ee30af64EA73510a62d247",
    //   constructorArguments: [
    //     "0xB5352f0BD934f240129fF3E5565EA442A7E7af2f",
    //     "0xC79826DBC66A5945Fa29B908ffFC6248454b0804",
    //     "0xa0B2f6E23745aa254867A93Aad56DdCdbEFB3aa8",
    //     "Chromadin Marketplace",
    //     "CHROM",
    //   ],
    // });
    // await run(`verify:verify`, {
    //   address: "0x0ba2190C22fB5D97FA8Ade42fF3eAA42E841637b",
    //   constructorArguments: [
    //     "0xB5352f0BD934f240129fF3E5565EA442A7E7af2f",
    //     "0xC79826DBC66A5945Fa29B908ffFC6248454b0804",
    //     "Chromadin Drop",
    //     "CHROD",
    //   ],
    // });
    // await run(`verify:verify`, {
    //   address: "0x34BEc7403bCFfDcc0AaAcf6C16737Cb98CfeDC30",
    //   constructorArguments: [
    //     "0xB5352f0BD934f240129fF3E5565EA442A7E7af2f",
    //     "0x411ddf465dc59914E8ee30af64EA73510a62d247",
    //     "0xC79826DBC66A5945Fa29B908ffFC6248454b0804",
    //     "0xa0B2f6E23745aa254867A93Aad56DdCdbEFB3aa8",
    //     "Chromadin Escrow",
    //     "CHROE",
    //   ],
    // });
  } catch (err: any) {
    console.error(err.message);
  }
};

main();
