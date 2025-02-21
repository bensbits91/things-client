'use client';
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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

   const handleViewDetailsClick = external_id => {
      const cachedData = queryClient.getQueryData(['search', searchTerm]);
      const searchResultsData = cachedData || [];
      const currentModalData = searchResultsData.find(
         result => result.external_id === external_id
      );
      handleModalOpen();
      setModalData(currentModalData);
   };

   const checkDetailExistsInDb = async externalId => {
      try {
         const response = await axiosInstance.get(
            `/api/details?externalId=${externalId}`
         );
         return response.data;
      } catch (error) {
         console.error('Error checking detail:', error);
         return null;
      }
   };

   const addDetailToDatabase = async detail => {
      try {
         const response = await axiosInstance.post('/api/details', { detail });
         return response.data;
      } catch (error) {
         console.error('Error adding detail:', error);
         return null;
      }
   };

   const addThingToDatabase = async (detail, detailId) => {
      try {
         const thingToAdd = {
            name: detail.name,
            detail_id: detailId
         };
         const response = await axiosInstance.post('/api/things', thingToAdd);
         return response.data;
      } catch (error) {
         console.error('Error adding thing:', error);
         return null;
      }
   };

   const handleAddThingClick = async external_id => {
      const cachedData = queryClient.getQueryData(['search', searchTerm]);
      const searchResultsData = cachedData || [];
      const detailToAdd = searchResultsData.find(
         result => result.external_id === external_id
      );

      if (!detailToAdd) {
         console.info('Thing to add not found');
         return;
      }

      // Check if detail already in db
      let detailData = await checkDetailExistsInDb(detailToAdd.external_id);

      // If not, add detail to db and get detail_id
      if (!detailData) {
         detailData = await addDetailToDatabase(detailToAdd);
      }
      const detailId = detailData._id || detailData.id;

      if (!detailData || !detailId) {
         console.error('Failed to get detail ID');
         return;
      }

      // Add thing to db with detail_id
      const addedThing = await addThingToDatabase(detailData, detailId);
      if (addedThing) {
         console.log('Thing added successfully:', addedThing);
         alert('Thing added successfully :)');
         // invalidate things query so new thing appears in user's things list
         queryClient.invalidateQueries({ queryKey: ['things'] });
      }
   };

   const { data, refetch } = useQuery({
      queryKey: ['search', searchTerm],
      queryFn: async () => {
         // if (!searchTerm) return;
         const response = await axiosInstance.get(`/api/search?searchTerm=${searchTerm}`);
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
               onClick={() => console.log('would add thing with just a name')}>
               Add without details
            </button>
         </form>

         <SearchTable
            results={data || []}
            handleViewDetailsClick={handleViewDetailsClick}
            handleAddThingClick={handleAddThingClick}
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
