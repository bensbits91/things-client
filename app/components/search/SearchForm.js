'use client';
import { useState } from 'react';
import useSearchStore from '../../store/searchStore';

export default function SearchForm() {
   const [query, setQuery] = useState('');
   const { setSearchTerm } = useSearchStore();

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
      </div>
   );
}
