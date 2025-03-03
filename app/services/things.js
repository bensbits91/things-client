import axiosInstance from '@/app/utils/axiosInstance';

export const getThingsFromDb = async () => {
   try {
      const res = await axiosInstance.get('/api/things');
      return res.data;
   } catch (error) {
      console.log('bb ~ things.js:8 ~ getThingsFromDb ~ error:', error);
      // const msg =
      //    error.response?.data?.details?.message ||
      //    error.response?.data?.message ||
      //    error.response?.message ||
      //    error.message;
      // if (msg === 'Authorization token expired') {
      if (
         [
            error.response?.data?.details?.message,
            error.response?.data?.message,
            error.response?.message,
            error.message
         ].includes('Authorization token expired')
      ) {
         console.error('Authorization token expired:', error);
         // throw new Error('Authorization token expired', error);
         throw error;
      }
      console.error('Failed to get things in services/things.js:', error);
      throw new Error('Failed to get things in services/things.js:', error);
      // if (error.response) {
      //    // The request was made and the server responded with a status code
      //    // that falls out of the range of 2xx
      //    console.error(
      //       'Failed to get things in services/things.js:',
      //       error.response.data
      //    );
      // } else if (error.request) {
      //    // The request was made but no response was received
      //    console.error(
      //       'Failed to get things in services/things.js: No response received',
      //       error.request
      //    );
      // } else {
      //    // Something happened in setting up the request that triggered an Error
      //    console.error('Failed to get things in services/things.js:', error.message);
      // }
      // return null; // todo: should we throw here?
   }
};

export const addThingToDb = async thingToAdd => {
   if (!thingToAdd || !thingToAdd.name || !thingToAdd.detail_id) {
      throw new Error('Missing required parameters in addThingToDb');
   }
   try {
      const response = await axiosInstance.post('/api/things', thingToAdd);
      return response.data;
   } catch (error) {
      const { status } = error.response || error;
      if (status === 409)
         throw new Error('Conflict error: Thing already exists in DB.', error, status);
      else throw error;
   }
};

// todo: need updateThingInDb
// new thing is in the body
// thing _id is a path paramm