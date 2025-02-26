'use client';
import { useState } from 'react';
import { SearchTable } from './SearchTable';
import { Text } from '@/app/components/typography';
import { Button } from '@/app/components/button';

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
            <Button type='submit' linkStyle>
               Search for details
            </Button>
            <Button
               type='button'
               linkStyle
               onClick={() => console.log('would add thing with just a name')}>
               Add without details
            </Button>
         </form>
         {!query && (
            <div>
               <Text>Start typing to get started</Text>
            </div>
         )}
         {query && !searchTerm && (
            <div>
               <Text>Click the button to get started</Text>
            </div>
         )}
         {searchTerm && <SearchTable searchTerm={searchTerm} />}
      </div>
   );
}
