// 'use client';
import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

// todo: do I like this pattern? What are the benefits?
// Seems like I import everything from useThing instead of just the functions I need

const useThing = () => {
   const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();
   const [userInfo, setUserInfo] = useState(null);
   const [things, setThings] = useState([]);
   console.log('bb ~ useThing.js ~ things:', things);

   useEffect(() => {
      if (isAuthenticated && user) {
         setUserInfo(user);
      }
   }, [isAuthenticated, user]);

   const addThing = async name => {
      console.log('bb ~ name:', name);
      if (!isAuthenticated || !userInfo) {
         console.error(
            'User is not authenticated or user info is not available'
         );
         return;
      }

      try {
         const token = await getAccessTokenSilently();
         console.log('bb ~ token:', token);
         const response = await axios.post(
            '/api/things',
            {
               name,
               userId: userInfo.sub
            },
            {
               headers: {
                  Authorization: `Bearer ${token}`
               }
            }
         );
         console.log('bb ~ response:', response);
         return response.data;
      } catch (error) {
         console.error(error);
         throw error;
      }
   };

   useEffect(() => {
      const fetchThings = async () => {
         if (userInfo) {
            try {
               console.log('bb ~ useThing.js ~ userInfo:', userInfo);
               const token = await getAccessTokenSilently();
               console.log('bb ~ token:', token);
               const response = await axios.get('/api/things', {
                  headers: {
                     Authorization: `Bearer ${token}`
                  },
                  params: {
                     userId: userInfo.sub
                  }
               });
               console.log('bb ~ response:', response);
               setThings(response.data);
            } catch (error) {
               console.error(error);
            }
         }
      };

      fetchThings();
   }, [userInfo]);

   return { addThing, things, userInfo };
};

export default useThing;
