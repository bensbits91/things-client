const ModalMenu = ({ actions = [], externalId, passItBack }) => {
   console.log('bb ~ ModalMenu.js ~ actions:', actions);
   console.log('bb ~ ModalMenu.js:13 ~ ModalMenu ~ externalId:', externalId);

   const handleClick = (action, externalId, passItBack) => {
      console.log('bb ~ ModalMenu.js:16 ~ handleClick ~ action:', action);
      console.log('bb ~ ModalMenu.js:16 ~ handleClick ~ externalId:', externalId);
      if (action.key === 'returnExternalId') {
         passItBack(externalId);
      } else {
         action.onClick();
      }
   };

   return (
      <div>
         {actions.map(action => (
            <button
               key={action.key}
               onClick={() => {
                  handleClick(action);
               }}>
               {action.label}
            </button>
         ))}
      </div>
   );
};

export default ModalMenu;
