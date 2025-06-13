/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // if you're using next/image
  },
}

module.exports = nextConfig;
