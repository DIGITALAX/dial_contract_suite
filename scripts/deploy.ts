import { ethers, run } from "hardhat";

const main = async () => {
  try {
    const AccessControl = await ethers.getContractFactory("AccessControl");
    const TheDialWhitelist = await ethers.getContractFactory(
      "TheDialWhitelist"
    );

    const accessControl = await AccessControl.deploy("AccessControl", "CHROA");
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

    const ChromadinEscrow = await ethers.getContractFactory("ChromadinEscrow");
    const ChromadinCollection = await ethers.getContractFactory(
      "ChromadinCollection"
    );
    const ChromadinNFT = await ethers.getContractFactory("ChromadinNFT");
    const ChromadinPayment = await ethers.getContractFactory(
      "ChromadinPayment"
    );
    const ChromadinMarketplace = await ethers.getContractFactory(
      "ChromadinMarketplace"
    );
    const ChromadinDrop = await ethers.getContractFactory("ChromadinDrop");

    const chromadinPayment = await ChromadinPayment.deploy(
      accessControl.address
    );
    const chromadinNFT = await ChromadinNFT.deploy(accessControl.address);
    const chromadinCollection = await ChromadinCollection.deploy(
      chromadinNFT.address,
      accessControl.address,
      chromadinPayment.address,
      "Chromadin Collection",
      "CHROC"
    );
    const chromadinMarketplace = await ChromadinMarketplace.deploy(
      chromadinCollection.address,
      accessControl.address,
      chromadinNFT.address,
      "Chromadin Marketplace",
      "CHROM"
    );
    const chromadinDrop = await ChromadinDrop.deploy(
      chromadinCollection.address,
      accessControl.address,
      "Chromadin Drop",
      "CHROD"
    );
    const chromadinEscrow = await ChromadinEscrow.deploy(
      chromadinCollection.address,
      chromadinMarketplace.address,
      accessControl.address,
      chromadinNFT.address,
      "Chromadin Escrow",
      "CHROE"
    );

    chromadinPayment.deployTransaction.wait(WAIT_BLOCK_CONFIRMATIONS);
    chromadinNFT.deployTransaction.wait(WAIT_BLOCK_CONFIRMATIONS);
    chromadinCollection.deployTransaction.wait(WAIT_BLOCK_CONFIRMATIONS);
    chromadinMarketplace.deployTransaction.wait(WAIT_BLOCK_CONFIRMATIONS);
    chromadinDrop.deployTransaction.wait(WAIT_BLOCK_CONFIRMATIONS);
    chromadinEscrow.deployTransaction.wait(WAIT_BLOCK_CONFIRMATIONS);

    console.log(
      `Chromadin Payment Contract deployed at\n${chromadinPayment.address}`
    );
    console.log(`Chromadin NFT Contract deployed at\n${chromadinNFT.address}`);
    console.log(
      `Chromadin Collection Contract deployed at\n${chromadinCollection.address}`
    );
    console.log(
      `Chromadin Marketplace Contract deployed at\n${chromadinMarketplace.address}`
    );
    console.log(
      `Chromadin Drop Contract deployed at\n${chromadinDrop.address}`
    );
    console.log(
      `Chromadin Escrow Contract deployed at\n${chromadinEscrow.address}`
    );

    await run(`verify:verify`, {
      address: accessControl.address,
      constructorArguments: ["AccessControl", "CHROA"],
    });
    await run(`verify:verify`, {
      address: theDialWhitelist.address,
      constructorArguments: [accessControl.address],
    });
    await run(`verify:verify`, {
      address: chromadinPayment.address,
      constructorArguments: [accessControl.address],
    });
    await run(`verify:verify`, {
      address: chromadinNFT.address,
      constructorArguments: [accessControl.address],
    });
    await run(`verify:verify`, {
      address: chromadinCollection.address,
      constructorArguments: [
        chromadinNFT.address,
        accessControl.address,
        chromadinPayment.address,
        "Chromadin Collection",
        "CHROC",
      ],
    });
    await run(`verify:verify`, {
      address: chromadinMarketplace.address,
      constructorArguments: [
        chromadinCollection.address,
        accessControl.address,
        chromadinNFT.address,
        "Chromadin Marketplace",
        "CHROM",
      ],
    });
    await run(`verify:verify`, {
      address: chromadinDrop.address,
      constructorArguments: [
        chromadinCollection.address,
        accessControl.address,
        "Chromadin Drop",
        "CHROD",
      ],
    });
    await run(`verify:verify`, {
      address: chromadinEscrow.address,
      constructorArguments: [
        chromadinCollection.address,
        chromadinMarketplace.address,
        accessControl.address,
        chromadinNFT.address,
        "Chromadin Escrow",
        "CHROE",
      ],
    });
  } catch (err: any) {
    console.error(err.message);
  }
};

main();
