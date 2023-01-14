import React, { useState } from "react"
import { useDispatch } from "react-redux";
import { setAccount } from "store/slices/accountSlice";
import { setCollection } from "store/slices/collectionSlice";

const InputModal = () => {
  const [open, setOpen] = useState(true)
  const dispatch = useDispatch();

  const accountHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setAccount(e.target.value))
  }

  const collectionHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCollection(e.target.value))
  }

  return (
    <>
      {open ?
        <div className="modal">
          <p>Select the Galary you want to see by checking out an Ethereum collection or a Wallet's NFTs</p>
          <div>
            <input type="text" onChange={accountHandler} placeholder="Add a Wallet Address" />
            <button> Search Account </button>
          </div>
          <div>
            <input onChange={collectionHandler} type="text" placeholder="Add a Collection Address" />
            <button> Search Collection </button>
          </div>
          <button> Search Both </button>
        </div> :
        <div className="modal">
          <p> Hope you enjoy my collection! Click below  if you would like to see a different account of specific collection on Ethereum </p>
          <button> Search </button>
        </div>}
    </>
  )
};
export default InputModal;