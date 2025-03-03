import { RepeatIcon } from '@/app/components/icons';
import styles from './NumberInput.module.css';

const NumberInput = ({ value, handleEdit }) => {
   return (
      <div className={styles.wrap}>
         <label htmlFor='times' className={styles.label}>
            <RepeatIcon />
         </label>
         <input
            className={styles.input}
            type='number'
            name='times'
            id='times'
            value={value}
            min='0'
            step='1'
            onChange={e => handleEdit(e.target.value)}
         />
      </div>
   );
};

export default NumberInput;
