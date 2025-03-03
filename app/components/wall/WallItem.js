import Image from 'next/image';
import { NoImageIcon } from '@/app/components/icons';
import styles from './WallItem.module.css';
import { classNames } from '@/app/utils/classNames';

const WallItem = ({ item, onClick }) => {
   const { name, main_image_url: src } = item;

   const handleClick = () => {
      if (onClick) {
         onClick(item);
      }
   };

   return (
      <div
         className={classNames(styles.imageWrapper, onClick && styles.clickable)}
         onClick={handleClick}>
         {src ? <Image src={src} alt={name} fill sizes='100px' /> : <NoImageIcon />}
      </div>
   );
};

export default WallItem;
