/** @type {import('next').NextConfig} */
const privateRobotsHeaders = [
  {
    key: "X-Robots-Tag",
    value: "noindex, nofollow, noarchive, nosnippet, noimageindex",
  },
];

const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/admin/:path*",
        headers: privateRobotsHeaders,
      },
      {
        source: "/api/:path*",
        headers: privateRobotsHeaders,
      },
    ];
  },
};

export default nextConfig;
