/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      //   dangerouslyAllowSVG: true,
      //   contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
      remotePatterns: [
         {
            protocol: 'https',
            hostname: 'image.tmdb.org'
         },
         {
            protocol: 'http',
            hostname: 'books.google.com'
         },
         {
            protocol: 'https',
            hostname: 'www.giantbomb.com',
            pathname: '/a/**'
         }
      ]
   }
};

export default nextConfig;
