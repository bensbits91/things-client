import { NextResponse } from 'next/server';
import axiosInstance from '../../utils/axiosInstance';
import { auth0 } from '@/lib/auth0';

export async function GET(request) {
   const searchParams = new URL(request.url).searchParams;
   const externalId = searchParams.get('externalId');
   // const types = searchParams.get('types');

   const session = await auth0.getSession();
   const { accessToken } = session.tokenSet;

   try {
      // send request to server
      const response = await axiosInstance.get(
         `http://localhost:3000/detail/external/${externalId}`,
         {
            headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${accessToken}`
            }
         }
      );

      return NextResponse.json(response.data);
   } catch (error) {
      if (error.response && error.response.status === 404) {
         console.log('Detail not found, returning null');
         return NextResponse.json(null /* , { status: 404 } */); // todo: is this the best way to handle expected 404?
      } else {
         console.error('Error forwarding POST request:', error);
         return NextResponse.json(
            { message: 'Error forwarding POST request', details: error },
            { status: 500 }
         );
      }
   }
}

export async function POST(request) {
   const { detail } = await request.json();
   const {
      tokenSet: { accessToken }
   } = await auth0.getSession(); // todo: replace everywhere (or create getAccessTokenFromSession util)

   try {
      // send request to server
      const response = await axiosInstance.post(
         'http://localhost:3000/detail',
         {
            detail
         },
         {
            headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${accessToken}`
            }
         }
      );

      return NextResponse.json(response.data);
   } catch (error) {
      console.error('Error forwarding POST request:', error);
      return NextResponse.json(
         { message: 'Error forwarding POST request', details: error },
         { status: 500 }
      );
   }
}
