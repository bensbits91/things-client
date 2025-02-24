'use client';
import { useState } from 'react';
import { SearchTable } from './SearchTable';

export default function SearchForm() {
   const [query, setQuery] = useState('');
   const [searchTerm, setSearchTerm] = useState('');

   const handleSubmit = e => {
      e.preventDefault();
      setSearchTerm(query);
   };

   return (
      <div>
         <form onSubmit={handleSubmit}>
            <label htmlFor='searchTerm'>Thing:</label>
            <input
               type='text'
               id='searchTerm'
               name='searchTerm'
               value={query}
               onChange={e => setQuery(e.target.value)}
               placeholder='Enter search query'
            />
            <button type='submit' style={{ marginLeft: 24 }}>
               Search for details
            </button>
            <button
               style={{ marginLeft: 24 }}
               type='button'
               onClick={() => console.log('would add thing with just a name')}>
               Add without details
            </button>
         </form>
         {!query && <div><p>Start typing to get started</p></div>}
         {query && !searchTerm && <div><p>Click the button to get started</p></div>}
         {searchTerm && <SearchTable searchTerm={searchTerm} />}
      </div>
   );
}
