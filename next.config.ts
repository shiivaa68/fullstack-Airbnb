import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // images: {
  //   domains: ["avatars.githubusercontent.com", "lh3.googleusercontent.com"],
  // },
  images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
    { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
  ],
},

};

export default nextConfig;
