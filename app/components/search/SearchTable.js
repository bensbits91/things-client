import { Table } from '../table';

export const SearchTable = ({ results, handleViewDetailsClick }) => {
   if (!results || results.length === 0) {
      return <p>No results found.</p>;
   }

   console.log('bb ~ SearchTable.js ~ results:', results);
   // todo: where should we normalize this data?
   //    const { book, movie, tvshow, videogame } = data;
   const columns = [
      { key: 'name', label: 'Name' },
      //   { key: 'title', label: 'Title' },
      { key: 'type', label: 'Type' }
   ];

   const actions = [
      {
         label: 'View Details',
         onClick: id => handleViewDetailsClick(id)
      },
      {
         label: 'Add to List',
         onClick: id => console.log('would add to list:', id)
      }
   ];

   return <Table data={results} columns={columns} actions={actions} />;
};

export default SearchTable;
