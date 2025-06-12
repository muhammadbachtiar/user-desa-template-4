import ArticleService from "@/services/controlers/article/article.service"
import { ArticleData } from "@/services/controlers/article/type"
import type { MetadataRoute } from "next"
const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URL

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

    if(domainUrl){
        let articleEntries = [];
        let articles = []
        try {
            const { data } = await ArticleService.getAll();
            articles = data || []; 
            } catch (error) {
                if (error) {
                    console.warn("Articles not found");
                    articles = []; 
                } else {
                    throw error; 
                }
            }

    if (articles.length > 0) {
        articleEntries = articles.map((article: ArticleData) => ({
            url: `${domainUrl}/articles/${article.slug}`,
            lastModified: new Date(article.updated_at),
            changeFrequency: "weekly" as const,
            priority: 0.8,
        }));
    }

        const staticPages = [
            {
                url: domainUrl,
                lastModified: new Date(),
                changeFrequency: "daily" as const,
                priority: 1.0,
            },
            {
                url: `${domainUrl}/article`,
                lastModified: new Date(),
                changeFrequency: "monthly" as const,
                priority: 0.5,
            },
            {
                url: `${domainUrl}/tour`,
                lastModified: new Date(),
                changeFrequency: "monthly" as const,
                priority: 0.5,
            },
        ]

        return [...staticPages, ...articleEntries]
    }

    return []
 
}
