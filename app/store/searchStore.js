import { create } from 'zustand';

const useSearchStore = create(set => ({
   searchTerm: '',
   setSearchTerm: searchTerm => set({ searchTerm })
}));

export default useSearchStore;
