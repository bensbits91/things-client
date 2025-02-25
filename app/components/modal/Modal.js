import Image from 'next/image';
import ModalMenu from './ModalMenu';
import styles from './Modal.module.css';

const Modal = ({ modalData, actions = [], handleCloseModal }) => {
   if (!modalData) return <></>;
   const { userHasThing } = modalData;

   return (
      <div className={styles.modal}>
         <div className={styles.header}>
            <h1>{modalData.name}</h1>
            <button onClick={handleCloseModal}>Close</button>
         </div>
         <div className={styles.content}>
            <div className={styles.hero}>
               {modalData.main_image_url && (
                  <div className={styles.imageWrapper}>
                     <Image
                        src={modalData.main_image_url}
                        alt={modalData.name}
                        fill
                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                     />
                  </div>
               )}
               <div>
                  <ModalMenu actions={actions} userHasThing={userHasThing} />
                  <div>{modalData.description}</div>
                  <div>{modalData.type}</div>
                  <div>Genres: {modalData.genres?.join(', ')}</div>
                  <div>{modalData.country}</div>
                  <div>{modalData.language}</div>
                  <div>{modalData.date}</div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Modal;
