'use client';
import { useMemo, useEffect, useState, Suspense } from 'react';
import { useQueryClient, QueryErrorResetBoundary } from '@tanstack/react-query';
import useSearchStore from '@/app/store/searchStore';
import useModalStore from '@/app/store/modalStore';
import { useErrorHandler } from '@/app/hooks/errors';
import { useThings, useAddThingWithDetails } from '@/app/hooks/things';
import { useSearch } from '@/app/hooks/search';
import { ErrorBoundary } from '@/app/components/ErrorBoundary';
import { Table } from '@/app/components/table';
import { Toast } from '@/app/components/toast';

export const SearchTable = () => {
   const queryClient = useQueryClient();
   const { searchTerm } = useSearchStore();
   const { openModal } = useModalStore();
   const { handleError, error, resetError, showAlert, setShowAlert } = useErrorHandler();
   const [toastMessage, setToastMessage] = useState('');

   const {
      data: things,
      isLoading: isLoadingThings,
      isError: isErrorThings,
      error: thingsError
   } = useThings();

   const {
      data: results,
      isLoading: isLoadingResults,
      isError: isErrorResults,
      error: resultsError,
      refetch
   } = useSearch();

   // import handleError into the component, and pass it to the hook
   // so they share the same handler and don't conflict with each other (i think)
   const { addThingWithDetails } = useAddThingWithDetails(handleError);

   const handleAddThingClick = async externalId => {
      try {
         await addThingWithDetails(externalId);
         setToastMessage('Thing added successfully :)');
      } catch (error) {
         console.log('bb ~ SearchTable.js:56 ~ SearchTable ~ error:', error);
         const { status } = error.response || error;
         if (status === 409) {
            handleError(new Error('Conflict error: The thing already exists.'));
         } else {
            handleError(new Error('Unknown error adding that thing :/'));
         }
      }
   };

   const handleViewDetailsClick = externalId => {
      const currentModalData = results.find(result => result.external_id === externalId);
      openModal(currentModalData);
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

   const columns = [
      { key: 'name', label: 'Name' },
      { key: 'type', label: 'Type' }
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

   useEffect(() => {
      if (showAlert) {
         setToastMessage(error.message);
         setShowAlert(false);
      }
   }, [showAlert, error, setShowAlert]);

   if (isLoadingResults) {
      return <p>Loading...</p>;
   }
   if (isErrorResults) {
      // or should we let fallback ui load?
      return <p>Failed to load search results :(</p>;
   }

   if (isLoadingThings) {
      return <p>Loading things...</p>;
   }
   if (isErrorThings) {
      console.log(
         'Failed to load things:',
         thingsError,
         '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<'
      );
      if (
         [
            thingsError?.response?.data?.details?.message,
            thingsError?.response?.data?.message,
            thingsError?.response?.message,
            thingsError?.message
         ].includes('Authorization token expired')
      ) {
         router.push('/auth/login');
      }
      return <p>Failed to load things :(</p>;
   }

   if (!results || results.length === 0) {
      return <p>Search for something to get started...</p>;
   }

   return (
      <QueryErrorResetBoundary>
         {({ reset }) => (
            <ErrorBoundary onReset={reset}>
               <Suspense fallback={<p>Loading (todo)...</p>}>
                  <Table data={reultsWithIndicator} columns={columns} actions={actions} />
                  {toastMessage && (
                     <Toast message={toastMessage} onClose={() => setToastMessage('')} />
                  )}
               </Suspense>
            </ErrorBoundary>
         )}
      </QueryErrorResetBoundary>
   );
};

export default SearchTable;
