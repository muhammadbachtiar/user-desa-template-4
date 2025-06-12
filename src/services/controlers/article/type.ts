import { Meta } from "@/types/meta";
import { CategoryData } from "../category/type";

export type ArticleData = {
    id: number;
    user_id: number,
    category_id: string; 
    title: string; 
    description: string;
    slug: string;
    content: string; 
    published_at: string | null;
    views: number,
    thumbnail: string | null;
    meta: {
      key: string; 
      value: string | string[]; 
    }[]; 
    user: {
      name: string
    }
    created_at: string
    updated_at: string
    category: CategoryData
  }; 

export type ListArticle = {
  data: ArticleData[];
  meta: Meta
}