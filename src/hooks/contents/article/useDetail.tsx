import ArticleService from "@/services/controlers/article/article.service";
import { ArticleData } from "@/services/controlers/article/type";
import { useQuery } from "@tanstack/react-query";

function useArticleDetail(params: Record<string, string | number> = {}, slug: string, shouldFetch: boolean ,initialData: ArticleData) {
    const {
        data,
        isLoading,
        isError,
        isFetching,
        refetch,
      } =  useQuery<{data: ArticleData}>({
        queryKey: ["article", slug, params],
        queryFn: async () => {
          return await ArticleService.getOne(slug, params)
        },
        enabled: shouldFetch,
        initialData: {data: initialData }
      })

    return {
      data: data?.data,
      isLoading,
      isFetching,
      refetch,
      isError,
    };
  }
  
  export default useArticleDetail;