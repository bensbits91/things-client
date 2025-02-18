'use client';
import useThings from '../hooks/useThings';
import { Table } from '../components/table';

const ThingsPage = () => {
   const { things, isLoading, error } = useThings();
   const areThings = things && things.length > 0;
   // const generateRandomThings = num => {
   //    const randomThings = [];
   //    for (let i = 0; i < num; i++) {
   //       randomThings.push({
   //          _id: i,
   //          name: `Thing ${i}`,
   //          type: `Type ${i}`
   //       });
   //    }
   //    return randomThings;
   // };
   // const aBunchaThings = [...things, ...generateRandomThings(97)];

   const columns = [
      { key: 'name', label: 'Name' }
      //   { key: 'type', label: 'Type' }
   ];

   return (
      <div>
         <h1>My Things</h1>
         <div>
            <p>Things will go here</p>
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {areThings && <Table data={things} columns={columns} />}
            {areThings && <div style={{ margin: 40 }}>{JSON.stringify(things)}</div>}
            {areThings &&
               things.map((thing, index) => (
                  <div key={index}>
                     <h2>{thing.name}</h2>
                     <button>Edit</button>
                  </div>
               ))}
         </div>
      </div>
   );
};

export default ThingsPage;
