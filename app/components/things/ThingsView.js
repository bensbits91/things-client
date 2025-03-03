'use client';
import { useState, Suspense } from 'react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { useThings, useUpdateThing } from '@/app/hooks/things';
import { useErrorHandler } from '@/app/hooks/errors';
import { ErrorBoundary } from '@/app/components/ErrorBoundary';
import { Table } from '@/app/components/table';
import { Grid } from '@/app/components/grid';
import { Wall } from '@/app/components/wall';
import { Modal } from '@/app/components/modal';
import { Loading } from '@/app/components/loading';
import { Toast } from '@/app/components/toast';
import { Text } from '@/app/components/typography';

import ViewHeader from './ViewHeader';

const ThingsView = () => {
   const { data: things, isLoading, isError } = useThings();
   const { handleError, error, resetError, showAlert, setShowAlert } = useErrorHandler(); // todo
   const [modalData, setModalData] = useState(null);
   const [toastMessage, setToastMessage] = useState(null);
   const [view, setView] = useState('table');

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
         columnType: 'image'
         // onClick: handleViewDetailsClick
      },
      {
         key: 'name',
         label: 'Name',
         truncateLength: 50
         // onClick: handleViewDetailsClick
      },
      { key: 'type', label: 'Type', columnType: 'icon' },
      { key: 'rating', label: 'Rating', columnType: 'rating' },
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
         onClick: () =>
            setToastMessage({
               heading: 'Hey Ben!',
               message:
                  "This'll be more info. This'll be more info. This'll be more info. This'll be more info. This'll be more info.",
               variant: 'info'
            })
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
      return <Text>Error loading things.</Text>;
   }

   const { updateThingMutation } = useUpdateThing(handleError);

   const handleModalEdit = async newThing => {
      await updateThingMutation.mutateAsync(newThing);
      setModalData(newThing);
   };

   const handleViewChange = key => {
      console.log('bb ~ ThingsView.js:111 ~ ThingsView ~ key:', key);
      setView(key);
   };

   const viewOptions = ['Table', 'Grid', 'List', 'Wall'];
   const viewTools = viewOptions.map(option => ({
      key: option.toLowerCase(),
      label: option,
      onClick: handleViewChange
   }));

   return (
      <QueryErrorResetBoundary>
         {({ reset }) => (
            <ErrorBoundary onReset={reset}>
               <Suspense fallback={<Loading />}>
                  <ViewHeader heading='My Things' tools={viewTools} />
                  {view === 'table' && (
                     <Table
                        data={things}
                        columns={columns}
                        handleRowClick={handleViewDetailsClick}
                        // actions={tableActions}
                     />
                  )}
                  {view === 'grid' && <Grid data={things} />}
                  {view === 'list' && <div>not sure if we'll do a list view...</div>}
                  {view === 'wall' && (
                     <Wall data={things} handleItemClick={handleViewDetailsClick} />
                  )}
                  {modalData && (
                     <Modal
                        modalData={modalData}
                        actions={modalActions}
                        handleCloseModal={handleCloseModal}
                        handleEdit={handleModalEdit}
                     />
                  )}
                  {toastMessage && (
                     <Toast
                        heading={toastMessage.heading}
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

export default ThingsView;
