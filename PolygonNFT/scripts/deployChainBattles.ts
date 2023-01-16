import { ethers } from "hardhat";

const main = async () => {
    const chainBattles = await ethers.getContractFactory('ChainBattles');

    const contract = await chainBattles.deploy();
    await contract.deployed();

    console.log("Chain Battle contract deployed at: " + contract.address);
}

main()
    .then(() =>
        console.log("Successful deployment")
    )
    .catch((err) =>
        console.log("Chain Battles deployment halted because: " + err)
    )