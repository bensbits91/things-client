import { Button } from '@/app/components/button';

const ActionCell = ({ row, action }) => {
   return (
      <td>
         {row.userHasThing && action.altText ? (
            <>{action.altText}</>
         ) : (
            <Button
               linkStyle
               disabled={row.userHasThing && action.label === 'Add to List'} // todo: hacky fallback in case user doesn't have thing and no altText is provided
               onClick={e => {
                  console.log('bb ~ Table.js ~ row:', row);
                  action.onClick(row);
               }}>
               {action.label}
            </Button>
         )}
      </td>
   );
};

export default ActionCell;
