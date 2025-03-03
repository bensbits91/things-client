import styles from './Overlay.module.css';
import { classNames } from '@/app/utils/classNames';

const Overlay = ({ shadow = false, hide = true, handleClick }) => {
   return (
      <div
         className={classNames(
            styles.overlay,
            shadow && styles.shadow,
            hide && styles.hide
         )}
         onClick={handleClick}
      />
   );
};

export default Overlay;
