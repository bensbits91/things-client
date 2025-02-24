import axiosInstance from '@/app/utils/axiosInstance';

export const checkDetailExistsInDb = async externalId => {
    console.log('bb ~ details.js:4 ~ externalId:', externalId);
   try {
      const response = await axiosInstance.get(`/api/details?externalId=${externalId}`);
      console.log('bb ~ details.js:7 ~ response.data:', response.data);
      return response.data;
   } catch (error) {
      console.error('Error checking detail:', error);
      return null; // todo: should we throw here? what if the detail does exist and the error is something else?
   }
};

export const addDetailToDb = async detail => {
   const response = await axiosInstance.post('/api/details', { detail });
   return response.data;
};
