import { useState, useMemo /* , useEffect, useCallback */ } from 'react';

const useTable = data => {
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

   return {
      sorting,
      filter,
      setFilter,
      filteredData,
      selectedRows,
      handleSort,
      toggleRowSelection,
      toggleSelectAll
   };
};

export default useTable;
