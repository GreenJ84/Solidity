import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config();


if (!process.env.PRIVATE_KEY || !process.env.TESTNET_RPC || !process.env.POLYGONSCAN_API_KEY) {
  throw new Error("PRIVATE_KEY, TESTNET_RPC, and POLYGONSCAN_API_KEY are require! ")
}
const TESTNET_RPC: string = process.env.TESTNET_RPC
const PRIVATE_KEY: string = process.env.PRIVATE_KEY;
const POLYGONSCAN_API_KEY: string = process.env.POLYGONSCAN_API_KEY;

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    mumbai: {
      url: TESTNET_RPC,
      accounts: [ PRIVATE_KEY ]
    },
  },
  etherscan: {
    apiKey: POLYGONSCAN_API_KEY
  }
};

export default config;
