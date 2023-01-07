import abi from '../utils/BuyMeACoffee.json';
import { BigNumber, Contract, ethers } from "ethers";
import Head from 'next/head'
import React, { useEffect, useState } from "react";

const css = require('../styles/index.module.css')

declare let window: any

interface Memo{
  from: string
  timestamp: Date
  name: string
  message: string
}

export default function Home() {
  // Contract Address & ABI
  //! Deploy specific!! = Different for every person on every redeploy
  const contractAddress = "0xDBa03676a2fBb6711CB652beF5B7416A53c1421D";
  const contractABI = abi.abi;

  // Component state
  const [currentAccount, setCurrentAccount] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [memos, setMemos] = useState(Array<Memo>);

  // Name Input Handler 
  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }

  // Message Input Handler 
  const onMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  }

  // Wallet connection logic
  const isWalletConnected = async () => {
    try {
      const { ethereum } = window;

      const accounts = await ethereum.request({method: 'eth_accounts'})
      console.log("accounts: ", accounts);

      if (accounts.length > 0) {
        const account = accounts[0];
        console.log("wallet is connected! " + account);
      } else {
        console.log("make sure MetaMask is connected");
      }
    } catch (error) {
      console.log("error: Cannot connect to Metamask", error);
    }
  }

  const connectWallet = async () => {
    try {
      const {ethereum} = window;

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

  // Function to actually buy coffee and send transaction
  const buyCoffee = async () => {
    try {
      const {ethereum} = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum, "any");
        const signer = provider.getSigner();
        const buyMeACoffee = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        console.log("buying coffee..")
        const coffeeTxn = await buyMeACoffee.buyCoffee(
          name ? name : "anon",
          message ? message : "Enjoy your coffee!",
          {value: ethers.utils.parseEther("0.001")}
        );

        await coffeeTxn.wait();
        console.log("Block mined ", coffeeTxn.hash);

        console.log("Coffee purchased!");

        // Clear the form fields.
        setName("");
        setMessage("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to fetch all memos stored on-chain.
  const getMemos = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const buyMeACoffee = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        
        console.log("fetching memos from the blockchain..");
        const memos: Array<Memo> = await buyMeACoffee.getMemos();

        console.log("fetched!");
        setMemos(memos);
      } else {
        console.log("Metamask is not connected");
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let buyMeACoffee: Contract;
    isWalletConnected();
    getMemos();

    // New Memo event handler for updating
    const onNewMemo = (from: string, timestamp: number, name: string, message: string) => {
      console.log("Memo received: ", from, timestamp, name, message);
      setMemos((prevState) => [
        ...prevState,
        {
          from: from,
          timestamp: new Date(timestamp * 1000),
          message,
          name
        }
      ]);
    };

    const {ethereum} = window;

    // Listen for new memo events.
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum, "any");
      const signer = provider.getSigner();
      buyMeACoffee = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      buyMeACoffee.on("NewMemo", onNewMemo);
    }

    return () => {
      if (buyMeACoffee) {
        buyMeACoffee.off("NewMemo", onNewMemo);
      }
    }
  }, []);


  return (
    <>
      <Head>
        <title>Buy Me Coffee</title>
        <meta name="description" content="Buy Me a Coffee tipping app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={css.main}>
        <h1 className={css.title}>
          Buy JesseG a Coffee!
        </h1>
        
        {currentAccount ? (
            <form className={ css.form }>
              <div className={ css.formgroup }>
                <label>
                  Name
                </label>
                <br/>
                
                <input
                  id="name"
                  type="text"
                  placeholder="anon"
                  onChange={onNameChange}
                  />
              </div>
              <br/>
              <div className={ css.formgroup }>
                <label>
                  Send a message w/ tip
                </label>
                <br/>

                <textarea
                  rows={3}
                  placeholder="Enjoy your coffee!"
                  id="message"
                  onChange={onMessageChange}
                  required
                >
                </textarea>
              </div>
                <button
                  type="button"
                  onClick={buyCoffee}
                >
                  Send 1 Coffee for 0.001ETH
                </button>
            </form>
        ) : (
          <button onClick={connectWallet}> Connect your wallet </button>
        )}
      </main>

      {currentAccount && (<h1>Memos received</h1>)}
      {currentAccount && (memos.map((memo, idx) => {
        return (
          <div key={idx} className={ css.memo }>
            <h3 className={ css.memoTitle }>"{memo.message}"</h3>
            <p>From: {memo.name} at {memo.timestamp.toString()}</p>
          </div>
        )
      }))}

      <footer >
        <a
          href="https://alchemy.com/?a=roadtoweb3weektwo"
          target="_blank"
          rel="noopener noreferrer"
        >
          Created by JesseG84 for Alchemy's Road to Web3 lesson two!
        </a>
      </footer>
    </>
  )
}
