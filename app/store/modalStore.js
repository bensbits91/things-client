import { create } from 'zustand';

const useModalStore = create(set => ({
   isOpen: false,
   modalType: null, // thing, search, etc.
   modalData: null,
   itemToSaveId: null, // external id of the item to save
   // todo: is it ok for the SearchTable to call this? it will be using this store already
   // also, is this too complicated? Should we just have a callback for the modal pass the id back
   openModal: (modalType, modalData) => set({ isOpen: true, modalType, modalData }),
   closeModal: () => set({ isOpen: false, modalType: null, modalData: null }),

   setItemToSaveId: id => set({ itemToSaveId: id })
}));

export default useModalStore;
