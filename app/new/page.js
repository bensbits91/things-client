'use client';
const { useState } = require('react');
import useThing from '../hooks/useThing';
import { withAuthenticationRequired } from '@auth0/auth0-react';

const NewPage = () => {
   const { addThing /* , userInfo */ } = useThing();
   // console.log('bb ~ userInfo:', userInfo);
   const initialData = {
      name: '',
      type: ''
   };
   const [formData, setFormData] = useState({ ...initialData });
   console.log('bb ~ page.js ~ formData:', formData);
   const [isSending, setIsSending] = useState(false);
   const [isSent, setIsSent] = useState(false);
   const [errorData, setErrorData] = useState(null);

   const handleSubmit = async event => {
      event.preventDefault();
      // const name = event.target.name.value;
      // console.log(`Adding ${name}`);

      try {
         const data = await addThing({ ...formData });
         console.log('bb ~ data:', data);
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
         <form type='submit' onSubmit={handleSubmit}>
            <label htmlFor='name'>Thing:</label>
            <input type='text' id='name' name='name' onChange={handleChange} />
            <button type='submit'>Add</button>
         </form>
      </div>
   );
};

export default withAuthenticationRequired(NewPage);
