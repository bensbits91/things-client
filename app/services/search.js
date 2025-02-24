import axiosInstance from '@/app/utils/axiosInstance';

export const getSearch = async searchTerm => {
   const response = await axiosInstance.get(`/api/search?searchTerm=${searchTerm}`);
   return response.data;
};
