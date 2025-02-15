import { useState, useMemo, useEffect, useCallback } from 'react';

// ✅ Table Component
// const CustomTable = ({ columns, fetchData }) => {
const CustomTable = ({ data }) => {
   console.log('bb ~ Table.js ~ data:', data);
   //    const [data, setData] = useState([]);
   const [sorting, setSorting] = useState({ key: null, order: 'asc' });
   const [filter, setFilter] = useState('');
   //    const [page, setPage] = useState(1);
   //    const [loading, setLoading] = useState(false);
   const [selectedRows, setSelectedRows] = useState(new Set());

   // 📌 Fetch initial data and handle pagination
   //    const loadMoreRows = useCallback(async () => {
   //       setLoading(true);
   //       const newRows = await fetchData(page);
   //       setData(prev => [...prev, ...newRows]);
   //       setPage(prev => prev + 1);
   //       setLoading(false);
   //    }, [page, fetchData]);

   //    useEffect(() => {
   //       loadMoreRows();
   //    }, []);

   const columns = [
      { key: 'name', label: 'Name' },
    //   { key: 'type', label: 'Type' }
   ];

   // 📌 Handle sorting
   const handleSort = key => {
      setSorting(prev => ({
         key,
         order: prev.key === key && prev.order === 'asc' ? 'desc' : 'asc'
      }));
   };

   // 📌 Handle filtering
   const filteredData = useMemo(() => {
      return data
         .filter(row =>
            Object.values(row).some(value =>
               String(value).toLowerCase().includes(filter.toLowerCase())
            )
         )
         .sort((a, b) => {
            if (!sorting.key) return 0;
            const order = sorting.order === 'asc' ? 1 : -1;
            return a[sorting.key] > b[sorting.key] ? order : -order;
         });
   }, [data, filter, sorting]);

   // 📌 Toggle row selection
   const toggleRowSelection = id => {
      console.log('bb ~ Table.js ~ id:', id);
      setSelectedRows(prev => {
         const newSelected = new Set(prev);
         newSelected.has(id) ? newSelected.delete(id) : newSelected.add(id);
         return newSelected;
      });
   };

   // 📌 Select/Deselect all rows
   const toggleSelectAll = () => {
      if (selectedRows.size === filteredData.length) {
         setSelectedRows(new Set());
      } else {
         setSelectedRows(new Set(filteredData.map(row => row._id)));
      }
   };

   return (
      <div>
         {/* 🔍 Filter Input */}
         <input
            type='text'
            placeholder='Search...'
            value={filter}
            onChange={e => setFilter(e.target.value)}
            style={{ marginBottom: 10, padding: 5, width: '100%' }}
         />

         {/* 📊 Table */}
         <table border='1' width='100%'>
            <thead>
               <tr>
                  {/* Select All Checkbox */}
                  <th>
                     <input
                        type='checkbox'
                        checked={
                           selectedRows.size === filteredData.length &&
                           filteredData.length > 0
                        }
                        onChange={toggleSelectAll}
                     />
                  </th>
                  {columns.map(col => (
                     <th
                        key={col.key}
                        onClick={() => handleSort(col.key)}
                        style={{ cursor: 'pointer' }}>
                        {col.label}{' '}
                        {sorting.key === col.key
                           ? sorting.order === 'asc'
                              ? '🔼'
                              : '🔽'
                           : ''}
                     </th>
                  ))}
                  <th>e</th>
               </tr>
            </thead>
            <tbody>
               {filteredData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                     <td>
                        <input
                           type='checkbox'
                           checked={selectedRows.has(row._id)}
                           onChange={() => toggleRowSelection(row._id)}
                        />
                     </td>
                     {columns.map(col => (
                        <td key={col.key}>{row[col.key]}</td>
                     ))}
                     <td>
                        <button>Edit</button>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>

         {/* 🔄 Lazy Load More */}
         {/* <button
            onClick={loadMoreRows}
            disabled={loading}
            style={{ marginTop: 10 }}>
            {loading ? 'Loading...' : 'Load More'}
         </button> */}

         {/* 📝 Show Selected Rows */}

         {selectedRows.size > 0 && (
            <div style={{ marginTop: 10 }}>
               <strong>Selected Rows:</strong>{' '}
               {Array.from(selectedRows).join(', ')}
            </div>
         )}
      </div>
   );
};

export default CustomTable;
