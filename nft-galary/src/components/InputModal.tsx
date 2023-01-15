import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import  { setAccount } from "store/slices/accountSlice";
import { setCollection } from "store/slices/collectionSlice";

import { MdClose } from "react-icons/md"
import { storeType } from "store/store";

interface inputType{
  fetchA: Function
  fetchC: Function
}

const InputModal = (props: inputType) => {
  const { fetchA, fetchC } = props;
  const [open, setOpen] = useState(false);
  const [acct, setAcct] = useState('');
  const [coll, setColl] = useState('');
  const dispatch = useDispatch();
  const { account } = useSelector((state: storeType) => state )

  const modalHandler = () => {
    if (open) {
      setOpen(false)
    } else {
      setOpen(true)
    }
  }
  const clearStore = async () => {
    await dispatch(setAccount(""));
    await dispatch(setCollection(""));
  }
  const storeHandler = async (op: string) => {
    console.log("top");
    // await clearStore();
    console.log("switch");
    switch(op){
      case "account":
        let x = document.getElementById("account")! as HTMLInputElement;
        console.log("top switch");
        dispatch(setAccount(x.value));
        await fetchA();
      console.log("mid switch");
        setColl("");
        break;
      case "collection":
        let y = document.getElementById("collection")! as HTMLInputElement;
        dispatch(setCollection(y.value));
        await fetchC();
        setAcct("");
        break;
      case "both":
        let bx = document.getElementById("account")! as HTMLInputElement;
        dispatch(setAccount(bx.value));
        let by = document.getElementById("collection")! as HTMLInputElement;
        dispatch(setCollection(by.value));
        await fetchA();
        break;
      default:
        storeHandler(op);
    }
    setOpen(false);
  }

  return (
    <>
      {open ?
        <div className="modal">
          <button onClick={modalHandler} className="close">
            <MdClose />
          </button>
          <p>Select the Gallery you want to see by checking out an Ethereum collection or a Wallet's NFTs</p>
          <div>
            {acct}
            <input id="account"
              type="text" value={acct}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAcct(e.currentTarget.value)}
              placeholder="Add a Wallet Address"
            />
            <button onClick={() => storeHandler("account")}> Search Account </button>
          </div>
          <div>
            {coll}
            <input id="collection" type="text"
              value={coll}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setColl(e.currentTarget.value)} placeholder="Add a Collection Address" />
            <button onClick={() => storeHandler("collection")}> Search Collection </button>
          </div>
          <button onClick={() => storeHandler("both")}> Search Both </button>
        </div> :
        <div className="modal">
          { account.value == "0x2219772388c4CCcCB8E5D71197965cee1B124622" ? <p> Hope you enjoy my collection!</p> : ""}
          <p>Click below  if you would like to see a different account of specific collection on Ethereum </p>
          <button onClick={modalHandler} > Search </button>
        </div>}
    </>
  )
};
export default InputModal;