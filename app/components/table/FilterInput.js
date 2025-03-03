import styles from './FilterInput.module.css';

const FilterInput = ({ filter, setFilter }) => (
   <input
      className={styles.filterInput}
      type='text'
      placeholder='Filter this list...'
      value={filter}
      onChange={e => setFilter(e.target.value)}
   />
);

export default FilterInput;
