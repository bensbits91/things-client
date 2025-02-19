import { NextResponse } from 'next/server';
import axiosInstance from '../../utils/axiosInstance';
import { auth0 } from '@/lib/auth0';

// This is the API route that will be called from the client
// handles POST requests to /api/things
// forward the request to the server at port 3000

export async function POST(request) {
   const { name, userId } = await request.json();
   console.log('bb ~ { name, userId }:', { name, userId });
   console.log(
      "bb ~ request.headers.get('Authorization'):",
      request.headers.get('Authorization')
   );

   // Forward the request to the server at port 3000
   try {
      const response = await axiosInstance.post(
         'http://localhost:3000/things',
         {
            // userId, // todo: the server should be able to get the userId from the user object
            name
         },
         {
            headers: {
               'Content-Type': 'application/json',
               Authorization: request.headers.get('Authorization') // Forward the Authorization header
            }
         }
      );
      console.log('bb ~ responseeeeeeeeeeeeeeeeeeeeeeeeeeeeeee:', response);

      return NextResponse.json(response.data); // todo: add status code 201 or 301 (resource created)
   } catch (error) {
      console.error('Error forwarding POST request:', error);
      return NextResponse.json(
         { message: 'Error forwarding POST request', details: error },
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
      console.log('bb ~ responseeeeeeeeeeeeeeeeeeeeeeeeeeeeeee:', response);

      return NextResponse.json(response.data); // todo: verify status code 200 is defaulted to here
   } catch (error) {
      console.error('Error forwarding GET request:', error);
      return NextResponse.json(
         { message: 'Error forwarding GET request', details: error },
         { status: 500 }
      );
   }
}
