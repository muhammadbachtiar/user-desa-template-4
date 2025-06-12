import type { MetadataRoute } from "next";

const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URL

export default function robots(): MetadataRoute.Robots {
    return {
      rules: {
        userAgent: "*",
        allow: "/",
      },
      sitemap: `${domainUrl}sitemap.xml"`,
    }
  }