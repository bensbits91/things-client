import { truncateString } from '@/app/utils/stringUtils';
import styles from './TruncatedString.module.css';
import { classNames } from '@/app/utils/classNames';

const TruncatedString = ({ str, num, showTooltip = false }) => {
   const { newString, wasTruncated } = truncateString(str, num);

   if (wasTruncated) {
      return (
         <span
            className={classNames('truncated', showTooltip && styles.tooltip)}
            data-title={str}>
            {newString}
         </span>
      );
   }
   return <span>{str}</span>;
};

export default TruncatedString;
