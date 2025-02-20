'use client';
import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { SearchTable } from './SearchTable';
import { SearchModal } from './SearchModal';
import axiosInstance from '../../utils/axiosInstance';

export default function SearchForm() {
   const [query, setQuery] = useState('');
   const [searchTerm, setSearchTerm] = useState('');
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [modalData, setModalData] = useState(null);
   const queryClient = useQueryClient();

   const handleModalClose = () => {
      setIsModalOpen(false);
   };

   const handleModalOpen = () => {
      setIsModalOpen(true);
   };

   const handleViewDetailsClick = id => {
      const cachedData = queryClient.getQueryData(['search', searchTerm]);
      const searchResultsData = cachedData || [];
      const currentModalData = searchResultsData.find(result => result.data.id === id); // todo: normalize id?
      handleModalOpen();
      setModalData(currentModalData);
   };

   const { data, refetch } = useQuery({
      queryKey: ['search', searchTerm],
      queryFn: async () => {
         // if (!searchTerm) return;
         const response = await axiosInstance.get(
            `/api/search?searchTerm=${searchTerm}`
         );
         return response.data;
      },
      enabled: false, // Prevents auto-fetching on mount
      staleTime: 1000 * 60 * 60 * 4, // 4 hours // todo: decide on good values
      cacheTime: 1000 * 60 * 60 * 8 // 8 hours
   });

   const handleSubmit = e => {
      e.preventDefault();
      setSearchTerm(query);
   };

   const handleSearch = async () => {
      if (searchTerm) {
         const cachedData = queryClient.getQueryData(['search', searchTerm]);
         if (!cachedData) {
            await refetch();
         }
      }
   };

   useEffect(() => {
      handleSearch();
   }, [searchTerm]);

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
               onClick={() => console.log('would add thing')}>
               Add without details
            </button>
         </form>

         <SearchTable
            results={data || []}
            handleViewDetailsClick={handleViewDetailsClick}
         />
         {setIsModalOpen && (
            <SearchModal
               isModalOpen={isModalOpen}
               modalData={modalData}
               handleModalClose={handleModalClose}
            />
         )}
      </div>
   );
}
