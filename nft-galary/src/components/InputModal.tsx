import React, { useState } from "react"
import { useDispatch } from "react-redux";
import { setAccount } from "store/slices/accountSlice";
import { setCollection } from "store/slices/collectionSlice";

import { MdClose } from "react-icons/md"

interface inputType{
  fetchA: Function
  fetchC: Function
}

const InputModal = (props: inputType) => {
  const { fetchA, fetchC } = props;
  const [open, setOpen] = useState(true);
  const [acct, setAcct] = useState('')
  const [coll, setColl] = useState('')
  const dispatch = useDispatch();

  const modalHandler = () => {
    if (open) {
      setOpen(false)
    } else {
      setOpen(true)
    }
  }

  const clearStore = () => {
    dispatch(setAccount(""));
    dispatch(setCollection(""));
  }
  const storeHandler = (op: string) => {
    clearStore();
    if (op == "account" || op == "both") {
      let x = document.getElementById("account")! as HTMLInputElement;
      dispatch(setAccount(x.value));
      fetchA()
    }
    if (op == "collection" || op == "both") {
      let y = document.getElementById("collection")! as HTMLInputElement;
      dispatch(setCollection(y.value));
      if (op == "collection") {
        fetchC();
      }
    }
    setAcct('');
    setColl('');
    setOpen(false);
  }

  return (
    <>
      {open ?
        <div className="modal">

          <p>Select the Galary you want to see by checking out an Ethereum collection or a Wallet's NFTs</p>
          <div>
            <input id="account"
              type="text" value={acct}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAcct(e.currentTarget.value)}
              placeholder="Add a Wallet Address"
            />
            <button onClick={() => storeHandler("account")}> Search Account </button>
          </div>
          <div>
            <input id="collection" type="text"
              value={coll}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setColl(e.currentTarget.value)} placeholder="Add a Collection Address" />
            <button onClick={() => storeHandler("collection")}> Search Collection </button>
          </div>
          <button onClick={() => storeHandler("both")}> Search Both </button>
          <button onClick={modalHandler} className="close">
            <MdClose />
          </button>
        </div> :
        <div className="modal">
          <p> Hope you enjoy my collection! Click below  if you would like to see a different account of specific collection on Ethereum </p>
          <button onClick={modalHandler} > Search </button>
        </div>}
    </>
  )
};
export default InputModal;