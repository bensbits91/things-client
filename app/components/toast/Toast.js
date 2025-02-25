import { useEffect } from 'react';
import { Button } from '@/app/components/button';
import styles from './Toast.module.css';
import { classNames } from '@/app/utils/classNames';

const Toast = ({ message, variant = '', onClose }) => {
   useEffect(() => {
      const timer = setTimeout(() => {
         onClose();
      }, 7000); // Auto close after 3 seconds

      return () => clearTimeout(timer);
   }, [onClose]);

   return (
      <div
         className={classNames(
            styles.toast,
            variant === 'success' && styles.success,
            variant === 'warning' && styles.warning,
            variant === 'info' && styles.info,
            variant === 'error' && styles.error
         )}>
         <p>{message}</p>
         {/* <button onClick={onClose}>x</button> */}
         <Button closeButton onClick={onClose}>
            x
         </Button>
      </div>
   );
};

export default Toast;
