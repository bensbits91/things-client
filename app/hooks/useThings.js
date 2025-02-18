// 'use client';
import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import useAuth from './useAuth';

const useThings = () => {
   const { isAuthenticated, getAccessTokenSilently, userInfo } = useAuth();
   const [things, setThings] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState(null);
   // console.log('bb ~ useThings.js ~ things:', things);

   useEffect(() => {
      const fetchThings = async () => {
         if (!isAuthenticated || !userInfo) {
            setError('User is not authenticated or user info is not available');
            return;
         }

         setIsLoading(true);

         try {
            console.log('bb ~ useThings.js ~ userInfo:', userInfo);
            const token = await getAccessTokenSilently();
            console.log('bb ~ token:', token);

            const response = await axiosInstance.get('/api/things', {
               headers: {
                  Authorization: `Bearer ${token}`
               },
               params: {
                  userId: userInfo.sub // including userId to support search history
               }
            });
            console.log('bb ~ response:', response);

            setThings(response.data);
         } catch (error) {
            console.error(error);
            setError('Error fetching things');
         } finally {
            setIsLoading(false);
         }
      };

      fetchThings();
   }, [isAuthenticated, userInfo, getAccessTokenSilently]);

   return { things, isLoading, error };
};

export default useThings;
