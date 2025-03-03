import CellHeader from './CellHeader';
import SelectAllHeader from './SelectAllHeader';

const HeaderRow = ({
   filteredData,
   columns,
   actions,
   selectedRows,
   toggleSelectAll,
   handleSort,
   sorting
}) => (
   <tr>
      <SelectAllHeader
         selectedRows={selectedRows}
         filteredData={filteredData}
         toggleSelectAll={toggleSelectAll}
      />
      {columns.map(col => (
         <CellHeader key={col.key} col={col} handleSort={handleSort} sorting={sorting} />
      ))}
      {actions && <th colSpan={actions.length}>Actions</th>}
   </tr>
);

export default HeaderRow;
