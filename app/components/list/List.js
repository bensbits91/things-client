import ListItem from './ListItem';
import { Loading } from '@/app/components/loading';
import styles from './List.module.css';

const List = ({ data, handleItemClick }) => {
   if (!data) {
      return <Loading />;
   }

   return (
      <div className={styles.list}>
         {data.map(item => (
            <ListItem key={item._id} item={item} onClick={handleItemClick} />
         ))}
      </div>
   );
};

export default List;
