import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Contract, ethers } from "ethers";


import abi from '../utils/CryptoLottery.json';

const css = require('../styles/index.module.css')

declare let window: any


export default function Home() {
  const contractAddress: string = "0xD25eD74D6C7Fbc2A093ba0EBf3d2134521951944"
  const contractABI: Object[] = abi.abi

  const [manager, setManager] = useState('')
  const [balance, setBalance] = useState(0)
  const [entryFee, setEntryFee] = useState(0)
  const [participants, setParticipants] = useState(Array<String>)

  const [currentAccount, setCurrentAccount] = useState("");
  const [fee, setFee] = useState(entryFee)


  const entryFeeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFee(parseInt(event.target.value));
  }

  const isWalletConnected = async () => {
    try {
      const { ethereum } = window;

      const accounts = await ethereum.request({ method: 'eth_accounts' })
      console.log("accounts: ", accounts);

      if (accounts.length > 0) {
        const account = accounts[0];
        console.log("wallet is connected! " + account);
      } else {
        console.log("Make sure MetaMask is connected");
      }
    } catch (error) {
      console.log("error: Cannot connect to Metamask", error);
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Please install MetaMask");
      }

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts'
      });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  }


  const onEntryFeeHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum, "any");
        const signer = provider.getSigner();
        const cryptoLottery = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        await cryptoLottery.setEntry(fee)
        const newEF = await cryptoLottery.entryFee()
        setEntryFee(newEF.toNumber())
      }
    } catch (error) {
      console.log(error);
    }
  };

  const newEntry = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum, "any");
        const signer = provider.getSigner();
        const cryptoLottery = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        await cryptoLottery.newEntry({ value: entryFee + 1 })
        setParticipants((prev) => [...prev, currentAccount])

        const balance = await provider.getBalance(contractAddress)
        console.log(balance.toNumber());
        setBalance(balance.toNumber())
      }
    } catch (error) {
      console.log(error);
    }
  };

  const drawWinnerHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum, "any");
        const signer = provider.getSigner();
        const cryptoLottery = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        await cryptoLottery.drawWinner()
        setParticipants([]);
        setFee(0);

        const newEF = await cryptoLottery.entryFee()
        setEntryFee(newEF.toNumber())

        const balance = await provider.getBalance(contractAddress)
        setBalance(balance.toNumber())
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to fetch all memos stored on-chain.
  const getManager = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const cryptoLottery = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        const manager = await cryptoLottery.manager()
        const balance = await provider.getBalance(contractAddress)
        const entryFee = await cryptoLottery.entryFee()

        setManager(manager)
        setBalance(balance.toNumber())
        setEntryFee(entryFee.toNumber())
        setParticipants(Array.from('0'.repeat(Math.round(balance.toNumber()/(entryFee*1.3)))))
      } else {
        console.log("Metamask is not connected");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getBalance = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const balance = await provider.getBalance(contractAddress)
        setBalance(balance.toNumber())
      } else {
        console.log("Metamask is not connected");
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    isWalletConnected();
    getManager();
  }, []);

  useEffect(() => {
    getBalance()
  }, [participants]);


  return (
    <>
      <Head>
        <title>Crypto Lottery</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={ css.main }>

        <h1 className={ css.title }>
          Crypto Lottery
        </h1>
        { currentAccount ?
          <div className={css.connected}>
            {currentAccount.toUpperCase() == manager.toUpperCase() ?
              <div className={css.manager}>
                <h2>Manage contract:</h2>
                {entryFee == 0 ?
                  <form className={ css.form }>
                    <label>
                      Entry Fee:
                    </label>
                    <input
                      id="name"
                      type="number"
                      placeholder="0"
                      onChange={entryFeeHandler}
                    />
                    <button className={ css.button2 } onClick={onEntryFeeHandler}> Set Entry Fee </button>
                  </form>
                : ""}
                {participants.length >= 2 ?
                  <button style={{"display":"flex", "margin": "auto"}} className={ css.button2 } onClick={drawWinnerHandler}> Draw Winner </button>
                : ""}
              </div>

            : ""}
            <h2> Contract Manager address: <em>{manager}</em></h2>


            {entryFee != 0 ? 
              <div className={ css.display }>
                <p>There are currently {participants.length} entries placed for a chance to win {balance} eth</p>
                <br/>
                <p>Want to join? This pots current entry fee is {entryFee} eth</p>
                <br/>
                <button className={css.button1} onClick={newEntry}> New Entry </button>
              </div>
              : <div className={css.display}>
                <p>The next lottery pool has yet to start.</p><br/>
                <p>Wait until the manager starts the entry. </p>
              </div>}

          
          </div>
        : 
          <button style={{ "marginBottom": "15px"}} className={ css.button1 } onClick={connectWallet}> Connect Wallet </button>
        }
        
      </main>
    </>
  )
}
