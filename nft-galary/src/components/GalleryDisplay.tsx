import React from 'react'
import Image from 'next/image';
import { nftsType } from '@/pages';

const galleryDisplay = (props: { nfts: Array<nftsType>}) => {
  const { nfts } = props;


  const toggleDesc = (adr: string) => {
    let item = document.getElementById(adr) as HTMLElement
    if (item.style.display == 'none') {
      item.style.display = 'block';
      document.getElementById(`${adr}span`)!.innerText = "Close ";
    } else {
      item.style.display = 'none';
      document.getElementById(`${adr}span`)!.innerText = "View ";
    }
  }

  return (
    <div className="grid">
      {nfts.map((nft, index) =>
        <div key={index} className="nftModal">
          {!nft.media[0].gateway || nft.media[0].gateway === "https://nft-cdn.alchemy.com/eth-mainnet/9119c71aa305fe9401f96fd71666246c" ?
            <Image
              className="nftImage"
              src={"https://imgs.search.brave.com/_3UIR7n117MyYHSunUcpTmPmjIQgGthv_k8EkkHGRD0/rs:fit:1024:821:1/g:ce/aHR0cHM6Ly9jZG4u/bm90b250aGVoaWdo/c3RyZWV0LmNvbS9m/cy84MS9kZS82NjA2/LTFlMjEtNDMwYy1h/OTc2LTUzZjgxMzc0/NzUwMy9vcmlnaW5h/bF9odWctcnVnLW1h/dHMtc2VsZWN0Lmpw/Zw"}
              alt={nft.title}
              width={200}
              height={200} /> :
            <Image
              className="nftImage"
              src={nft.media[0].gateway}
              alt={nft.title}
              width={200}
              height={200} />
            
            }
          <div style={{"textAlign": "center"}}>
            <h3>{nft.title}</h3>
            
            <p>
              Id: {nft.id.tokenId.slice(0, 4) + "...." + nft.id.tokenId.slice(nft.id.tokenId.length - 4, nft.id.tokenId.length)}
            </p>
            
            <p>
              Contract:
                {nft.contract.address.slice(0, 4)
                + "..."
                + nft.contract.address.slice(
                  nft.contract.address.length - 4,
                  nft.contract.address.length
                )}
            </p>
          </div>
          {nft.description &&
            <p
              className={"description"}
              id={nft.id.tokenId}>
                {nft.description}
            </p>}
          <div className="nftButtons">
            {nft.description &&
              <button
                onClick={() => toggleDesc(nft.id.tokenId)}>
                <span id={nft.id.tokenId+"span"}>View </span>
                  Description </button>}
            <button><a href={"https://etherscan.io/address/"+nft.contract.address} target="_blank"> View on Etherscan </a></button>
          </div>
        </div>
      )}
    </div>
  )
}

export default galleryDisplay;