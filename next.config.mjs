/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  optimizeFonts: true,
  experimental: {
    optimizeCss: true
  }
};

export default nextConfig; 