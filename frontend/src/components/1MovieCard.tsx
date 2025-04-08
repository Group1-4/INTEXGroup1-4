import React from 'react';
import { MovieCard } from '../types/MovieCard';

interface Props {
  movie: MovieCard;
}

const OneMovieCard: React.FC<Props> = ({ movie }) => {
    const encodedTitle = encodeURIComponent(movie.title);
    const posterUrl = `https://intexmovieposters14.blob.core.windows.net/posters/Movie%20Posters/${encodedTitle}.jpg`;
  
    return (
      <div className="movie-card bg-gray-900 rounded-lg overflow-hidden text-white text-center">
        <img
          src={posterUrl}
          alt={movie.title}
          className="movie-poster w-full h-60 object-cover"
        />
        <p className="movie-title px-2 py-1 text-sm truncate">{movie.title}</p>
      </div>
    );
  };
  
  export default OneMovieCard;