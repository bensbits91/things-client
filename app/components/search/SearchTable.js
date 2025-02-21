import { Table } from '../table';

export const SearchTable = ({ results, handleViewDetailsClick, handleAddThingClick }) => {
   if (!results || results.length === 0) {
      return <p>No results found.</p>;
   }

   const columns = [
      { key: 'name', label: 'Name' },
      //   { key: 'title', label: 'Title' },
      { key: 'type', label: 'Type' }
   ];

   const actions = [
      {
         label: 'View Details',
         onClick: row => handleViewDetailsClick(row.external_id)
      },
      {
         label: 'Add to List',
         onClick: row => handleAddThingClick(row.external_id)
      }
   ];

   return <Table data={results} columns={columns} actions={actions} />;
};

export default SearchTable;
