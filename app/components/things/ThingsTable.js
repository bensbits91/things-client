'use client';
import { useState, Suspense } from 'react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { useThings } from '@/app/hooks/things';
import { useErrorHandler } from '@/app/hooks/errors';
import { ErrorBoundary } from '@/app/components/ErrorBoundary';
import { Table } from '@/app/components/table';
import { Modal } from '@/app/components/modal';
import { Loading } from '@/app/components/loading';
import { Toast } from '@/app/components/toast';

const ThingsTable = () => {
   const { data: things, isLoading, isError } = useThings();
   const { handleError, error, resetError, showAlert, setShowAlert } = useErrorHandler(); // todo
   const [modalData, setModalData] = useState(null);
   const [toastMessage, setToastMessage] = useState(null);

   const handleViewDetailsClick = clickedThing => {
      setModalData(clickedThing);
   };

   const handleCloseModal = () => {
      setModalData(null);
   };

   const columns = [
      {
         key: 'main_image_url',
         label: '',
         columnType: 'image',
         onClick: handleViewDetailsClick
      },
      { key: 'name', label: 'Name', onClick: handleViewDetailsClick },
      { key: 'type', label: 'Type' },
      { key: 'rating', label: 'Rating' },
      { key: 'statusText', label: 'Status' },
      { key: 'country', label: 'Country' },
      { key: 'language', label: 'Language' },
      { key: 'date', label: 'Date' },
      { key: 'genres', label: 'Genres' }
   ];

   // const tableActions = [
   //    {
   //       key: 'view',
   //       label: 'View',
   //       onClick: handleViewDetailsClick
   //    },
   //    {
   //       key: 'edit',
   //       label: 'Edit',
   //       onClick: row => console.log('Edit', row)
   //    },
   //    {
   //       key: 'delete',
   //       label: 'Delete',
   //       onClick: row => console.log('Delete', row)
   //    }
   // ];

   const modalActions = [
      {
         key: 'hey',
         label: 'Hey Ben',
         onClick: () => setToastMessage({ message: 'Hey Ben!' })
      },
      {
         key: 'edit',
         label: 'Edit',
         onClick: row => console.log('Edit', row)
      },
      {
         key: 'delete',
         label: 'Delete',
         onClick: row => console.log('Delete', row)
      }
   ];

   if (isLoading) {
      return <Loading />;
   }

   if (isError) {
      return <p>Error loading things.</p>;
   }

   return (
      <QueryErrorResetBoundary>
         {({ reset }) => (
            <ErrorBoundary onReset={reset}>
               <Suspense fallback={<Loading />}>
                  <Table
                     data={things}
                     columns={columns}
                     // actions={tableActions}
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

export default ThingsTable;
