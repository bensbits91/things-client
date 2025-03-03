import { TypeIcon } from '@/app/components/icons';
import styles from './ModalDetails.module.css';

const ModalDetails = ({ type, country, language, date, genres, description }) => {
   return (
      <div className={styles.details}>
         <div className={styles.infoBar}>
            <div className={styles.iconWrapper}>
               <TypeIcon type={type} />
            </div>
            <div>{country}</div>
            <div>{language}</div>
            <div>{date}</div>
            <div title='genres'>{genres?.join(', ')}</div>
         </div>
         <div>{description}</div>
      </div>
   );
};

export default ModalDetails;
