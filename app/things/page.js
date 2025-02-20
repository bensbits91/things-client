import axiosInstance from '../utils/axiosInstance';
import { auth0 } from '@/lib/auth0';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

import { ThingsTable } from '../components/things';

const getInitialData = async () => {
   try {
      const session = await auth0.getSession();
      const { accessToken } = session.tokenSet;

      // todo: Forward the request to the server at port 3000?? Why isn't that working???
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
      return null;
   }
};

const ThingsPage = async () => {
   const queryClient = new QueryClient();

   await queryClient.prefetchQuery({
      queryKey: ['things'],
      queryFn: getInitialData
   });

   const dehydratedState = dehydrate(queryClient);

   return (
      <div>
         <h1>My Things</h1>
         <div>
            <p>Things will go here</p>
            <HydrationBoundary state={dehydratedState}>
               <ThingsTable />
            </HydrationBoundary>
         </div>
      </div>
   );
};

export default ThingsPage;
