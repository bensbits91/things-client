'use client';
import { useState, useMemo, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Button } from '@/app/components/button';
import styles from './Table.module.css';

// const CustomTable = ({ columns, fetchData }) => {
const CustomTable = ({ data, columns, actions = null }) => {
   console.log('bb ~ Table.js:9 ~ CustomTable ~ data:', data);
   //    const [data, setData] = useState([]);
   const [sorting, setSorting] = useState({ key: null, order: 'asc' });
   const [filter, setFilter] = useState('');
   //    const [page, setPage] = useState(1);
   //    const [loading, setLoading] = useState(false);
   const [selectedRows, setSelectedRows] = useState(new Set());

   // Fetch initial data and handle pagination
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

   // Handle sorting
   const handleSort = key => {
      setSorting(prev => ({
         key,
         order: prev.key === key && prev.order === 'asc' ? 'desc' : 'asc'
      }));
   };

   // Handle filtering
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

   // Toggle row selection
   const toggleRowSelection = id => {
      console.log('bb ~ Table.js:52 ~ CustomTable ~ id:', id);
      setSelectedRows(prev => {
         const newSelected = new Set(prev);
         newSelected.has(id) ? newSelected.delete(id) : newSelected.add(id);
         return newSelected;
      });
   };

   // Select/Deselect all rows
   const toggleSelectAll = () => {
      if (selectedRows.size === filteredData.length) {
         setSelectedRows(new Set());
      } else {
         setSelectedRows(new Set(filteredData.map(row => row._id || row.external_id)));
      }
   };

   const Column = ({ row, col }) => {
      const { name } = row;
      const { key, columnType } = col;
      const val = row[key];

      const colBody =
         columnType === 'image' ? (
            <div className={styles.imageWrapper}>
               <Image src={val} alt={name} fill sizes='50px' />
            </div>
         ) : (
            val
         );

      const clickableColBody = col.onClick ? (
         <td key={col.key} className={styles.clickable} onClick={() => col.onClick(row)}>
            {colBody}
         </td>
      ) : (
         <td key={col.key}>{colBody}</td>
      );

      return clickableColBody;
   };

   return (
      <div>
         {/* Filter Input */}
         <input
            className={styles.filterInput}
            type='text'
            placeholder='Filter this list...'
            value={filter}
            onChange={e => setFilter(e.target.value)}
            style={{ marginBottom: 10, padding: 5, width: '100%' }}
         />

         <table className={styles.table}>
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
                        onClick={() => handleSort(col.key)} // todo: if type === 'image', don't sort
                        style={{ cursor: 'pointer' }}>
                        {col.label}{' '}
                        {sorting.key === col.key
                           ? sorting.order === 'asc'
                              ? '🔼'
                              : '🔽'
                           : ''}
                     </th>
                  ))}
                  {actions && <th colSpan={actions.length}>Actions</th>}
               </tr>
            </thead>
            <tbody>
               {filteredData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                     <td>
                        <input
                           type='checkbox'
                           checked={selectedRows.has(row._id || row.external_id)}
                           onChange={() => toggleRowSelection(row._id || row.external_id)}
                        />
                     </td>
                     {columns.map(col => (
                        <Column key={col.key} row={row} col={col} />
                     ))}
                     {actions &&
                        actions.map((action, actionIndex) => (
                           <td key={actionIndex}>
                              {row.userHasThing && action.altText ? (
                                 <>{action.altText}</>
                              ) : (
                                 <Button
                                    linkStyle
                                    disabled={
                                       row.userHasThing && action.label === 'Add to List'
                                    } // todo: hacky fallback in case user doesn't have thing and no altText is provided
                                    onClick={e => {
                                       console.log('bb ~ Table.js ~ row:', row);
                                       action.onClick(row);
                                    }}>
                                    {action.label}
                                 </Button>
                              )}
                           </td>
                        ))}
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
               <strong>Selected Rows:</strong> {Array.from(selectedRows).join(', ')}
            </div>
         )}
      </div>
   );
};

export default CustomTable;
