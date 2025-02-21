'use client';
import { Table } from '../table';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/app/utils/axiosInstance';

const getThings = async () => {
   // todo: import
   try {
      const res = await axiosInstance.get('/api/things');
      return res.data;
   } catch (error) {
      console.error(
         'Failed to load things in SearchTable.js:',
         error.response ? error.response.data : error.message
      );
      return null;
   }
};

export const SearchTable = ({ results, handleViewDetailsClick, handleAddThingClick }) => {
   if (!results || results.length === 0) {
      return <p>No results found.</p>;
   }

   const {
      data: things,
      isLoading,
      isError
   } = useQuery({
      queryKey: ['things'],
      queryFn: getThings,
      staleTime: 1000 * 60 * 60 * 5, // 5 hours
      cacheTime: 1000 * 60 * 60 * 10 // 10 hours
   });

   const reultsWithIndicator = results.map(result => {
      const userHasThing =
         things &&
         Array.isArray(things) &&
         things.some(thing => {
            const thingExternalId = thing.details[0]?.external_id;
            const resultExternalId = result.external_id.toString();
            const hasit = thingExternalId === resultExternalId;
            return hasit;
         });
      return { ...result, userHasThing: userHasThing };
   });

   const columns = [
      { key: 'name', label: 'Name' },
      //   { key: 'title', label: 'Title' },
      { key: 'type', label: 'Type' },
      // { key: 'userHasThing', label: 'you have it already' }
   ];

   const actions = [
      {
         label: 'View Details',
         onClick: row => handleViewDetailsClick(row.external_id)
      },
      {
         label: 'Add to List',
         onClick: row => handleAddThingClick(row.external_id),
         altText: 'In list'
      }
   ];

   return <Table data={reultsWithIndicator} columns={columns} actions={actions} />;
};

export default SearchTable;
