import axiosInstance from '@/app/utils/axiosInstance';

export const getSearch = async searchTerm => {
   console.log('bb ~ search.js ~ searchTerm:', searchTerm);
   const response = await axiosInstance.get(`/api/search?searchTerm=${searchTerm}`);
   return response.data;
};
