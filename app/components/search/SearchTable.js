'use client';
import { useMemo, useEffect, Suspense } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import useSearchStore from '@/app/store/searchStore';
import useModalStore from '@/app/store/modalStore';
import { useThings, useAddThingWithDetails } from '@/app/hooks/things';
import { useSearch } from '@/app/hooks/search';
import { Table } from '../table';

export const SearchTable = () => {
   const queryClient = useQueryClient();
   const { searchTerm } = useSearchStore();
   const { openModal } = useModalStore();

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

   const { addThingWithDetails } = useAddThingWithDetails();

   const handleAddThingClick = async external_id => {
      try {
         const detailToAdd = results.find(result => result.external_id === external_id);
         if (!detailToAdd) {
            console.info('Thing to add not found');
            return;
         }

         await addThingWithDetails(external_id, detailToAdd);
         console.log('Thing added successfully:', addedThing);
         alert('Thing added successfully :)');
      } catch (error) {
         const { status } = error.response || error;
         if (status === 409) {
            throw new Error('Conflict error: The thing already exists.');
         } else {
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
         const userHasThing =
            things &&
            Array.isArray(things) &&
            things.find(thing => {
               const thingExternalId = thing.details[0]?.external_id;
               if (!thingExternalId) return false;
               const resultExternalId = result.external_id?.toString();
               const hasit = thingExternalId === resultExternalId;
               return hasit;
            });

         return { ...result, userHasThing: !!userHasThing };
      });
   }, [results, things]);
   // TODO: NOW: This is still not reliable <<<------------------------------------------

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

   if (!results || results.length === 0) {
      return <p>Search for something to get started...</p>;
   }

   return (
      <Suspense fallback={<p>Loading (todo)...</p>}>
         <Table data={reultsWithIndicator} columns={columns} actions={actions} />
      </Suspense>
   );
};

export default SearchTable;
