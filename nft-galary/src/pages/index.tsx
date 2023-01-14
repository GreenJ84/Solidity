/** @format */

import { GetServerSideProps } from "next";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { storeType } from "store/store";

import GalaryBody from "../components/GalaryBody";
import InputModal from "../components/InputModal";

export interface nftData {
  nfts: Object[];
  totalCount?: number;
}


export default function Home(props: { apikey: string }) {
  const api_key = props.apikey
  const [nfts, setNfts] = useState({});
  const { account, collection } = useSelector((state: storeType) => state);

  console.log(api_key);
  
  const fetchNFTs = async () => {
    let _nfts;
    console.log("Fetching NFTs");
    console.log(api_key, account.value, collection.value)
    let fetchURL;
    const baseURL = `https://eth-mainnet.g.alchemy.com/nft/v2/${api_key}/getNFTs/`;
    const requestOptions = {
      method: 'GET'
    }
    
    if (!collection.value) {
      fetchURL = `${baseURL}?owner=${account.value}`
    } else {
      fetchURL = `${baseURL}?owner=${account.value}&contractAddresses%5B%5D=${collection.value}`
    }
    console.log(fetchURL);
    _nfts = await fetch(fetchURL, requestOptions)
    .then(data => data.json())
    
    if (_nfts) {
      console.log(_nfts)
      setNfts(_nfts)
    }
  }
  const fetchCollection = async () => {};

  return (
    <>
      <InputModal fetchA={() => fetchNFTs()} fetchC={() => fetchCollection()} />
      <GalaryBody nfts={nfts} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const api_key = process.env.REACT_APP_API_KEY;
  return {
    props: {
      apikey: api_key
    }
  }
}
