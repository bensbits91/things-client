import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request) {
   //    console.log('bb ~ route.js ~ request:', request);
   //    const { searchTerm, userId } = request.query;
   const searchParams = new URL(request.url).searchParams;
   const searchTerm = searchParams.get('searchTerm');
   const userId = searchParams.get('userId');
   console.log('bb ~ { searchTerm, userId }:', { searchTerm, userId });
   console.log(
      "bb ~ request.headers.get('Authorization'):",
      request.headers.get('Authorization')
   );

   try {
      // send request to server
      const response = await axios.get('http://localhost:3000/search', {
         headers: {
            'Content-Type': 'application/json',
            Authorization: request.headers.get('Authorization')
         },
         params: {
            userId,
            searchTerm
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
