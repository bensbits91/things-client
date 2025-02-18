import { NextResponse } from 'next/server';
import axiosInstance from '../../utils/axiosInstance';

export async function GET(request) {
   //    console.log('bb ~ route.js ~ request:', request);
   //    const { searchTerm, userId } = request.query;
   const searchParams = new URL(request.url).searchParams;
   const searchTerm = searchParams.get('searchTerm');
   const userId = searchParams.get('userId');
   // const types = searchParams.get('types');
   console.log('bb ~ { searchTerm, userId }:', { searchTerm, userId });
   console.log(
      "bb ~ request.headers.get('Authorization'):",
      request.headers.get('Authorization')
   );

   try {
      // send request to server
      const response = await axiosInstance.get('http://localhost:3000/search', {
         headers: {
            'Content-Type': 'application/json',
            Authorization: request.headers.get('Authorization')
         },
         params: {
            userId,
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
