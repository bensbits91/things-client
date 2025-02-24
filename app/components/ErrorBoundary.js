import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { useErrorHandler } from '@/app/hooks/errors';

function ErrorFallback({ error, resetErrorBoundary }) {
   return (
      <div role='alert'>
         <p>Something went wrong:</p>
         <pre>{error.message}</pre>
         <button onClick={resetErrorBoundary}>Try again</button>
      </div>
   );
}

export const ErrorBoundary = ({ children }) => {
   const { error, handleError, resetError } = useErrorHandler();

   return (
      <ReactErrorBoundary
         FallbackComponent={ErrorFallback}
         onError={handleError}
         onReset={resetError}>
         {children}
      </ReactErrorBoundary>
   );
};
