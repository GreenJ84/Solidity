/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "i.seadn.io",
      "nft-cdn.alchemy.com",
      "imgs.search.brave.com"
    ]
  }
}

module.exports = nextConfig
