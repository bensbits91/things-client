import { NextResponse } from 'next/server';
import axiosInstance from '../../utils/axiosInstance';
import { auth0 } from '@/lib/auth0';

export async function GET(request) {
   const session = await auth0.getSession();
   const { accessToken } = session.tokenSet;

   // Forward the request to the server at port 3000
   try {
      const response = await axiosInstance.get('http://localhost:3000/statuses', {
         headers: {
            Authorization: `Bearer ${accessToken}` // Forward the Authorization header
         }
      });

      return NextResponse.json(response.data); // todo: verify status code 200 is defaulted to here
   } catch (error) {
      //   console.log('bb ~ route.js:86 ~ GET ~ error:', error);
      //   const stts = error.status || error.response.status || 'unknown';
      //   if (stts === 401) {
      //      if (
      //         error.response?.data?.details?.message === 'Authorization token expired' ||
      //         error.message === 'Authorization token expired' ||
      //         error.response?.message === 'Authorization token expired'
      //      ) {
      //         console.error('Authorization token expired, redirecting to login:', error);
      //         redirect('/auth/login'); // Navigate to the login page
      //         return NextResponse.json(
      //            { message: 'Authorization token expired', details: error.response.data },
      //            { status: 401 }
      //         );
      //      }
      //      console.error('Unauthorized:', error);
      //      return NextResponse.json(
      //         { message: 'Unauthorized', details: error.response.data },
      //         { status: 401 }
      //      );
      //   }
      console.error('Error forwarding GET request:', error);
      return NextResponse.json(
         { message: 'Error forwarding GET request', details: error },
         { status: 500 }
      );
   }
}
