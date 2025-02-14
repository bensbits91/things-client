'use client';
import useThing from '../hooks/useThing';
import { withAuthenticationRequired } from '@auth0/auth0-react';

const NewPage = () => {
   const { addThing/* , userInfo */ } = useThing();
   // console.log('bb ~ userInfo:', userInfo);

   const handleSubmit = async event => {
      event.preventDefault();
      const thingName = event.target.thingName.value;
      console.log(`Adding ${thingName}`);

      try {
         const data = await addThing(thingName);
         console.log('bb ~ data:', data);
      } catch (error) {
         console.error('Error adding thing:', error);
      }

      event.target.thingName.value = '';
   };

   return (
      <div>
         <h1>Add a Thing</h1>
         <form type='submit' onSubmit={handleSubmit}>
            <label htmlFor='thingName'>Thing:</label>
            <input type='text' id='thingName' name='thingName' />
            <button type='submit'>Add</button>
         </form>
      </div>
   );
};

export default withAuthenticationRequired(NewPage);
