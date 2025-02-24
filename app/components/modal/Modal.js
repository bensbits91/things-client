import useModalStore from '@/app/store/modalStore';
import ModalMenu from './ModalMenu';
import { Loading } from '@/app/components/loading';

const Modal = ({ actions = [], returnExternalId }) => {
   console.log('bb ~ Modal.js ~ actions:', actions);
   const { isOpen, modalData, closeModal } = useModalStore();
   if (!modalData) return null;
   console.log('bb ~ Modal.js:8 ~ Modal ~ modalData:', modalData);
   const { external_id } = modalData;
   if (!external_id) return null;
   console.log('bb ~ Modal.js:11 ~ Modal ~ external_id:', external_id);

   if (!isOpen) return null;

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
         <ModalMenu actions={actions} externalId={external_id} passItBack={returnExternalId} />
         {modalData ? <div>{JSON.stringify(modalData)}</div> : <Loading />}
      </div>
   );
};
export default Modal;
