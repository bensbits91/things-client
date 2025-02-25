import { Button } from '@/app/components/button';
import styles from './Modal.module.css';

const ModalMenu = ({ actions = [], userHasThing }) => (
   <div className={styles.menu}>
      {actions.map(action =>
         userHasThing && action.altText ? (
            <span key={action.key}>{action.altText}</span>
         ) : (
            <Button key={action.key} onClick={action.onClick}>
               {action.label}
            </Button>
         )
      )}
   </div>
);

export default ModalMenu;
