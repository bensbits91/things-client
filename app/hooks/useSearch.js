import { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

const useSearch = () => {
   const [searchResults, setSearchResults] = useState({}); // currently storing results local to this page, will not persists on navigation
   const [searchTerm, setSearchTerm] = useState('');
   const [isSearching, setIsSearching] = useState(false);
   const [isDone, setIsDone] = useState(false);
   const [errorData, setErrorData] = useState(null);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [modalData, setModalData] = useState(null);

   const sendSearch = async searchTerm => {
      try {
         const response = await axiosInstance.get('/api/search', {
            params: { searchTerm }
         });
         return response.data;
      } catch (error) {
         console.error(error);
      }
   };

   return {
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
   };
};

export default useSearch;
