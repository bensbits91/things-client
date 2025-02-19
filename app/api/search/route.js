import { NextResponse } from 'next/server';
import axiosInstance from '../../utils/axiosInstance';
import { auth0 } from '@/lib/auth0';

export async function GET(request) {
   const searchParams = new URL(request.url).searchParams;
   const searchTerm = searchParams.get('searchTerm');
   // const types = searchParams.get('types');

   const session = await auth0.getSession();
   const { accessToken } = session.tokenSet;

   try {
      // send request to server
      const response = await axiosInstance.get('http://localhost:3000/search', {
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
         },
         params: {
            query: searchTerm,
            types: 'todo' // todo: get teypes from checkboxes -> request...
         }
      });
      console.log('bb ~ responseeeeeeeeeeeeeeeeeeeeeeeeeeeeeee:', response);

      return NextResponse.json(response.data);
   } catch (error) {
      console.error('Error forwarding POST request:', error);
      return NextResponse.json(
         { message: 'Error forwarding POST request', details: error },
         { status: 500 }
      );
   }
}
