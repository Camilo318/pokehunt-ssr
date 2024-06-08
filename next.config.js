/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname:
          '/PokeAPI/sprites/master/sprites/pokemon/other/home/*'
      }
    ]
  }
}
