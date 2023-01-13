type Network = "mainnet"|"goereli"|"development"
module.exports = function (artifacts: Truffle.Artifacts, web3: Web3) {
  return async (
    deployer: Truffle.Deployer,
    network: Network
  ) => {
    const CryptoLottery = artifacts.require("CryptoLottery");
    deployer.deploy(CryptoLottery);
  };
};