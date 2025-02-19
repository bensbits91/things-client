'use client';
import useSearch from '../hooks/useSearch';
import { SearchTable } from '../components/search';

const SearchPage = () => {
   const {
      sendSearch,
      searchResults,
      setSearchResults,
      searchTerm,
      setSearchTerm,
      isSearching,
      setIsSearching,
      isDone,
      setIsDone,
      errorData,
      setErrorData,
      isModalOpen,
      setIsModalOpen,
      modalData,
      setModalData
   } = useSearch();

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
         const data = await sendSearch(searchTerm);
         console.log('bb ~ page.js ~ data:', data);

         // store in local state for now, zustand later maybe, so it persists on navigation
         setSearchResults({ ...searchResults, [searchTerm]: data });
         setIsDone(true);
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
      const searchResultsData = searchResults[searchTerm];
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

export default SearchPage;
