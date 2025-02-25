import { useEffect, useState } from 'react';
import Image from 'next/image';
import ModalMenu from './ModalMenu';
import { Button } from '@/app/components/button';
import styles from './Modal.module.css';
import { classNames } from '@/app/utils/classNames';

const Modal = ({ modalData, actions = [], handleCloseModal }) => {
   const [isVisible, setIsVisible] = useState(false);
   const [isClosing, setIsClosing] = useState(false);

   useEffect(() => {
      if (modalData) {
         setIsVisible(true);
      } else {
         setIsClosing(true);
      }
   }, [modalData]);

   if (!modalData && !isClosing) return null;

   const {
      name,
      rating,
      statusText,
      review,
      notes,
      main_image_url,
      description,
      type,
      genres,
      country,
      language,
      date,
      userHasThing // only applicable in SearchTable
   } = modalData || {};

   const handleClose = () => {
      setIsClosing(true);
      setTimeout(() => {
         handleCloseModal();
      }, 300);
   };

   const Editables = () => {
      return (
         <div>
            <div>{rating}</div>
            <div>{statusText}</div>
         </div>
      );
   };

   return (
      <>
         <div
            className={classNames(
               styles.overlay,
               isClosing && styles.hide
            )}
            onClick={handleClose}
         />
         <div
            className={classNames(
               styles.modal,
               isVisible && 'hasOverlay',
               isVisible && !isClosing && styles.slideUpShow,
               isClosing && styles.slideDownHide
            )}>
            <div className={styles.header}>
               <h1>{name}</h1>
               <Button closeButton onClick={handleClose}>
                  x
               </Button>
            </div>
            <div className={styles.content}>
               <div className={styles.hero}>
                  {main_image_url && (
                     <div className={styles.imageWrapper}>
                        <Image
                           src={main_image_url}
                           alt={name}
                           fill
                           sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                        />
                     </div>
                  )}
                  <div>
                     <ModalMenu actions={actions} userHasThing={userHasThing} />
                     <Editables />
                     <div className={styles.details}>
                        <div>{description}</div>
                        <div>{type}</div>
                        <div>Genres: {genres?.join(', ')}</div>
                        <div>{country}</div>
                        <div>{language}</div>
                        <div>{date}</div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default Modal;
