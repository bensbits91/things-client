import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
   getThingsFromDb,
   checkDetailExistsInDb,
   addDetailToDb,
   addThingToDb
} from '@/app/services/things';

export const useThings = () => {
   const { data, isLoading, isError } = useQuery({
      queryKey: ['things'],
      queryFn: getThingsFromDb,
      staleTime: 1000 * 60 * 60 * 5, // 5 hours
      cacheTime: 1000 * 60 * 60 * 10 // 10 hours
   });

   return { data, isLoading, isError };
};

export const useDetailExists = externalId => {
   const { data, isLoading, isError } = useQuery({
      queryKey: ['detail', externalId],
      queryFn: checkDetailExistsInDb(externalId),
      enabled: !!externalId, // todo: check if this is necessary
      staleTime: 1000 * 60 * 60 * 5, // 5 hours
      cacheTime: 1000 * 60 * 60 * 10 // 10 hours
   });

   return { data, isLoading, isError };
};

export const useAddDetail = () => {
   // const queryClient = useQueryClient();
   return useMutation({
      mutationFn: addDetailToDb,
      onSuccess: () => {
         console.log('Detail added successfully');
         // queryClient.invalidateQueries(['detail']);
      },
      onError: error => {
         console.error('Error adding detail:', error);
      }
   });
};

export const useAddThing = () => {
   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: addThingToDb,
      onSuccess: () => {
         queryClient.invalidateQueries(['things']);
      },
      onError: error => {
         console.error('Error adding thing:', error);
      }
   });
};
