import styles from './Modal.module.css';

const ModalMenu = ({ actions = [], userHasThing }) => (
   <div className={styles.modalMenu}>
      {actions.map(action =>
         userHasThing && action.altText ? (
            <span key={action.key}>{action.altText}</span>
         ) : (
            <button key={action.key} onClick={action.onClick}>
               {action.label}
            </button>
         )
      )}
   </div>
);

export default ModalMenu;
