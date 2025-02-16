'use client';
import { useState } from 'react';
import axios from 'axios';
import useSearch from '../hooks/useSearch';
// import useSearchStore from '../store/useSearchStore';
import { withAuthenticationRequired } from '@auth0/auth0-react';

const NewPage = () => {
    const { sendSearch } = useSearch();
   //   const { searchResults, setSearchResults } = useSearchStore(); // todo: use zustand
   const [searchResults, setSearchResults] = useState({}); // currently storing results local to this page, will not persists on navigation
   //    console.log('bb ~ page.js ~ searchResults:', searchResults);
   const [searchTerm, setSearchTerm] = useState('');
   const [isSearching, setIsSearching] = useState(false);
   const [isDone, setIsDone] = useState(false);
   const [errorData, setErrorData] = useState(null);

   const handleSubmit = async event => {
      event.preventDefault();

      if (searchResults[searchTerm]) {
         console.log(
            `Using cached results for search term, "${searchTerm}": ${JSON.stringify(
               searchResults[searchTerm]
            )}`
         );
         return;
      }

      try {
         setIsSearching(true);
         // send request to nextjs route
        //  const response = await axios.get(`/api/search?query=${searchTerm}`);
        const data = await sendSearch(searchTerm);
         //  const response = { data: { fakeResults: { asdf: 'qwer' } } };
         console.log('bb ~ page.js ~ data:', data);

         // store in local state for now, zustand later maybe, so it persists on navigation
         setSearchResults({ ...searchResults, [searchTerm]: response.data });
         setIsDone(true);
         //  console.log('Server response:', response.data);
      } catch (error) {
         setErrorData(error);
         console.error('Error fetching search results:', error);
      } finally {
         setIsSearching(false);
      }

      event.target.value = '';
   };

   const handleChange = e => {
      setSearchTerm(e.target.value);
   };

   return (
      <div>
         <h1>Search for a Thing</h1>
         <form type='submit' onSubmit={handleSubmit}>
            <label htmlFor='searchTerm'>Thing:</label>
            <input
               type='text'
               id='searchTerm'
               name='searchTerm'
               onChange={handleChange}
            />
            <button style={{ marginLeft: 24 }} type='submit'>
               Search for details
            </button>
            <button
               style={{ marginLeft: 24 }}
               type='button'
               onClick={() => console.log('would add thing')}>
               Add without details
            </button>
         </form>
      </div>
   );
};

export default withAuthenticationRequired(NewPage);
