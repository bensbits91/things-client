import Image from 'next/image';
import { NoImageIcon } from '@/app/components/icons';
import styles from './ModalImage.module.css';

const ModalImage = ({ imgUrl, altText }) => {
   return (
      <div className={styles.imageWrapper}>
         {imgUrl ? (
            <Image
               src={imgUrl}
               alt={altText}
               fill
               sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            />
         ) : (
            <NoImageIcon />
         )}
      </div>
   );
};

export default ModalImage;
