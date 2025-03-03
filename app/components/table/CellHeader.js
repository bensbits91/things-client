const CellHeader = ({ col, handleSort, sorting }) => (
   <th
      key={col.key}
      onClick={() => handleSort(col.key)} // todo: if type === 'image', don't sort
      style={{ cursor: 'pointer' }}>
      {col.label} {sorting.key === col.key ? (sorting.order === 'asc' ? '🔼' : '🔽') : ''}
   </th>
);

export default CellHeader;
