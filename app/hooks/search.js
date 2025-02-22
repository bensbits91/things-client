import { useQuery } from '@tanstack/react-query';
import { getSearch } from '@/app/services/search';

export const useSearch = searchTerm => {
   console.log('bb ~ search.js ~ searchTerm:', searchTerm);
   const { data, isLoading, isError, refetch } = useQuery({
      queryKey: ['search', searchTerm],
      queryFn: () => getSearch(searchTerm),
      enabled: !!searchTerm, // Only run the query if searchTerm is not empty
      staleTime: 1000 * 60 * 60 * 5, // 5 hours
      cacheTime: 1000 * 60 * 60 * 10 // 10 hours
   });

   return { data, isLoading, isError, refetch };
};
