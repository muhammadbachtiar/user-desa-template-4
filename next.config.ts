import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sekolahgurupemimpin.s3.ap-southeast-1.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api-minio.muaraenimkab.go.id',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.cdninstagram.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.fbcdn.net',
        pathname: '/**',
      },
    ],
  },
};

export default withFlowbiteReact(nextConfig);
