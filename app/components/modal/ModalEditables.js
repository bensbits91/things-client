import { Rating } from '@/app/components/rating';
import { Dropdown } from '@/app/components/dropdown';
import styles from './ModalEditables.module.css';

const ModalEditables = ({
   rating,
   status,
   statusOptions,
   handleRatingEdit,
   handleStatusEdit
}) => {
   return (
      <div className={styles.wrap}>
         <Rating rating={rating} editable handleEdit={handleRatingEdit} />
         <Dropdown
            options={statusOptions}
            initialSelection={status}
            placeholder="What's your status?"
            onSelect={handleStatusEdit}
         />
      </div>
   );
};

export default ModalEditables;
