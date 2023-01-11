const CryptoLottery = artifacts.require("CryptoLottery");

module.exports = function (deployer) {
  deployer.deploy(CryptoLottery);
  };