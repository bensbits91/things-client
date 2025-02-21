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

   const actions = [
      {
         key: 'view',
         label: 'View',
         onClick: row => console.log('would show in modal:', row)
      },
      {
         key: 'edit',
         label: 'Edit',
         onClick: (row) => console.log('Edit', row)
      },
      {
         key: 'delete',
         label: 'Delete',
         onClick: (row) => console.log('Delete', row)
      }
   ];

   const { data: things } = useQuery({ // todo: should we set a staleTime and cacheTime?
      queryKey: ['things'],
      queryFn: getThings
   });

   return <Table data={things} columns={columns} actions={actions} />;
};

export default ThingsTable;
