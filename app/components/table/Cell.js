import Image from 'next/image';
import { Rating } from '@/app/components/rating';
import { TypeIcon, NoImageIcon } from '@/app/components/icons';
import { TruncatedString } from '@/app/components/typography';
import styles from './Cell.module.css';
import { classNames } from '@/app/utils/classNames';

const Cell = ({ row, col }) => {
   const { name, type } = row;
   const { key, columnType, truncateLength, onClick } = col;
   const val = row[key];

   const truncString = truncateLength ? (
      <TruncatedString str={val} num={truncateLength} />
   ) : (
      val
   );

   const colBody =
      columnType === 'image' ? (
         <div className={styles.imageWrapper}>
            {val ? <Image src={val} alt={name} fill sizes='50px' /> : <NoImageIcon />}
         </div>
      ) : columnType === 'icon' && key === 'type' ? (
         <div className={styles.iconWrapper}>
            <TypeIcon type={val} />
         </div>
      ) : columnType === 'rating' ? (
         <Rating rating={val} />
      ) : (
         truncString
      );

   const clickableColBody = onClick ? (
      <td
         key={key}
         className={classNames(styles.td, styles.clickable)}
         onClick={() => onClick(row)}>
         {colBody}
      </td>
   ) : (
      <td key={key} className={styles.td}>
         {colBody}
      </td>
   );

   return clickableColBody;
};

export default Cell;
