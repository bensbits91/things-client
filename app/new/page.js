'use client';
const { useState } = require('react');
import useAddThing from '../hooks/useAddThing';
// import { withAuthenticationRequired } from '@auth0/auth0-react';

const NewPage = () => {
   const { addThing, isAdding, error } = useAddThing();
   const initialData = {
      name: '',
      type: ''
   };
   const [formData, setFormData] = useState({ ...initialData });
   console.log('bb ~ page.js ~ formData:', formData);

   const handleSubmit = async event => {
      event.preventDefault();

      try {
         const data = await addThing({ ...formData });
         console.log('bb ~ data:', data);
         setFormData({ ...initialData });
      } catch (error) {
         console.error('Error adding thing:', error);
      }

      event.target.name.value = '';
   };

   const handleChange = e => {
      const { name, value } = e.target;
      console.log('bb ~ page.js ~ { name, value }:', { name, value });
      setFormData(
         prevData => ({
            ...prevData,
            [name]: value
         }),
         []
      );
   };

   return (
      <div>
         <h1>Add a Thing</h1>
         {error && <p>{error}</p>}
         {isAdding && <p>Adding...</p>}
         <form type='submit' onSubmit={handleSubmit}>
            <label htmlFor='name'>Thing:</label>
            <input type='text' id='name' name='name' onChange={handleChange} />
            <button type='submit' disabled={isAdding}>
               {isAdding ? 'Adding...' : 'Add Thing'}
            </button>
         </form>
      </div>
   );
};

export default /* withAuthenticationRequired( */NewPage/* ) */;
