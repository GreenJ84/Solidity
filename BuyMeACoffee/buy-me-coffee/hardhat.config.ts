/** @format */

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-chai-matchers";
import "@nomicfoundation/hardhat-toolbox";
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

const GOERLI_URL = process.env.GOERLI_URL;

if (!process.env.PRIVATE_KEY) {
  throw new Error("PRivate Key not given");
}
const PRIVATE_KEY: string = process.env.PRIVATE_KEY;

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: GOERLI_URL,
      accounts: [PRIVATE_KEY]
    }
  }
};

export default config;
