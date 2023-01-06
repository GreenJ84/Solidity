/** @format */
import { BigNumber } from "ethers";

const hre = require("hardhat");
require("@nomiclabs/hardhat-waffle");

const getBalance = async (_address: string | BigNumber) => {
  const balanceBig = await hre.waffle.provider.getBalance(_address);

  return hre.ethers.utils.formatEther(balanceBig);
};

const printBalances = async (_addresses: string[] | BigNumber[]) => {
  let idx = 0;
  for (const _address of _addresses) {
    console.log(`Address ${idx} balance:`, await getBalance(_address));
  }
};

interface Memo {
  timestamp: string;
  name: string;
  from: string;
  message: string;
}

const printMemos = async (_memos: Memo[]) => {
  for (const _memo of _memos) {
    const time_stamp = _memo.timestamp;
    const tipper = _memo.name;
    const tipperAddress = _memo.from;
    const message = _memo.message;
    console.log(
      `At ${time_stamp}, ${tipper} (${tipperAddress}) said: "${message}"`
    );
  }
};

const main = async () => {
  // Get example accounts. Owner and test tippers
  const [owner, tipper, tipper2, tipper3] = await hre.ethers.getSigners();

  // Get the contract to deploy & deploy
  const BuyMeACoffee = await hre.ethers.getContractFactory("BuyMeACoffee");
  const buyMeACoffee = await BuyMeACoffee.deploy();

  // Wait for deployment and log it
  await buyMeACoffee.deployed();
  console.log("BuyMeACoffee contract deployed to ", buyMeACoffee.address);

  // Check balances before the coffee purchase
  const addresses = [owner.address, tipper.address, buyMeACoffee.address];
  console.log("== Start ==");
  await printBalances(addresses);

  // Buy the owner a few coffees
  const tip = { value: hre.ethers.utils.parseEther("1") };
  await buyMeACoffee
    .connect(tipper)
    .buyCoffee("Jesse", "Treat yourself!", tip);
  await buyMeACoffee
    .connect(tipper2)
    .buyCoffee("Natalie", "Love your portfolio", tip);
  await buyMeACoffee
    .connect(tipper3)
    .buyCoffee("Kate", "Can't wait to work with you", tip);

  // Check balances after coffee purchase
  console.log("== Coffees Purchase ==");
  await printBalances(addresses);

  // Withdrawl funds
  await buyMeACoffee.connect(owner).withdrawTips();

  // Check balance after withdrawl
  console.log("== Withdraw Tips ==");
  await printBalances(addresses);

  // Read all the memos left for the owner
  console.log("== All Memos ==");
  const memos = await buyMeACoffee.getMemos();
  printMemos(memos);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
