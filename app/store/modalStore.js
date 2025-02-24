import { create } from 'zustand';

const useModalStore = create(set => ({
   isOpen: false,
   modalData: null,

   openModal: modalData => set({ isOpen: true, modalData }),
   closeModal: () => set({ isOpen: false, modalData: null })
}));

export default useModalStore;
