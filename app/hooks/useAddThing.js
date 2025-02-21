import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import useAuth from './useAuth';

const useAddThing = () => {
   const { isAuthenticated, getAccessTokenSilently, userInfo } = useAuth();
   const [isAdding, setIsAdding] = useState(false);
   const [error, setError] = useState(null);

   const addThing = async data => {
      if (!isAuthenticated || !userInfo) {
         setError('User is not authenticated or user info is not available');
         return;
      }

      setIsAdding(true);

      try {
         const { name, type } = data;
         const token = await getAccessTokenSilently();
         const response = await axiosInstance.post(
            '/api/things',
            {
               ...data,
               userId: userInfo.sub
            },
            {
               headers: {
                  Authorization: `Bearer ${token}`
               }
            }
         );

         return response.data;
      } catch (error) {
         console.error(error);
         throw error;
      } finally {
         setIsAdding(false);
      }
   };

   return { addThing, /* userInfo,  */ isAdding, error };
};

export default useAddThing;
