'use client';
// todo: do I really want to protect this entire page?
// can I use isAuthenticated from useThing instead?
import { withAuthenticationRequired } from '@auth0/auth0-react';
import useThing from '../hooks/useThing';

const ThingsPage = () => {
   const { things } = useThing();
   const areThings = things && things.length > 0;

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
         </div>
      </div>
   );
};

export default withAuthenticationRequired(ThingsPage);
