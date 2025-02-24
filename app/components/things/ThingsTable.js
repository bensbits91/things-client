'use client';
import { useThings } from '@/app/hooks/things';
import { Table } from '@/app/components/table';
import { Loading } from '@/app/components/loading';

const ThingsTable = () => {
   const { data: things, isLoading, isError } = useThings();

   if (isLoading) {
      return <Loading />;
   }

   if (isError) {
      return <p>Error loading things.</p>;
   }

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
         onClick: row => console.log('Edit', row)
      },
      {
         key: 'delete',
         label: 'Delete',
         onClick: row => console.log('Delete', row)
      }
   ];

   return <Table data={things} columns={columns} actions={actions} />;
};

export default ThingsTable;
