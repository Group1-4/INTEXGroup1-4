// RatingStars.tsx
import React, { useState } from 'react';
import './RatingStars.css';

interface Props {
  onRatingChange: (rating: number | null) => void;
  initialRating?: number | null; // Optional prop for pre-filled rating
}

const RatingStars: React.FC<Props> = ({ onRatingChange, initialRating = null }) => {
  const [rating, setRating] = useState<number | null>(initialRating);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const handleStarClick = (value: number) => {
    setRating(value);
    onRatingChange(value);
  };

  const handleStarHover = (value: number) => {
    setHoverRating(value);
  };

  const handleStarLeave = () => {
    setHoverRating(null);
  };

  const getStarClass = (index: number) => {
    const starValue = index + 1;
    let baseClass = 'bi';
    let fillClass = hoverRating !== null
      ? (starValue <= hoverRating ? 'bi-star-fill' : 'bi-star star-empty')
      : (rating !== null && starValue <= rating ? 'bi-star-fill star-filled' : 'bi-star star-empty');
    return `${baseClass} ${fillClass} star`; // Keep the 'star' class for hover effect
  };

  return ( // Ensure you are returning JSX here
    <div className="rating-stars">
      {[1, 2, 3, 4, 5].map((starIndex) => (
        <i
          key={starIndex}
          className={`bi ${getStarClass(starIndex - 1)} star`}
          onClick={() => handleStarClick(starIndex)}
          onMouseEnter={() => handleStarHover(starIndex)}
          onMouseLeave={handleStarLeave}
        />
      ))}
    </div>
  );
};

export default RatingStars;