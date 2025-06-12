import TourService from "@/services/controlers/tour/tour.service";
import { TourData } from "@/services/controlers/tour/type";
import { useQuery } from "@tanstack/react-query";

function useTourDetail(params: Record<string, string | number> = {}, slug: string ) {
    const {
        data,
        isLoading,
        isError,
        isFetching,
        refetch,
      } = useQuery<{data: TourData}>({
        queryKey: ["tour", params],
        queryFn: async () => {
          return await TourService.getOne(slug, params)
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
  
  export default useTourDetail;