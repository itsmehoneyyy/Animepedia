/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: false,
    esmExternals: false,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://local:8000/api/:path*'
      }
    ]
  },
  images: {
    domains: ['drive.google.com'],
  },
}

export default nextConfig;
