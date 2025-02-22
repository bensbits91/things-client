import axiosInstance from '@/app/utils/axiosInstance';

export const getThingsFromDb = async () => {
   try {
      const res = await axiosInstance.get('/api/things');
      return res.data;
   } catch (error) {
      if (error.response) {
         // The request was made and the server responded with a status code
         // that falls out of the range of 2xx
         console.error(
            'Failed to get things in services/things.js:',
            error.response.data
         );
      } else if (error.request) {
         // The request was made but no response was received
         console.error(
            'Failed to get things in services/things.js: No response received',
            error.request
         );
      } else {
         // Something happened in setting up the request that triggered an Error
         console.error('Failed to get things in services/things.js:', error.message);
      }
      return null;
   }
};

export const checkDetailExistsInDb = async externalId => {
   try {
      const response = await axiosInstance.get(`/api/details?externalId=${externalId}`);
      return response.data;
   } catch (error) {
      console.error('Error checking detail:', error);
      return null;
   }
};

export const addDetailToDb = async detail => {
   try {
      const response = await axiosInstance.post('/api/details', { detail });
      return response.data;
   } catch (error) {
      console.error('Error adding detail:', error);
      return null;
   }
};

export const addThingToDb = async (detail, detailId) => {
   try {
      const thingToAdd = {
         name: detail.name,
         detail_id: detailId
      };
      const response = await axiosInstance.post('/api/things', thingToAdd);
      return response.data;
   } catch (error) {
      console.error('Error adding thing:', error);
      throw error;
   }
};
