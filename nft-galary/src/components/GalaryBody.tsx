import React from 'react'
import { useSelector } from 'react-redux'
import { storeType } from 'store/store'
import ImageBoard from './ImageBoard'

import { nftData } from '@/pages/index'

const GalaryBody = (props: { nfts: Array<nftData> }) => {
  const { account, collection } = useSelector((state: storeType) => state)
  return (
    <>
      <h1 className="title"> Currently displaying NFTs from
        {account.value ? <p> Account address <span>{account.value}</span></p> : ""}
        { account.value && collection.value ? <p> and </p>:""}
        { collection.value ? <p> Collection address <span >{collection.value}</span></p>:""}
      </h1>
      <ImageBoard nfts={props.nfts}/>
    </>
  )
}

export default GalaryBody