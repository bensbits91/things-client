import GridItem from './GridItem';
import { Loading } from '@/app/components/loading';
import styles from './Grid.module.css';

const Grid = ({ data, handleItemClick }) => {
   if (!data) {
      return <Loading />;
   }

   return (
      <div className={styles.grid}>
         {data.map(item => (
            <GridItem key={item._id} item={item} onClick={handleItemClick} />
         ))}
      </div>
   );
};

export default Grid;
