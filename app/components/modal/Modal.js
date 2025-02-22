'use client';
import useModalStore from '../../store/modalStore';

const Modal = ({ actions = [] }) => {
   console.log('bb ~ Modal.js ~ actions:', actions);
   const { isOpen, modalType, modalData, closeModal } = useModalStore();

   if (!isOpen || !modalType) return null;

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
            // display: isOpen ? 'block' : 'none', // todo: is this needed?
            // if not, now can we animate the entrance?
            backgroundColor: '#333'
         }}>
         <h1>Modal</h1>
         <button onClick={closeModal}>Close</button>
         {modalData ? <div>{JSON.stringify(modalData)}</div> : <div>Loading...</div>}
      </div>
   );
};
export default Modal;
