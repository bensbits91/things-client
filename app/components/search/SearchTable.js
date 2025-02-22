'use client';
import { useMemo, useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import useSearchStore from '@/app/store/searchStore';
import useModalStore from '@/app/store/modalStore';
import {
   useThings,
   useDetailExists,
   useAddDetail,
   useAddThing
} from '@/app/hooks/things';
import { useSearch } from '@/app/hooks/search';
import { Table } from '../table';

export const SearchTable = () => {
   const queryClient = useQueryClient();
   const { searchTerm } = useSearchStore();
   const { openModal } = useModalStore();

   // cannot use useDetailExists hook inside handleAddThingClick
   // so need to lift externalId and use hook at the top level
   const [selectedExternalId, setSelectedExternalId] = useState(null);

   const {
      data: things,
      isLoading: isLoadingThings,
      isError: isErrorThings
   } = useThings();

   const {
      data: results,
      isLoading: isLoadingResults,
      isError: isErrorResults,
      refetch
   } = useSearch(searchTerm);

   const addDetailMutation = useAddDetail();
   const addThingMutation = useAddThing();

   // cannot use useDetailExists hook inside handleAddThingClick
   // so need to call here at the top level and use selectedExternalId from state
   const { data: detailData, isLoading: isLoadingDetail, isError: isErrorDetail } = useDetailExists(selectedExternalId);

   // TODO: NOW: move to new custom hook <<<------------------------------------------
   const handleAddThingClick = async (external_id) => {
      try {
         setSelectedExternalId(external_id);

         const detailToAdd = results.find(result => result.external_id === external_id);

         if (!detailToAdd) {
            console.info('Thing to add not found');
            return;
         }

         if (isLoadingDetail) {
            console.log('Checking if detail exists...');
            return;
         }

         if (isErrorDetail) {
            console.error('Error checking if detail exists');
            return;
         }

         // use useDetailExists hook to check if detail exists
         let detailAsdf = detailData;

         // If not, add detail to db and get detailId
         if (!detailAsdf) {
            detailAsdf = await addDetailMutation.mutateAsync(detailToAdd);
         }
         const detailId = detailAsdf._id || detailAsdf.id;

         if (!detailAsdf || !detailId) {
            console.error('Failed to get detail ID');
            return;
         }

         // Add thing to db with detail_id
         const addedThing = await addThingMutation.mutateAsync(detailAsdf, detailId);
         if (addedThing) {
            console.log('Thing added successfully:', addedThing);
            alert('Thing added successfully :)');
            //    // invalidate things query so new thing appears in user's things list
            //    queryClient.invalidateQueries({ queryKey: ['things'] });
         } else {
            console.error('Failed to add thing');
            alert('Failed to add thing for some rearea :/');
         }
      } catch (error) {
         console.log('bb ~ SearchTable.js ~ error:', error);
         const { status } = error.response || error;
         if (status === 409) {
            // setErrorMessage('Conflict error: The thing already exists.');
            alert('Conflict error: You already have this thing :)');
         } else {
            // setErrorMessage('An error occurred while adding the thing.');
            alert('Unknown error adding that thing :/');
         }
      }
   };

   const handleViewDetailsClick = external_id => {
      const currentModalData = results.find(result => result.external_id === external_id);
      openModal('search', currentModalData);
   };

   // check the cache, refetch if not found
   const handleSearch = async () => {
      if (searchTerm) {
         const cachedData = queryClient.getQueryData(['search', searchTerm]);
         if (!cachedData) {
            await refetch();
         }
      }
   };

   // trigger search when searchTerm changes
   useEffect(() => {
      handleSearch();
   }, [searchTerm]);

   const reultsWithIndicator = useMemo(() => {
      if (!results || !things) return [];
      return results.map(result => {
         console.log('bb ~ SearchTable.js ~ result:', result);
         const userHasThing =
            things &&
            Array.isArray(things) &&
            things.find(thing => {
               const thingExternalId = thing.details[0]?.external_id;
               console.log('bb ~ SearchTable.js ~ thingExternalId:', thingExternalId);
               if (!thingExternalId) return false;
               const resultExternalId = result.external_id?.toString();
               console.log('bb ~ SearchTable.js ~ resultExternalId:', resultExternalId);
               const hasit = thingExternalId === resultExternalId;
               console.log('bb ~ SearchTable.js ~ hasit:', hasit);
               return hasit;
            });

         return { ...result, userHasThing: !!userHasThing };
      });
   }, [results, things]);
   console.log('bb ~ SearchTable.js ~ reultsWithIndicator:', reultsWithIndicator);

   const columns = [
      { key: 'name', label: 'Name' },
      //   { key: 'title', label: 'Title' },
      { key: 'type', label: 'Type' }
      // { key: 'userHasThing', label: 'you have it already' }
   ];

   const actions = [
      {
         key: 'view',
         label: 'View Details',
         onClick: row => handleViewDetailsClick(row.external_id)
      },
      {
         key: 'add',
         label: 'Add to List',
         onClick: row => handleAddThingClick(row.external_id),
         altText: 'In list'
      }
   ];

   if (isLoadingThings || isLoadingResults) {
      return <p>Loading...</p>;
   }

   if (isErrorThings || isErrorResults) {
      return <p>Error loading data.</p>;
   }

   if (!results || results.length === 0) {
      return <p>Search for something to get started...</p>;
   }

   return <Table data={reultsWithIndicator} columns={columns} actions={actions} />;
};

export default SearchTable;
