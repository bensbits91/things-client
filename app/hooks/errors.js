import { useState } from 'react';

export const useErrorHandler = () => {
   const [error, setError] = useState(null);
   const [showAlert, setShowAlert] = useState(false);

   const handleError = error => {
      setError(error);
      // Determine if the error should be displayed as an alert
      const msg = error.message || error;
      const showAlert = msg.includes('Conflict error') || msg.includes('409');
      if (showAlert) {
         // todo: determine what types of alerts need to be shown
         setShowAlert(true);
      } else {
         setShowAlert(false);
      }
   };

   const resetError = () => setError(null);

   return { error, handleError, resetError, showAlert, setShowAlert };
};
