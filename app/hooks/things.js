// import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getThingsFromDb, addThingToDb } from '@/app/services/things';
import { checkDetailExistsInDb, addDetailToDb } from '@/app/services/details';
// import useSearchStore from '@/app/store/searchStore';
import { useSearch } from '@/app/hooks/search';

export const useThings = () => {
   const { data, isLoading, isError, error } = useQuery({
      queryKey: ['things'],
      queryFn: getThingsFromDb,
      onError: error => {
         console.log('bb ~ things.js:10 ~ useThings ~ error:', error);
         throw error;
      },
      staleTime: 1000 * 60 * 60 * 5, // 5 hours
      cacheTime: 1000 * 60 * 60 * 10 // 10 hours
   });

   return { data, isLoading, isError, error };
};

export const useDetailExists = externalId => {
   console.log('bb ~ things.js:20 ~ externalId:', externalId);
   // todo: move to details.js
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
   // todo: move to details.js
   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: addDetailToDb,
      onSuccess: () => {
         console.log('Detail added successfully');
         queryClient.invalidateQueries(['detail']);
         console.log("react-query 'detail' cache invalidated");
      },
      onError: error => {
         console.log('bb ~ things.js:46 ~ useAddDetail ~ error:', error);
         throw error;
      }
   });
};

export const useAddThing = () => {
   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: addThingToDb,
      onSuccess: () => {
         console.log('Thing added successfully');
         queryClient.invalidateQueries(['things']);
         console.log("react-query 'thing' cache invalidated");
      },
      onError: error => {
         console.log('bb ~ things.js:65 ~ useAddThing ~ error:', error);
         throw error;
      }
   });
};

// pass handleError function from component to hook
export const useAddThingWithDetails = handleError => {
   const queryClient = useQueryClient();
   const addDetailMutation = useAddDetail();
   const addThingMutation = useAddThing();


   const {
      data: results,
      isLoading: isLoadingResults,
      isError: isErrorResults
      // refetch
   } = useSearch();

   const addThingWithDetails = async (externalId /* , detailToAdd */) => {
      try {
         let detail = await checkDetailExistsInDb(externalId);

         // If not found in db, add detail to db and get detail_id
         if (!detail) {
            // find detail we need from the results in cache
            const detailToAdd = results.find(result => result.external_id === externalId);
            if (!detailToAdd) {
               console.info('Detail data to add not found');
               throw new Error('Failed to find detail in cached results');
            }
            detail = await addDetailMutation.mutateAsync(detailToAdd);
            queryClient.invalidateQueries(['details']); // not sure if needed here because also invalidated in addDetailMutation.onSuccess
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
            queryClient.invalidateQueries(['things']);
         } else {
            throw new Error('Failed to add thing');
         }
      } catch (error) {
         handleError(error);
         throw error; // Re-throw the error to propagate it to the component
      }
   };

   return { addThingWithDetails };
};
