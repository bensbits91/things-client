// TODO: is this needed/used?

import { AppError } from './errors';
// import { toast } from "react-toastify"; // Example for user-friendly error messages

/* 
    Handle client errors (e.g., validation errors, 404 not found)
	* Focuses on handling client-side (browser) errors that occur within React components, event handlers, or effects.
    * Determines whether an error should be shown to the user, logged, or ignored based on its type.
    * Can trigger UI updates (e.g., setting an error state).
    * Could be used inside a global error boundary, event handlers, or hooks.
	* Inside error boundaries (componentDidCatch).
	* Inside catch blocks in UI event handlers.
	* In a global UI error-handling context. 
    */
const handleClientError = error => {
   if (error instanceof AppError) {
      return { message: error.message, statusCode: error.statusCode };
   }

   if (error.response) {
      // API returned an error response
      return {
         message: error.response.data?.message || 'Something went wrong',
         statusCode: error.response.status
      };
   }

   if (error.request) {
      // Network errors (e.g., server down)
      return { message: 'Network error. Please try again.', statusCode: 503 };
   }

   return { message: 'Unexpected error occurred', statusCode: 500 };
};

const logError = error => {
   console.error('Logged Error:', error);
   // todo: add winston and loggly
};

/* 
    Universal error handler that works for both client and server errors (acts as the main error-processing function).
	* Determines logging behavior (e.g., sending errors to an external service like Sentry).
	* Calls handleClientError when dealing with client-side errors.
    * Logs errors based on their origin (client vs. server).
	* Sends errors to external monitoring tools if necessary.
	* Passes errors to handleClientError when needed.
	* Everywhere errors need processing (both client and server).
	* Inside API handlers (/api/*).
	* Inside React Query hooks (to log API call failures).
	* As a wrapper for all client-side error handling.
    */
const handleError = (error, showToast = true) => {
   const { message, statusCode } = handleClientError(error);

   if (showToast) {
      //   toast.error(message);
      alert(message);
   }

   logError(error);

   return { message, statusCode };
};

export { handleError };
