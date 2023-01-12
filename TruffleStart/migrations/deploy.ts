/** @format */
type Network = "development" | "goereli" | "mainnet";

module.exports = (artifacts: Truffle.Artifacts, web3: Web3) => {
  return async (
    deployer: Truffle.Deployer,
    network: Network,
  ) => {
    console.log(`Deployment entered`);
    const ConvertLib = artifacts.require("ConvertLib");
    const MetaCoin = artifacts.require("MetaCoin");

    deployer.deploy(ConvertLib);
    deployer.link(ConvertLib, MetaCoin);
    deployer.deploy(MetaCoin);

    const metaCoin = await MetaCoin.deployed();
    console.log(
      `Metacoin deployed at ${metaCoin.address} in network: ${network}.`
    );
  };
};
