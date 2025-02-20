'use client';
import { Table } from '../table';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/app/utils/axiosInstance';

const getThings = async () => {
   try {
      const res = await axiosInstance.get('/api/things');
      return res.data;
   } catch (error) {
      console.error(
         'Failed to load things in Table.js:',
         error.response ? error.response.data : error.message
      );
      return null;
   }
};

const ThingsTable = () => {
   const columns = [
      { key: 'name', label: 'Name' }
      //   { key: 'type', label: 'Type' }
   ];

   const { data: things } = useQuery({
      queryKey: ['things'],
      queryFn: getThings
   });

   return <Table data={things} columns={columns} />;
};

export default ThingsTable;
