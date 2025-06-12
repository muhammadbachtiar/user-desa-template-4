import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.trendwisata.com",
        pathname: "/**", // Mengizinkan semua gambar dari domain ini
      },
      {
        protocol: "https",
        hostname: "sekolahgurupemimpin.s3.ap-southeast-1.amazonaws.com",
        pathname: "/**", 
      },
      {
        protocol: "https",
        hostname: "tse1.mm.bing.net",
        pathname: "/**", 
      },
      {
        protocol: "https",
        hostname: "tottong.desa.id",
        pathname: "/**", 
      },
    ],
  },
};

export default withFlowbiteReact(nextConfig);
