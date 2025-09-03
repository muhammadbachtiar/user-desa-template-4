import { cache } from 'react';
import ArticleService from '@/services/controlers/article/article.service';
import { ArticleData } from '@/services/controlers/article/type';

export const getArticle = cache(async (slug: string): Promise<ArticleData> => {
  const response = await ArticleService.getOne(slug, { with: "user,category" });
  return response.data;
});
