import { useQuery } from '@tanstack/react-query';
import { getStatusesFromDb } from '@/app/services/statuses';

export const useStatuses = () => {
   const { data, isLoading, isError, error } = useQuery({
      queryKey: ['statuses'],
      queryFn: getStatusesFromDb,
      onError: error => {
         console.log('bb ~ useStatuses ~ error:', error);
         throw error;
      },
      staleTime: 1000 * 60 * 60 * 5, // 5 hours
      cacheTime: 1000 * 60 * 60 * 10 // 10 hours
   });

   return { data, isLoading, isError, error };
};
