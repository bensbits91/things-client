import WallItem from './WallItem';
import { Loading } from '@/app/components/loading';
import styles from './Wall.module.css';

const Wall = ({ data, handleItemClick }) => {
   if (!data) {
      return <Loading />;
   }

   return (
      <div className={styles.wall}>
         {data.map(item => (
            <WallItem key={item._id} item={item} onClick={handleItemClick} />
         ))}
      </div>
   );
};

export default Wall;
