import { useInfiniteQuery } from "@tanstack/react-query";
import { ListPressRelease } from "@/services/controlers/press-release/pressRelease.type";
import PressReleaseService from "@/services/controlers/press-release/pressRelease.service";

function usePressRelease(params: Record<string, string | number> = {}, categoryId: number = 0) {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery<ListPressRelease, Error>({
    initialPageParam: null,
    queryKey: ["pressreleases", categoryId, params],
    queryFn: async ({ pageParam = null }) => {
      return await PressReleaseService.getAll(
        {
          with: "category",
          ...(categoryId !== 0 && { category: categoryId }),
          ...params,
          cursor: pageParam
        }
      );
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage?.meta?.next_page_url) {
        return undefined;
      }
      const url = new URL(lastPage.meta.next_page_url);
      const cursor = url.searchParams.get("cursor");
      return cursor ?? undefined;
    }
  })

  return {
    data,
    isLoading,
    isFetching,
    hasNextPage,
    fetchNextPage,
    refetch,
    isError,
    isFetchingNextPage
  };
}

export default usePressRelease;