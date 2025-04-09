/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    optimizeFonts: false,
    esmExternals: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fonts.googleapis.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'fonts.gstatic.com',
        pathname: '/**',
      }
    ],
    unoptimized: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig; 