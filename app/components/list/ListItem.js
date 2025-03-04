import Image from 'next/image';
import { Rating } from '@/app/components/rating';
import { TypeIcon, NoImageIcon } from '@/app/components/icons';
import { Heading, TruncatedString } from '@/app/components/typography';
import styles from './ListItem.module.css';
import { classNames } from '@/app/utils/classNames';

const ListItem = ({ item, onClick }) => {
   const {
      main_image_url,
      name,
      type,
      description,
      rating,
      statusText,
      country,
      language,
      date,
      genres
   } = item;

   const handleClick = () => {
      if (onClick) {
         onClick(item);
      }
   };

   return (
      <div
         className={classNames(styles.item, onClick && styles.clickable)}
         onClick={handleClick}>
         {main_image_url ? (
            <div className={styles.imageWrapper}>
               <Image src={main_image_url} alt={name} fill sizes='100px' />
            </div>
         ) : (
            <NoImageIcon />
         )}
         <div className={styles.details}>
            <div className={styles.infoBar}>
               <div className={styles.iconWrapper}>
                  <TypeIcon type={type} />
               </div>
               <Heading level={3}>{name}</Heading>
               <div>{country}</div>
               <div>{language}</div>
               <div>{date}</div>
               <div title='genres'>{genres?.join(', ')}</div>
            </div>
            <div>{statusText}</div>
            <Rating rating={rating} />
            <TruncatedString str={description} num={100} />
         </div>
      </div>
   );
};

export default ListItem;
