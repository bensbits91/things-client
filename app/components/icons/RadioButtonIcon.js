const RadioButtonIcon = ({ selected }) => {
   return (
      <div className='radio-button-icon'>
         {selected ? (
            <svg
               viewBox='0 0 24 24'
               xmlns='http://www.w3.org/2000/svg'
               fill='currentColor'>
               <path
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  d='M12,23 C18.0751322,23 23,18.0751322 23,12 C23,5.92486775 18.0751322,1 12,1 C5.92486775,1 1,5.92486775 1,12 C1,18.0751322 5.92486775,23 12,23 Z M12,13 C12.5522847,13 13,12.5522847 13,12 C13,11.4477153 12.5522847,11 12,11 C11.4477153,11 11,11.4477153 11,12 C11,12.5522847 11.4477153,13 12,13 Z M12,15 C13.6568542,15 15,13.6568542 15,12 C15,10.3431458 13.6568542,9 12,9 C10.3431458,9 9,10.3431458 9,12 C9,13.6568542 10.3431458,15 12,15 Z M12,17 C14.7614237,17 17,14.7614237 17,12 C17,9.23857625 14.7614237,7 12,7 C9.23857625,7 7,9.23857625 7,12 C7,14.7614237 9.23857625,17 12,17 Z'></path>
            </svg>
         ) : (
            <svg
               viewBox='0 0 24 24'
               xmlns='http://www.w3.org/2000/svg'
               fill='currentColor'>
               <circle
                  cx='12'
                  cy='12'
                  r='11'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'></circle>
            </svg>
         )}
      </div>
   );
};

export default RadioButtonIcon;
