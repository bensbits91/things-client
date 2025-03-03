import { NextResponse } from 'next/server';
import axiosInstance from '../../utils/axiosInstance';
import { auth0 } from '@/lib/auth0';
import { redirect } from 'next/navigation';

// This is the API route that will be called from the client
// handles POST requests to /api/things
// forward the request to the server at port 3000

export async function POST(request) {
   const { name, detail_id } = await request.json();

   const {
      tokenSet: { accessToken }
   } = await auth0.getSession();

   // Forward the request to the server at port 3000
   try {
      const response = await axiosInstance.post(
         'http://localhost:3000/things',
         {
            name,
            detail_id
         },
         {
            headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${accessToken}`
            }
         }
      );

      return NextResponse.json(response.data); // todo: add status code 201 or 301 (resource created)
   } catch (error) {
      console.log('bb ~ route.js ~ error:', error);
      if (error.response && error.response.status === 409) {
         console.error('Conflict error:', error.response.data);
         return NextResponse.json(
            { message: 'Conflict error', details: error.response.data },
            { status: 409 }
         );
      }
      if (error.response && error.response.status === 401) {
         const msg =
            error.response.data.message ||
            error.response.details.message ||
            error.message;
         if (msg === 'Authorization token expired') {
            console.error('Authorization token expired, redirecting to login:', error);
            // redirect('/auth/login'); // Navigate to the login page
            return NextResponse.json(
               { message: 'Authorization token expired', details: error.response.data },
               { status: 401 }
            );
         }
         console.error('Unauthorized:', error);
         return NextResponse.json(
            { message: 'Unauthorized', details: error.response.data },
            { status: 401 }
         );
      }
      console.error('Error forwarding POST request:', error);
      return NextResponse.json(
         { message: 'Error forwarding POST request', details: error.message },
         { status: 500 }
      );
   }
}

// todo: can i have GET things and GET thing? or do I need a thing/route.js?
export async function GET(request) {
   const session = await auth0.getSession();
   const { accessToken } = session.tokenSet;

   // Forward the request to the server at port 3000
   try {
      const response = await axiosInstance.get('http://localhost:3000/things', {
         headers: {
            Authorization: `Bearer ${accessToken}` // Forward the Authorization header
         }
      });

      return NextResponse.json(response.data); // todo: verify status code 200 is defaulted to here
   } catch (error) {
      console.log('bb ~ route.js:86 ~ GET ~ error:', error);
      const stts = error.status || error.response.status || 'unknown';
      if (stts === 401) {
         if (
            error.response?.data?.details?.message === 'Authorization token expired' ||
            error.message === 'Authorization token expired' ||
            error.response?.message === 'Authorization token expired'
         ) {
            console.error('Authorization token expired, redirecting to login:', error);
            redirect('/auth/login'); // Navigate to the login page
            return NextResponse.json(
               { message: 'Authorization token expired', details: error.response.data },
               { status: 401 }
            );
         }
         console.error('Unauthorized:', error);
         return NextResponse.json(
            { message: 'Unauthorized', details: error.response.data },
            { status: 401 }
         );
      }
      console.error('Error forwarding GET request:', error);
      return NextResponse.json(
         { message: 'Error forwarding GET request', details: error },
         { status: 500 }
      );
   }
}

// todo: need PUT and DELETE