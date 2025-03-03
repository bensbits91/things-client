import { useQuery } from '@tanstack/react-query';
import { getSearch } from '@/app/services/search';

// search is different from things and details because
// the server handles creating (caching) the search results
// since we don't manually trigger adding a search term,
// we don't need to invalidate the cache
// todo: right ^^^ ???

export const useSearch = searchTerm => {
   const { data, isLoading, isError, refetch } = useQuery({
      queryKey: ['search', searchTerm],
      queryFn: () => getSearch(searchTerm),
      enabled: !!searchTerm, // Only run the query if searchTerm is not empty
      staleTime: 1000 * 60 * 60 * 5, // 5 hours
      cacheTime: 1000 * 60 * 60 * 10 // 10 hours
   });

   return { data, isLoading, isError, refetch };
};
