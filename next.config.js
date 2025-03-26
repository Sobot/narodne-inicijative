/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/narodne-inicijative' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/narodne-inicijative/' : '',
}

module.exports = nextConfig 