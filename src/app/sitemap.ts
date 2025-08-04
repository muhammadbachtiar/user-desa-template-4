import ArticleService from "@/services/controlers/article/article.service"
import { ArticleData } from "@/services/controlers/article/type"
import SettingService from "@/services/controlers/setting/setting.service";
import { MenuItem } from "@/types/menu";
import type { MetadataRoute } from "next"
const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URL

function generateStaticPagePaths(menu: MenuItem[], parentPath: string = ""): string[] {
    let paths: string[] = [];
    
    for (const item of menu) {
        let currentPath = parentPath;
        if (item.route) {
            currentPath = item.route.startsWith("/")
                ? `${parentPath}${item.route}`
                : `${parentPath}/${item.route}`;
        }
        
        if (item.staticPage && item.route) {
            paths.push(currentPath);
        }
        
        if (item.child && Array.isArray(item.child)) {
            paths = [...paths, ...generateStaticPagePaths(item.child, currentPath)];
        }
    }
    
    return paths;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

    if(domainUrl){
        let articleEntries = [];
        let menuEntries = [];
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

        try {
            const { data } = await SettingService.getSetting(`menu-${process.env.NEXT_PUBLIC_VILLAGE_ID}`, {});
            menuEntries = data.value || []; 
        } catch (error) {
            if (error) {
                console.warn("Menu not found");
                articles = []; 
            } else {
                throw error; 
            }
        }

        if (articles.length > 0) {
            articleEntries = articles.map((article: ArticleData) =>{
                const updatedAt = new Date(article.updated_at);

                return  {
                    url: `${domainUrl}/article/${article.slug}`,
                    lastModified: isNaN(updatedAt.getTime()) ? new Date() : updatedAt,
                    changeFrequency: "weekly" as const,
                    priority: 0.8,
                }
            });
        }

        let staticPageEntries: Array<{
            url: string;
            lastModified: Date;
            changeFrequency: "monthly";
            priority: number;
        }> = [];

        if(menuEntries.length > 0) {
            const staticPagePaths = generateStaticPagePaths(menuEntries);
            staticPageEntries = staticPagePaths.map((path) => ({
                url: `${domainUrl}${path}`,
                lastModified: new Date(),
                changeFrequency: "monthly" as const,
                priority: 0.7,
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

        return [...staticPages, ...articleEntries, ...staticPageEntries]
    }

    return []
 
}
