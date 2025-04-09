import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import OneMovieCard from './1MovieCard';
import { MovieCard } from '../types/MovieCard';
import { fetchMovies } from '../api/MoviesAPI';
import CategoryFilter from './CategoryFilter';
import SearchBar from './SearchBar'; // 👈 Add this

const PAGE_SIZE = 20;

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<MovieCard[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // 👇 New search state
  const [searchField, setSearchField] = useState<string>('title');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const loadMoreMovies = async (currentPage = page) => {
    try {
      const res = await fetchMovies(
        currentPage,
        PAGE_SIZE,
        selectedCategories,
        searchField,
        searchQuery
      );

      setMovies(prev =>
        currentPage === 1 ? res.movies : [...prev, ...res.movies]
      );
      setHasMore(res.hasMore);
      setPage(prev => prev + 1);
    } catch (error) {
      console.error('Error loading more movies:', error);
      setHasMore(false);
    }
  };

  // Refresh on category OR search change
  useEffect(() => {
    const refreshMovies = async () => {
      setPage(1);
      setMovies([]);
      await loadMoreMovies(1);
    };
    refreshMovies();
  }, [selectedCategories, searchField, searchQuery]);

  return (
    <div>
      {/* 👇 Search input with dropdown */}
      <SearchBar
        searchField={searchField}
        searchQuery={searchQuery}
        onSearchChange={(field, query) => {
          setSearchField(field);
          setSearchQuery(query);
        }}
      />

      {/* 👇 Category checkboxes */}
      <CategoryFilter
        selected={selectedCategories}
        onChange={setSelectedCategories}
      />

      <InfiniteScroll
        dataLength={movies.length}
        next={() => loadMoreMovies()}
        hasMore={hasMore}
        loader={<p className="text-center py-4 text-gray-500">Loading...</p>}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
          {movies.map(movie => (
            <OneMovieCard key={movie.showId} movie={movie} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default MovieList;
