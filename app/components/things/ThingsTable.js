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
   const { handleError, error, resetError, showAlert, setShowAlert } = useErrorHandler();
   const [modalData, setModalData] = useState(null);
   const [toastMessage, setToastMessage] = useState('');

   const normalizedModalData = data => {
      const detailsToPullToTop = [
         // data the modal needs to display
         'main_image_url',
         'type',
         'description',
         'genres',
         'country',
         'language',
         'date'
      ];
      const currentModalData = { ...data }; // a copy of the clicked thing
      const thingDetail = currentModalData.details[0]; // the deatils of the clicked thing

      detailsToPullToTop.forEach(detail => {
         currentModalData[detail] = thingDetail[detail];
      });
      return currentModalData;
   };

   const handleViewDetailsClick = clickedThing => {
      const currentModalData = normalizedModalData(clickedThing);
      setModalData(currentModalData);
   };

   const handleCloseModal = () => {
      setModalData(null);
   };

   const columns = [
      { key: 'name', label: 'Name' }
      //   { key: 'type', label: 'Type' }
   ];

   const tableActions = [
      {
         key: 'view',
         label: 'View',
         onClick: handleViewDetailsClick
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

   const modalActions = [
      {
         key: 'hey',
         label: 'Hey Ben',
         onClick: () => console.log('hey ben')
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
                  <Table data={things} columns={columns} actions={tableActions} />
                  {modalData && (
                     <Modal
                        modalData={modalData}
                        actions={modalActions}
                        handleCloseModal={handleCloseModal}
                     />
                  )}
                  {toastMessage && (
                     <Toast message={toastMessage} onClose={() => setToastMessage('')} />
                  )}
               </Suspense>
            </ErrorBoundary>
         )}
      </QueryErrorResetBoundary>
   );
};

export default ThingsTable;
