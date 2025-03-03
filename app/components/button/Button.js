import { classNames } from '@/app/utils/classNames';
import styles from './Button.module.css';

const Button = ({ children, linkStyle, closeButton, noBorder, ...props }) => {
   return (
      <button
         className={classNames(
            styles.button,
            noBorder && styles.noBorder,
            closeButton && styles.closeButton,
            linkStyle && styles.linkStyle
         )}
         {...props}>
         {children}
      </button>
   );
};

export default Button;
