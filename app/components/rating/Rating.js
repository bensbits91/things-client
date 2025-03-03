import { useState } from 'react';
import { StarIcon } from '@/app/components/icons';
import styles from './Rating.module.css';
import { classNames } from '@/app/utils/classNames';

const Rating = ({ rating, editable = false, handleEdit = null }) => {
   const [hoveredIndex, setHoveredIndex] = useState(null);

   // todo: handle onclick

   const handleMouseEnter = index => {
      setHoveredIndex(index);
   };

   const handleMouseLeave = () => {
      setHoveredIndex(null);
   };

   const handleClick = index => {
      if (handleEdit) {
         handleEdit(index + 1);
      }
   };

   const Stars = [];
   for (let i = 0; i < 10; i++) {
      const isFilled = editable && hoveredIndex !== null ? i <= hoveredIndex : rating > i;

      Stars.push(
         <div
            key={`star-${i}`}
            className={classNames(styles.starWrap, isFilled && styles.starFill)}
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(i)}>
            <StarIcon fill={isFilled} />
         </div>
      );
   }

   return (
      <div className={classNames(styles.ratingWrap, editable && styles.editable)}>
         {Stars}
      </div>
   );
};

export default Rating;
