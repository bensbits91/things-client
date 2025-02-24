'use client';
import { Modal } from '../modal';

import { useState, Suspense } from 'react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from '@/app/components/ErrorBoundary';
import { useErrorHandler } from '@/app/hooks/errors';

import { useAddThingWithDetails } from '@/app/hooks/things';
import { Toast } from '@/app/components/toast';
import { Loading } from '@/app/components/loading';

const SearchModal = () => {
   const [toastMessage, setToastMessage] = useState('');
   const { handleError, error, resetError, showAlert, setShowAlert } = useErrorHandler();
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

   const returnExternalId = externalId => {
      console.log('bb ~ SearchModal.js:34 ~ SearchModal ~ externalId:', externalId);
      // handleAddThingClick(externalId);
   };

   const heyBen = () => {
      console.log('hey ben');
   };

   const actions = [
      { key: 'hey', label: 'Hey', onClick: heyBen },
      {
         key: 'returnExternalId',
         label: 'Add',
         onClick: () => {}
      }
   ];

   return (
      <QueryErrorResetBoundary>
         {({ reset }) => (
            <ErrorBoundary onReset={reset}>
               <Suspense fallback={<Loading />}>
                  <Modal actions={actions} returnExternalId={returnExternalId} />
                  {toastMessage && (
                     <Toast message={toastMessage} onClose={() => setToastMessage('')} />
                  )}
               </Suspense>
            </ErrorBoundary>
         )}
      </QueryErrorResetBoundary>
   );
};

export default SearchModal;
