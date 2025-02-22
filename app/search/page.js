import { SearchForm, SearchTable, SearchModal } from '../components/search';

const SearchPage = () => {
   return (
      <div>
         <h1>Search for a Thing</h1>
         <SearchForm />
         <SearchTable />
         <SearchModal />
      </div>
   );
};

export default SearchPage;
