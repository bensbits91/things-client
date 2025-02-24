import styles from './Toast.module.css';
import { useEffect } from 'react';

const Toast = ({ message, onClose }) => {
   useEffect(() => {
      const timer = setTimeout(() => {
         onClose();
      }, 7000); // Auto close after 3 seconds

      return () => clearTimeout(timer);
   }, [onClose]);

   return (
      <div className={styles.toast}>
         <p>{message}</p>
         <button onClick={onClose}>Close</button>
      </div>
   );
};

export default Toast;
