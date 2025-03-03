import { useEffect, useState } from 'react';
import { Overlay } from '@/app/components/overlay';
import { RadioButtonIcon, ChevronIcon } from '@/app/components/icons';
import styles from './Dropdown.module.css';
import { classNames } from '@/app/utils/classNames';

const Dropdown = ({ options, initialSelection = '', placeholder, onSelect }) => {
   const [isOpen, setIsOpen] = useState(false);
   const [selectedOption, setSelectedOption] = useState(null);

   useEffect(() => {
      const initialOption = options.find(option => option.value === initialSelection);
      if (initialOption) {
         setSelectedOption(initialOption);
      }
   }, [initialSelection, options]);

   const handleToggle = () => {
      setIsOpen(!isOpen);
   };

   const handleSelect = option => {
      setSelectedOption(option);
      setIsOpen(false);
      onSelect(option);
   };

   return (
      <>
         {isOpen && <Overlay hide={!isOpen} handleClick={() => setIsOpen(false)} />}
         <div className={styles.dropdown}>
            <button
               className={classNames(styles.dropdownToggle, isOpen && styles.active)}
               onClick={handleToggle}>
               {selectedOption && selectedOption.value !== 0
                  ? selectedOption.label
                  : placeholder}
               <div className={styles.dropdownIcon}>
                  <ChevronIcon />
               </div>
            </button>
            {isOpen && (
               <ul className={styles.dropdownMenu}>
                  {options.map(option => {
                     const isSelected = selectedOption.value === option.value;
                     return (
                        <li
                           key={option.value}
                           className={classNames(
                              styles.dropdownItem,
                              isSelected && styles.activeItem
                           )}
                           onClick={() => handleSelect(option)}>
                           <div className={styles.radioIconWrap}>
                              <RadioButtonIcon selected={isSelected} />
                           </div>
                           {option.label}
                        </li>
                     );
                  })}
               </ul>
            )}
         </div>
      </>
   );
};

export default Dropdown;
