import axiosInstance from '@/app/utils/axiosInstance';

export const getStatusesFromDb = async () => {
   try {
      const res = await axiosInstance.get('/api/statuses');
      return res.data;
   } catch (error) {
      console.error('Failed to get Statuses in services/statuses.js:', error);
      throw new Error('Failed to get Statuses in services/statuses.js:', error);
   }
};
