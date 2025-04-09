// RatingStars.tsx
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface RatingStarsProps {
  onRatingChange: (rating: number | null) => void;
}

const RatingStars: React.FC<RatingStarsProps> = ({ onRatingChange }) => {
  const [currentRating, setCurrentRating] = useState<number | null>(null); // Initialize to null on each render

  const handleStarClick = (rating: number) => {
    setCurrentRating(rating);
    onRatingChange(rating);
    console.log(`User rated: ${rating} stars`);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`star ${currentRating && i <= currentRating ? 'filled' : 'empty'} text-warning`}
          style={{ cursor: 'pointer', fontSize: '1.5em' }}
          onClick={() => handleStarClick(i)}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div>
      <div>{renderStars()}</div>
    </div>
  );
};

export default RatingStars;