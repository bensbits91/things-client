import { useState } from 'react';
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
      queryFn: () => checkDetailExistsInDb(externalId),
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

export const useAddThingWithDetails = () => {
   // const queryClient = useQueryClient(); // todo: confirm we don't need this because we're using a mutation
   const addDetailMutation = useAddDetail();
   const addThingMutation = useAddThing();

   // cannot use useDetailExists hook inside handleAddThingClick
   // so need to lift externalId and use hook at the top level
   const [selectedExternalId, setSelectedExternalId] = useState(null);
   const {
      data: detailData,
      isLoading: isLoadingDetail,
      isError: isErrorDetail
   } = useDetailExists(selectedExternalId);

   const addThingWithDetails = async (externalId, detailToAdd) => {
      try {
         // trigger useDetailExists hook to check if detail exists
         setSelectedExternalId(externalId);
         if (isLoadingDetail) {
            console.log('Checking if detail exists...');
            return;
         }
         if (isErrorDetail) {
            throw new Error('Error checking if detail exists');
         }

         // If not, add detail to db and get detail_id
         let detail = detailData;
         if (!detail) {
            detail = await addDetailMutation.mutateAsync(detailToAdd);
         }
         const detailId = detail._id || detail.id;

         if (!detail || !detailId) {
            throw new Error('Failed to get detail ID');
         }

         // Add thing to db with detail_id
         const thingToAdd = {
            name: detail.name,
            detail_id: detailId
         };
         const addedThing = await addThingMutation.mutateAsync(thingToAdd);
         if (addedThing) {
            console.log('Thing added successfully:', addedThing);
            // queryClient.invalidateQueries(['things']); // todo: confirm we don't need this because we're using a mutation
         } else {
            throw new Error('Failed to add thing');
         }
      } catch (error) {
         console.error('Error in useAddThingWithDetails:', error);
         const { status } = error.response || error;
         if (status === 409) throw new Error('Conflict error: The thing already exists.');

         throw error;
      }
   };

   return { addThingWithDetails };
};
