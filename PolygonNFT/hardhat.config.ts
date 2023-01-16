import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config();

let TESTNET_RPC: string;
let PRIVATE_KEY: string;
let POLYGONSCAN_API_KEY: string;

if (process.env.PRIVATE_KEY && process.env.TESTNET_RPC && process.env.POLYGONSCAN_API_KEY) {
  PRIVATE_KEY = process.env.PRIVATE_KEY;
  TESTNET_RPC = process.env.TESTNET_RPC;
  POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY;
} else {
  throw new Error("PRIVATE_KEY, TESTNET_RPC, and POLYGONSCAN_API_KEY are require! ")
}

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
