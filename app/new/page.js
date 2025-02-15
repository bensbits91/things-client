'use client';
import useThing from '../hooks/useThing';
import { withAuthenticationRequired } from '@auth0/auth0-react';

const NewPage = () => {
   const { addThing/* , userInfo */ } = useThing();
   // console.log('bb ~ userInfo:', userInfo);

   const handleSubmit = async event => {
      event.preventDefault();
      const name = event.target.name.value;
      console.log(`Adding ${name}`);

      try {
         const data = await addThing(name);
         console.log('bb ~ data:', data);
      } catch (error) {
         console.error('Error adding thing:', error);
      }

      event.target.name.value = '';
   };

   return (
      <div>
         <h1>Add a Thing</h1>
         <form type='submit' onSubmit={handleSubmit}>
            <label htmlFor='name'>Thing:</label>
            <input type='text' id='name' name='name' />
            <button type='submit'>Add</button>
         </form>
      </div>
   );
};

export default withAuthenticationRequired(NewPage);
