/** @format */

import InputModal from "@/components/InputModal";
import { GetServerSideProps } from "next";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { storeType } from "store/store";

import GalleryBody from "../components/GalleryBody";

export interface nftsType{
  title: string
  description: string
  media: [
    {
      gateway: string
    }
  ]
  id: {
    tokenId: string
  }
  contract: {
    address: string
  }
}


export default function Home(props: { apikey: string, nfts: Array<nftsType> }) {
  const api_key = props.apikey
  const [nfts, setNfts] = useState(props.nfts);
  const { account, collection } = useSelector((state: storeType) => state);
  
  const fetchNFTs = async () => {
    if (account.value == "") {
      return
    }
    let fetchURL;
    const baseURL = `https://eth-mainnet.g.alchemy.com/nft/v2/${api_key}/getNFTs/`;
    const requestOptions = {
      method: 'GET'
    }

    if (collection.value == "") {
      fetchURL = `${baseURL}?owner=${account.value}`
    } else {
      fetchURL = `${baseURL}?owner=${account.value}&contractAddresses%5B%5D=${collection.value}`
    }
    console.log(fetchURL);

    console.log("-- Fetching NFTs --");
    const _nfts = await fetch(fetchURL, requestOptions)
      .then(data => data.json());

    if (_nfts) {
      setNfts(_nfts.ownedNfts);
    }
  }


  const fetchCollection = async () => {
    if (!collection.value) {
      return
    }
    const baseUrl: string = `https://eth-mainnet.g.alchemy.com/v2/${api_key}/getNFTsForCollection/`;
    const requestOptions = {
      method: "GET"
    }

    const fetchUrl = `${baseUrl}?contractAddress=${collection.value}&withMetadata=true`;
    console.log(fetchUrl);

    console.log("-- Fetching NFTs --");
    const _nfts = await fetch(fetchUrl, requestOptions)
      .then(data => data.json());
    if (_nfts) {
      setNfts(_nfts.nfts);
    }

  };

  return (
    <>
      <InputModal fetchA={() => fetchNFTs()} fetchC={() => fetchCollection()} />
      <GalleryBody nfts={nfts} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const api_key = process.env.REACT_APP_API_KEY;
  const Url = `https://eth-mainnet.g.alchemy.com/nft/v2/${api_key}/getNFTs/?owner=0x2219772388c4CCcCB8E5D71197965cee1B124622`;
  const requestOptions = {
    method: "GET"
  }

  const _nfts = await fetch(Url, requestOptions)
    .then(data => data.json())

  return {
    props: {
      apikey: api_key,
      nfts: _nfts.ownedNfts
    }
  }
}
