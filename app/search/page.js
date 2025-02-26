import { SearchForm } from '@/app/components/search';
import { Heading } from '@/app/components/typography';

const SearchPage = () => {
   return (
      <div>
         <Heading level='1'>Search for a Thing</Heading>
         <SearchForm />
      </div>
   );
};

export default SearchPage;
