import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import OneMovieCard from './1MovieCard';
import { MovieCard } from '../types/MovieCard';
import { fetchMovies } from '../api/MoviesAPI';
import CategoryFilter from './CategoryFilter';
import SearchBar from './SearchBar';
import MovieDetails from './MovieDetails'; // 👈 Import real component

// MUI
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { TransitionProps } from '@mui/material/transitions';

const PAGE_SIZE = 20;

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<MovieCard[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchField, setSearchField] = useState<string>('title');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
  const [selectedMovieTitle, setSelectedMovieTitle] = useState<string | null>(null);

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
      <SearchBar
        searchField={searchField}
        searchQuery={searchQuery}
        onSearchChange={(field, query) => {
          setSearchField(field);
          setSearchQuery(query);
        }}
      />

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
            <OneMovieCard
              key={movie.showId}
              movie={movie}
              onClick={() => {
                setSelectedMovieId(movie.showId.toString());
                setSelectedMovieTitle(movie.title ?? 'Movie Details');
              }}
              

            />
          ))}
        </div>
      </InfiniteScroll>

      <Dialog
        fullScreen
        open={!!selectedMovieId}
        onClose={() => {
          setSelectedMovieId(null);
          setSelectedMovieTitle(null);
        }}
        
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative', backgroundColor: '#111' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={() => setSelectedMovieId(null)} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {selectedMovieTitle}
            </Typography>

          </Toolbar>
        </AppBar>
        {selectedMovieId && <MovieDetails movieId={selectedMovieId} />}
      </Dialog>
    </div>
  );
};

export default MovieList;
