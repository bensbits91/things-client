import { truncateString } from '@/app/utils/stringUtils';
import styles from './TruncatedString.module.css';

const TruncatedString = ({ str, num }) => {
   const { newString, wasTruncated } = truncateString(str, num);

   if (wasTruncated) {
      return (
         <span className={styles.tooltip} data-title={str}>
            {newString}
         </span>
      );
   }
   return <span>{str}</span>;
};

export default TruncatedString;
