import axiosInstance from '../utils/axiosInstance';
import { auth0 } from '@/lib/auth0';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { ThingsTable } from '@/app/components/things';
import { Heading } from '@/app/components/typography';

const getInitialData = async () => {
   try {
      const session = await auth0.getSession();
      const { accessToken } = session.tokenSet;
      // send request directly to the server (instead of the API route) -- faster, fewer HTTP requests, less overhead
      const response = await axiosInstance.get('http://localhost:3000/things', {
         headers: {
            Authorization: `Bearer ${accessToken}` // Forward the Authorization header
         }
      });

      return response.data;
   } catch (error) {
      console.error(
         'Failed to load things on page:',
         error.response ? error.response.data : error.message
      );
      // if (
      //    error.message === 'Authorization token expired' ||
      //    error.response.status === 401
      // ) {
      //    // Redirect to the login page if the token is expired or invalid
      //    auth0.loginWithRedirect();
      // }
      return null;
   }
};

const ThingsPage = async () => {
   const queryClient = new QueryClient();
   await queryClient.prefetchQuery({
      queryKey: ['things'],
      queryFn: getInitialData,
      staleTime: 1000 * 60 * 60 * 4, // 4 hours // todo: decide on good values
      cacheTime: 1000 * 60 * 60 * 8 // 8 hours
   });
   const dehydratedState = dehydrate(queryClient);

   return (
      <div>
         <Heading level='1'>My Things</Heading>
         <div>
            <HydrationBoundary state={dehydratedState}>
               <ThingsTable />
            </HydrationBoundary>
         </div>
      </div>
   );
};

export default ThingsPage;
