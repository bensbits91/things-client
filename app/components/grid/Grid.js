import GridItem from './GridItem';
import { Loading } from '@/app/components/loading';

const Grid = ({ data }) => {
   if (!data) {
      return <Loading />;
   }

   return (
      <div>
         <h1>Grid</h1>
         {data.map(item => (
            <GridItem key={item._id} item={item} />
         ))}
      </div>
   );
};

export default Grid;
