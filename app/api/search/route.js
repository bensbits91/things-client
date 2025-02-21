import { NextResponse } from 'next/server';
import axiosInstance from '../../utils/axiosInstance';
import { auth0 } from '@/lib/auth0';

export async function GET(request) {
   const searchParams = new URL(request.url).searchParams;
   const searchTerm = searchParams.get('searchTerm');
   // const types = searchParams.get('types');

   const {
      tokenSet: { accessToken }
   } = await auth0.getSession(); // todo: replace everywhere (or create getAccessTokenFromSession util)

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

      return NextResponse.json(response.data);
   } catch (error) {
      console.error('Error forwarding POST request:', error);
      return NextResponse.json(
         { message: 'Error forwarding POST request', details: error },
         { status: 500 }
      );
   }
}
