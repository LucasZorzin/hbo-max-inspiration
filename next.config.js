/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: '/search',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
