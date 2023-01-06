/** @format */

const hre = require("hardhat");

const main = async () => {
  // Get the contract to deploy & deploy
  const BuyMeACoffee = await hre.ethers.getContractFactory("BuyMeACoffee");
  const buyMeACoffee = await BuyMeACoffee.deploy();

  // Wait for deployment and log it
  await buyMeACoffee.deployed();
  console.log("BuyMeACoffee contract deployed to ", buyMeACoffee.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
