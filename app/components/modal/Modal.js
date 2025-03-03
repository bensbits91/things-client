import { useEffect, useState } from 'react';
import { useStatuses } from '@/app/hooks/useStatuses';
import ModalHeader from './ModalHeader';
import ModalMenu from './ModalMenu';
import ModalEditables from './ModalEditables';
import ModalImage from './ModalImage';
import ModalDetails from './ModalDetails';
import { Overlay } from '@/app/components//overlay';
import styles from './Modal.module.css';
import { classNames } from '@/app/utils/classNames';

const Modal = ({ modalData, actions = [], handleCloseModal, handleEdit = null }) => {
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
      status,
      // statusText,
      times,
      review,
      notes,
      main_image_url,
      description,
      type,
      genres,
      country,
      language,
      date,
      userHasThing = true
   } = modalData || {};

   const {
      data: statuses,
      isLoading: isLoadingStatuses,
      isError: isErrorStatuses
   } = useStatuses();
   const typeStatuses = statuses ? statuses[type] : {};

   const statusOptions = Object.entries(typeStatuses).map(([key, value]) => ({
      value: parseInt(key), // Object.entries converts keys to strings, but we need integers
      label: value
   }));

   const handleClose = () => {
      setIsClosing(true);
      setTimeout(() => {
         handleCloseModal();
      }, 300);
   };

   const handleRatingEdit = newRating => {
      if (handleEdit) {
         const newItem = { ...modalData, rating: newRating };
         handleEdit(newItem);
      }
   };

   const handleStatusEdit = selectedStatus => {
      if (handleEdit) {
         const newItem = { ...modalData, status: selectedStatus.value };
         handleEdit(newItem);
      }
   };

   const handleTimesEdit = newTimes => {
      if (handleEdit) {
         const newItem = { ...modalData, times: newTimes };
         handleEdit(newItem);
      }
   };

   return (
      <>
         <Overlay shadow hide={isClosing} handleClick={handleClose} />
         <div
            className={classNames(
               styles.modal,
               isVisible && 'hasOverlay',
               'willAppearFromBottom',
               isVisible && !isClosing && 'slideUpShow',
               isClosing && 'slideDownHide'
            )}>
            <ModalHeader headingText={name} handleClose={handleClose} />
            <div className={styles.content}>
               <div className={styles.hero}>
                  <ModalImage imgUrl={main_image_url} altText={name} />
                  <div>
                     <ModalMenu actions={actions} userHasThing={userHasThing} />
                     {userHasThing && (
                        <ModalEditables
                           rating={rating}
                           status={status}
                           times={times}
                           statusOptions={statusOptions}
                           handleRatingEdit={handleRatingEdit}
                           handleStatusEdit={handleStatusEdit}
                           handleTimesEdit={handleTimesEdit}
                        />
                     )}
                     <ModalDetails
                        type={type}
                        country={country}
                        language={language}
                        date={date}
                        genres={genres}
                        description={description}
                     />
                  </div>
               </div>
               <div>Review</div>
               <div>Notes</div>
            </div>
         </div>
      </>
   );
};

export default Modal;
