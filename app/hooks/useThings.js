import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';

const useThings = () => {
   const [things, setThings] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState(null);

   useEffect(() => {
      const fetchThings = async () => {
         setIsLoading(true);

         try {
            const response = await axiosInstance.get('/api/things');

            setThings(response.data);
         } catch (error) {
            console.error(error);
            setError('Error fetching things');
         } finally {
            setIsLoading(false);
         }
      };

      fetchThings();
   }, []);

   return { things, isLoading, error };
};

export default useThings;
