/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
 // basePath: process.env.NODE_ENV === 'production' ? '/narodne-inicijative' : '',
 // assetPrefix: process.env.NODE_ENV === 'production' ? '/narodne-inicijative/' : '',
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
}

module.exports = nextConfig
