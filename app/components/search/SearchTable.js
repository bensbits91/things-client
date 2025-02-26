'use client';
import { useMemo, useEffect, useState, Suspense } from 'react';
import { useQueryClient, QueryErrorResetBoundary } from '@tanstack/react-query';
import { useErrorHandler } from '@/app/hooks/errors';
import { useThings, useAddThingWithDetails } from '@/app/hooks/things';
import { useSearch } from '@/app/hooks/search';
import { ErrorBoundary } from '@/app/components/ErrorBoundary';
import { Table } from '@/app/components/table';
import { Toast } from '@/app/components/toast';
import { Loading } from '@/app/components/loading';
import { Modal } from '@/app/components/modal';
import { Text } from '@/app/components/typography';

export const SearchTable = ({ searchTerm }) => {
   const queryClient = useQueryClient();
   const { handleError, error, resetError, showAlert, setShowAlert } = useErrorHandler();
   const [modalData, setModalData] = useState(null);
   const [toastMessage, setToastMessage] = useState(null);

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
   } = useSearch(searchTerm);

   const reultsWithUserInfo = useMemo(() => {
      // todo: Would it be better to do this with mongoose aggregate?
      if (!results || !things) return [];
      return results.map(result => {
         const userThing = things.find(thing => {
            console.log('bb ~ SearchTable.js:43 ~ reultsWithUserInfo ~ thing:', thing);
            const thingExternalId = thing.external_id;
            if (!thingExternalId) return false;
            const resultExternalId = result.external_id?.toString();
            return thingExternalId === resultExternalId;
         });

         return {
            ...result,
            userHasThing: !!userThing,
            rating: userThing?.rating || 0,
            status: userThing?.status || 0,
            notes: userThing?.notes || '',
            review: userThing?.review || ''
         };
      });
   }, [results, things]);

   // import handleError into the component, and pass it to the hook
   // so they share the same handler and don't conflict with each other (i think)
   const { addThingWithDetails } = useAddThingWithDetails(handleError, searchTerm);

   const handleAddThingClick = async externalId => {
      try {
         await addThingWithDetails(externalId);
         setToastMessage({ message: 'Thing added successfully :)', variant: 'success' });
      } catch (error) {
         console.log('bb ~ SearchTable.js:56 ~ SearchTable ~ error:', error);
         setToastMessage({ message: 'Thing NOT added :(', variant: 'error' });
         const { status } = error.response || error;
         if (status === 409) {
            setToastMessage({
               message: 'You already have that thing :)',
               variant: 'info'
            });
            handleError(new Error('Conflict error: The thing already exists.'));
         } else {
            setToastMessage({
               message: 'Unknown error adding that thing :/',
               variant: 'success'
            });
            handleError(new Error('Unknown error adding that thing :/'));
         }
      }
   };

   const handleViewDetailsClick = externalId => {
      const currentModalData = reultsWithUserInfo.find(
         result => result.external_id === externalId
      );
      setModalData(currentModalData);
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

   const columns = [
      { key: 'name', label: 'Name' },
      { key: 'type', label: 'Type' }
   ];

   const tableActions = [
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

   const handleModalAddClick = () => {
      const { external_id } = modalData;
      if (external_id) {
         handleAddThingClick(external_id);
      }
   };

   const modalActions = [
      {
         key: 'hey',
         label: 'Hey Ben',
         onClick: () => setToastMessage({ message: 'Hey Ben!' })
      },
      {
         key: 'add',
         label: 'Add to List',
         onClick: handleModalAddClick,
         altText: 'In list'
      }
   ];

   const handleCloseModal = () => {
      setModalData(null);
   };

   useEffect(() => {
      if (showAlert) {
         setToastMessage({ message: error.message, variant: 'error' });
         setShowAlert(false);
      }
   }, [showAlert, error, setShowAlert]);

   if (isLoadingResults || isLoadingThings) {
      // todo: do i need this if using Suspense??
      return <Loading />;
   }
   if (isErrorResults) {
      console.log('bb ~ SearchTable.js:153 ~ SearchTable ~ resultsError:', resultsError);
      return <Text>Failed to load search results :(</Text>;
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
         router.push('/auth/login'); // todo: Not working
      }
      return <Text>Failed to load things :(</Text>;
   }

   if (!results || results.length === 0) {
      return <Text>Search for something to get started...</Text>;
   }

   return (
      <QueryErrorResetBoundary>
         {({ reset }) => (
            <ErrorBoundary onReset={reset}>
               <Suspense fallback={<Loading />}>
                  <Table
                     data={reultsWithUserInfo}
                     columns={columns}
                     actions={tableActions}
                  />
                  {modalData && (
                     <Modal
                        modalData={modalData}
                        actions={modalActions}
                        handleCloseModal={handleCloseModal}
                     />
                  )}
                  {toastMessage && (
                     <Toast
                        message={toastMessage.message}
                        variant={toastMessage.variant}
                        onClose={() => setToastMessage(null)}
                     />
                  )}
               </Suspense>
            </ErrorBoundary>
         )}
      </QueryErrorResetBoundary>
   );
};

export default SearchTable;
