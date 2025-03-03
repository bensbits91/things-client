'use client';
import FilterInput from './FilterInput';
import HeaderRow from './HeaderRow';
import Row from './Row';
import styles from './Table.module.css';
import useTable from '@/app/hooks/useTable';

// const CustomTable = ({ columns, fetchData }) => {
const CustomTable = ({ data, columns, handleRowClick = null, actions = null }) => {
   const {
      sorting,
      filter,
      setFilter,
      filteredData,
      selectedRows,
      handleSort,
      toggleRowSelection,
      toggleSelectAll
   } = useTable(data);

   return (
      <div>
         <FilterInput filter={filter} setFilter={setFilter} />
         <table className={styles.table}>
            <thead>
               <HeaderRow
                  filteredData={filteredData}
                  columns={columns}
                  actions={actions}
                  selectedRows={selectedRows}
                  toggleSelectAll={toggleSelectAll}
                  handleSort={handleSort}
                  sorting={sorting}
               />
            </thead>
            <tbody>
               {filteredData.map((row, rowIndex) => (
                  <Row
                     key={rowIndex}
                     row={row}
                     columns={columns}
                     actions={actions}
                     selectedRows={selectedRows}
                     toggleRowSelection={toggleRowSelection}
                     handleRowClick={handleRowClick}
                  />
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
      </div>
   );
};

export default CustomTable;
