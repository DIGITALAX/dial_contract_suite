require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" });
import "@nomiclabs/hardhat-ethers";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.9",
      },
    ],
  },
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_MUMBAI_KEY}`,
      accounts: [process.env.PRIVATE_KEYS],
    },
    polygon: {
      url: `https://polygon-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_POLYGON_KEY}`,
      accounts: [process.env.PRIVATE_KEYS],
    },
  },
  settings: {
    optimizer: { enabled: true, runs: 200, details: { yul: false } },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};
