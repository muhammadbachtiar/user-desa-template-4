import SettingService from "@/services/controlers/setting/setting.service";
import {useQuery} from "@tanstack/react-query"

function useStaticPage(params: Record<string, string | number> = {}, slug: string) {

    const {
        data,
        isLoading,
        isError,
        isFetching,
        refetch,
      } = useQuery({
        queryKey: [`static-page-${slug}`, slug, params],
        queryFn: async () => {
          return await SettingService.getStaticPage(slug,params);
        },
      });

    return {
      data: data?.data,
      isLoading,
      isFetching,
      refetch,
      isError,
    };
  }
  
  export default useStaticPage;