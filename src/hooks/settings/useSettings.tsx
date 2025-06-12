import SettingService from "@/services/controlers/setting/setting.service";
import {useQuery} from "@tanstack/react-query"

function useSetting(slug: string, params: Record<string, string | number> = {},) {

    const {
        data,
        isLoading,
        isError,
        isFetching,
        refetch,
      } = useQuery({
        queryKey: [slug, slug, params],
        queryFn: async () => {
          return await SettingService.getSetting(slug,params);
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
  
  export default useSetting;