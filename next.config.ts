/** @type {import('next').NextConfig} */
const nextConfig = {
  tyoescript: { ignoreBuildErrors: true },
  images: {
    remotePatterns: [
      {
        hostname: 'lh3.googleusercontent.com',
      },
      { hostname: 'avatars.githubusercontent.com' },
    ],
  },
}

export default nextConfig
