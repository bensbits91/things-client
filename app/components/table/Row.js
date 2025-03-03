import SelectRowCell from './SelectRowCell';
import Cell from './Cell';
import ActionCell from './ActionCell';
import styles from './Row.module.css';
import { classNames } from '@/app/utils/classNames';

const Row = ({
   row,
   columns,
   actions,
   selectedRows,
   toggleRowSelection,
   handleRowClick = null
}) => (
   <tr
      className={classNames(styles.row, handleRowClick && styles.clickable)}
      onClick={() => handleRowClick(row)}>
      <SelectRowCell
         row={row}
         selectedRows={selectedRows}
         toggleRowSelection={toggleRowSelection}
      />
      {columns.map(col => (
         <Cell key={col.key} row={row} col={col} />
      ))}
      {actions &&
         actions.map((action, actionIndex) => (
            <ActionCell key={actionIndex} row={row} action={action} />
         ))}
   </tr>
);

export default Row;
