import React, { useState } from 'react';
import { MovieCard } from '../types/MovieCard';

interface Props {
  movie: MovieCard;
  onClick?: () => void; // 👈 allow parent to handle clicks
}

const OneMovieCard: React.FC<Props> = ({ movie, onClick }) => {
  const encodedTitle = encodeURIComponent(movie.title);
  const posterUrl = `https://intexmovieposters14.blob.core.windows.net/posters/Movie%20Posters/${encodedTitle}.jpg`;

  const [imgSrc, setImgSrc] = useState(posterUrl);

  const handleImageError = () => {
    setImgSrc('/fallback-poster.jpg');
  };

  return (
    <div
      className="movie-card bg-gray-900 rounded-lg overflow-hidden text-white text-center cursor-pointer hover:scale-105 transition-transform"
      onClick={onClick}
    >
      <img
        src={imgSrc}
        alt={movie.title}
        onError={handleImageError}
        className="movie-poster w-full h-60 object-cover"
      />
      <p className="movie-title px-2 py-1 text-sm truncate">{movie.title}</p>
    </div>
  );
};

export default OneMovieCard;
