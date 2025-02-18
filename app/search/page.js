'use client';
import { useState } from 'react';
import useSearch from '../hooks/useSearch';
// import useSearchStore from '../store/useSearchStore';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import { SearchTable } from '../components/search';

const NewPage = () => {
   const { sendSearch } = useSearch();
   //   const { searchResults, setSearchResults } = useSearchStore(); // todo: use zustand
   const [searchResults, setSearchResults] = useState({}); // currently storing results local to this page, will not persists on navigation
   //    console.log('bb ~ page.js ~ searchResults:', searchResults);
   const [searchTerm, setSearchTerm] = useState('');
   const [isSearching, setIsSearching] = useState(false);
   const [isDone, setIsDone] = useState(false);
   const [errorData, setErrorData] = useState(null);

   const [isModalOpen, setIsModalOpen] = useState(false);
   const [modalData, setModalData] = useState(null);

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
         setSearchResults({ ...searchResults, [searchTerm]: data });
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

   const handleModalClose = () => {
      setIsModalOpen(false);
   };

   const handleModalOpen = () => {
      setIsModalOpen(true);
   };

   const handleViewDetailsClick = id => {
      console.log('View details for:', id);
      const searchResultsData = searchResults[searchTerm];
      console.log('bb ~ page.js ~ searchResults:', searchResults);
      console.log('bb ~ page.js ~ searchResultsData:', searchResultsData);
      // todo: where should we normalize this data?
    //   const modalSearchResults =
    //      searchResultsData.results || searchResultsData.tmdb.results || [];

      const currentModalData = searchResultsData.find(result => result.data.id === id); // todo: normalize id?

      handleModalOpen();
      setModalData(currentModalData);
   };

   const Modal = () => {
      return (
         <div
            style={{
               position: 'fixed',
               top: 40,
               left: 40,
               right: 40,
               bottom: 40,
               padding: 40,
               overflow: 'auto',
               display: isModalOpen ? 'block' : 'none',
               backgroundColor: '#333'
            }}>
            <h1>Modal</h1>
            <button onClick={handleModalClose}>Close</button>
            {modalData ? <div>{JSON.stringify(modalData)}</div> : <div>Loading...</div>}
         </div>
      );
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
         {isSearching && <div>Searching...</div>}
         {isDone && <div>Done!</div>}
         {errorData && <div>Error: {errorData.message}</div>}
         {searchResults[searchTerm] && (
            <SearchTable
               data={searchResults[searchTerm]}
               handleViewDetailsClick={handleViewDetailsClick}
            />
         )}
         <Modal />
      </div>
   );
};

export default withAuthenticationRequired(NewPage);
