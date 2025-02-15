'use client';
// todo: do I really want to protect this entire page?
// can I use isAuthenticated from useThing instead?
import { withAuthenticationRequired } from '@auth0/auth0-react';
import useThing from '../hooks/useThing';
import { Table } from '../components/table';

const ThingsPage = () => {
   const { things } = useThing();
   const areThings = things && things.length > 0;

   const generateRandomThings = (num) => {
      const randomThings = [];
      for (let i = 0; i < num; i++) {
         randomThings.push({
            _id: i,
            name: `Thing ${i}`,
            type: `Type ${i}`
         });
      }
      return randomThings;
   };
   const aBunchaThings = [...things, ...generateRandomThings(97)];

   return (
      <div>
         <h1>My Things</h1>
         <div>
            <p>Things will go here</p>
            {areThings && JSON.stringify(things)}
            {areThings &&
               things.map((thing, index) => (
                  <div key={index}>
                     <h2>{thing.name}</h2>
                     <button>Edit</button>
                  </div>
               ))}
            {areThings && <Table data={aBunchaThings} />}
         </div>
      </div>
   );
};

export default withAuthenticationRequired(ThingsPage);
