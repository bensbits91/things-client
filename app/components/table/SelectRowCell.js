const SelectRowCell = ({ row, selectedRows, toggleRowSelection }) => (
   <td>
      <input
         type='checkbox'
         checked={selectedRows.has(row._id || row.external_id)}
         onChange={() => toggleRowSelection(row._id || row.external_id)}
      />
   </td>
);

export default SelectRowCell;
