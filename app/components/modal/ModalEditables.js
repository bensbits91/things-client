import { Rating } from '@/app/components/rating';
import { Dropdown } from '@/app/components/dropdown';
import { NumberInput } from '@/app/components/number';
import styles from './ModalEditables.module.css';

const ModalEditables = ({
   rating,
   status,
   statusOptions,
   times,
   handleRatingEdit,
   handleStatusEdit,
   handleTimesEdit
}) => {
   return (
      <div className={styles.wrap}>
         <Rating rating={rating} editable handleEdit={handleRatingEdit} />
         <div className={styles.statusWrap}>
            <Dropdown
               options={statusOptions}
               initialSelection={status}
               placeholder="What's your status?"
               onSelect={handleStatusEdit}
            />
            <NumberInput value={times || 0} handleEdit={handleTimesEdit} />
         </div>
      </div>
   );
};

export default ModalEditables;
