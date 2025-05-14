import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/photos/**',
      },
    ],
  },
  allowedDevOrigins: ['pvy8xh-8000.csb.app'],
  experimental: {
    optimizeCss: false, // Disable CSS optimization to avoid critters dependency
  },
}

export default nextConfig
