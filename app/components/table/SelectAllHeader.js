const SelectAllHeader = ({ selectedRows, filteredData, toggleSelectAll }) => (
   <th>
      <input
         type='checkbox'
         checked={selectedRows.size === filteredData.length && filteredData.length > 0}
         onChange={toggleSelectAll}
      />
   </th>
);

export default SelectAllHeader;
