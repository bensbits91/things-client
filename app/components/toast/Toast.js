import { useEffect, useState } from 'react';
import { Heading } from '@/app/components/typography';
import { Text } from '@/app/components/typography';
import { Button } from '@/app/components/button';
import { CloseIcon, WarnIcon, SuccessIcon, ErrorIcon, InfoIcon } from '../icons';
import styles from './Toast.module.css';
import { classNames } from '@/app/utils/classNames';

const Toast = ({ heading, message, variant = '', onClose }) => {
   const [isVisible, setIsVisible] = useState(false);
   const [isClosing, setIsClosing] = useState(false);

   useEffect(() => {
      if (message) {
         setIsVisible(true);
      } else {
         setIsClosing(true);
      }
   }, [message]);

   if (!message && !isClosing) return null;

   const handleClose = () => {
      setIsClosing(true);
      setTimeout(() => {
         onClose();
      }, 300);
   };

   useEffect(() => {
      const timer = setTimeout(() => {
         handleClose();
      }, 5000); // Auto close after delay

      return () => clearTimeout(timer);
   }, [handleClose]);

   const icons = {
      success: <SuccessIcon />,
      warning: <WarnIcon />,
      info: <InfoIcon />,
      error: <ErrorIcon />
   };

   return (
      <div
         className={classNames(
            styles.toast,
            'willAppearFromRight',
            isVisible && !isClosing && 'slideLeftShow',
            isClosing && 'slideRightHide',
            variant === 'success' && styles.success,
            variant === 'warning' && styles.warning,
            variant === 'info' && styles.info,
            variant === 'error' && styles.error
         )}>
         {variant && <div className={styles.iconWrapper}>{icons[variant]}</div>}
         <div className={styles.content}>
            <Heading level='3'>{heading}</Heading>
            <Text>{message}</Text>
         </div>
         <div className={styles.buttonWrapper}>
            <Button closeButton onClick={handleClose}>
               <CloseIcon />
            </Button>
         </div>
      </div>
   );
};

export default Toast;
