import { Button } from '@/app/components/button';
import { AddIcon } from '@/app/components/icons';
import styles from './ModalMenu.module.css';

const ModalMenu = ({ actions = [], userHasThing }) => (
   <div className={styles.menu}>
      {actions.map(action =>
         userHasThing && action.altText ? (
            <span key={action.key}>{action.altText}</span>
         ) : (
            <Button key={action.key} linkStyle onClick={action.onClick}>
               <div className={styles.buttonContent}>
                  <div className={styles.iconWrapper}>
                     <AddIcon />
                  </div>
                  {action.label}
               </div>
            </Button>
         )
      )}
   </div>
);

export default ModalMenu;
