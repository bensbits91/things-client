// 'use client';
import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axiosInstance from '../utils/axiosInstance';

// todo: do I like this pattern? What are the benefits?
// Seems like I import everything from useSearch instead of just the functions I need

// TODO: NOW: WHY TF AM I IMPORTING useAuth0 FROM @auth0/auth0-react INSTEAD OF FROM MY OWN useAuth.js FILE?

const useSearch = () => {
   const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();
   const [userInfo, setUserInfo] = useState(null);

   useEffect(() => {
      if (isAuthenticated && user) {
         setUserInfo(user);
      }
   }, [isAuthenticated, user]);

   const sendSearch = async searchTerm => {
      console.log('bb ~ useSearch.js ~ searchTerm:', searchTerm);
      if (userInfo) {
         try {
            console.log('bb ~ useSearch.js ~ userInfo:', userInfo);
            const token = await getAccessTokenSilently();
            console.log('bb ~ token:', token);
            const response = await axiosInstance.get('/api/search', {
               headers: {
                  Authorization: `Bearer ${token}`
               },
               params: {
                  userId: userInfo.sub,
                  searchTerm
               }
            });
            console.log('bb ~ response:', response);
            return response.data;
         } catch (error) {
            console.error(error);
         }
      }
   };

   return { sendSearch, userInfo };
};

export default useSearch;
