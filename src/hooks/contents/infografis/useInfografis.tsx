import InfografisService from "@/services/controlers/infografis/infografis.service";
import { useQuery } from "@tanstack/react-query";

function useInfografis(params: Record<string, string | number> = {}) {
    const {
        data,
        isLoading,
        isError,
        isFetching,
        refetch,
      } = useQuery({
        queryKey: ['infografis', params],
        queryFn: async () => {
          return await InfografisService.getAll(params);
        },
      })
    return {
      data: data?.data,
      isLoading,
      isFetching,
      refetch,
      isError,
    };
  }
  
  export default useInfografis;