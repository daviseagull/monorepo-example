/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@monorepo/ui'],
  output: 'standalone',
}

export default nextConfig
