import { CryptoLotteryContract } from "../types/truffle-contracts";

const CryptoLottery = artifacts.require('CryptoLottery');

console.log('testing');
contract("CryptoLottery", async (accounts: string[]) => {
    let lottery: any;
    before("", async () => {
        lottery = await CryptoLottery.deployed()
    })

    it("The account deploying should be manager", async () => {
        let manager = await lottery.manager();
        assert.equal(manager, accounts[0]);
    });

    it("No account except manager should set the pot", async () => {
        try {
            await lottery.setEntry({ from: accounts[1], value: "10" })
            assert(false)
        } catch {
            assert(true)
        }
    });

    it("Noone should be able to call Pay winner", async () => {
        try {
            await lottery.drawWinner({ from: accounts[1] });
            assert(false);
        }
        catch {
            assert(true);
        }
    });

    it("Noone should be able to call Draw winner", async () => {
        try {
            await lottery.payWinner(accounts[1], { from: accounts[1] });
            assert(false);
        }
        catch {
            assert(true);
        }
    });

    it("Users cannot join until Fee is set", async () => {
        try {
            await lottery.newEntry({ from: accounts[1], value: "2" });
            assert(false);
        }
        catch {
            assert(true);
        }
    });

    it("Manager can set entry and User can enter", async () => {
        try {
            await lottery.setEntry({ from: accounts[0], value: "1000000000000000" })
            await lottery.newEntry({ from: accounts[1], value: "5000000000000000" });
            assert(true);
        }
        catch {
            assert(false);
        }


    });

});