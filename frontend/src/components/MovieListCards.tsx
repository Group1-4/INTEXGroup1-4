import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import OneMovieCard from './1MovieCard';
import { MovieCard } from '../types/MovieCard';
import { fetchMoviesCard } from '../api/MoviesAPI';

const PAGE_SIZE = 20;

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<MovieCard[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadMoreMovies = async () => {
    try {
      const res = await fetchMoviesCard(page, PAGE_SIZE);
      setMovies(prev => [...prev, ...res.movies]);
      setHasMore(res.hasMore);
    
      setPage(prev => prev + 1);
    } catch (error) {
      console.error('Error loading more movies:', error);
      setHasMore(false);
    }
  };

  useEffect(() => {
    loadMoreMovies();
  }, []);

  return (
    <InfiniteScroll
      dataLength={movies.length}
      next={loadMoreMovies}
      hasMore={hasMore}
      loader={<p className="text-center py-4 text-gray-500">Loading...</p>}
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
        {movies.map(movie => (
          <OneMovieCard key={movie.showId} movie={movie} />
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default MovieList;
