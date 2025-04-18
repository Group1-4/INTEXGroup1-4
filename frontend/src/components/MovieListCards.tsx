import React, { useEffect, useState, useRef } from 'react';
import OneMovieCard from './1MovieCard';
import { MovieCard } from '../types/MovieCard';
import MovieDetails from './MovieDetails'; // 👈 Import real component

// MUI
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { TransitionProps } from "@mui/material/transitions";
import { fetchMoviesCard } from '../api/MoviesAPI';

interface MovieListProps {
  onMovieSelect?: (id: string, title?: string) => void;
}

const PAGE_SIZE = 20;

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MovieList: React.FC<MovieListProps> = ({ onMovieSelect }) => {
  const [movies, setMovies] = useState<MovieCard[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchField, ] = useState<string>("title");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
  const [, setSelectedMovieTitle] = useState<string | null>(
    null
  );

  const loaderRef = useRef<HTMLDivElement | null>(null);
  const pageRef = useRef(1); // 🔁 Persistent page tracker

  const loadMoreMovies = async (pageToLoad = pageRef.current) => {
    try {
      const res = await fetchMoviesCard(
        pageToLoad,
        PAGE_SIZE,
        selectedCategories,
        searchField,
        searchQuery
      );

      setMovies((prev) =>
        pageToLoad === 1 ? res.movies : [...prev, ...res.movies]
      );
      setHasMore(res.hasMore);

      pageRef.current = pageToLoad + 1; // ✅ advance page for next fetch
    } catch (error) {
      console.error("Error loading more movies:", error);
      setHasMore(false);
    }
  };

  // Initial load or search/filter change
  useEffect(() => {
    setMovies([]);
    pageRef.current = 1;
    loadMoreMovies(1);
  }, [selectedCategories, searchField, searchQuery]);

  // IntersectionObserver for infinite scroll
  useEffect(() => {
    const currentLoader = loaderRef.current;
    if (!currentLoader) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          console.log("Loader visible. Loading page", pageRef.current);
          loadMoreMovies(pageRef.current);
        }
      },
      { threshold: 1 }
    );

    observer.observe(currentLoader);

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [hasMore]);

  return (
    <div>
      {/* Filters */}
      <div className="filter-dropdown-bar scoped-searchbar">
        <input
          className="search-input"
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select
          className="dropdown"
          value={selectedCategories[0] || ""}
          onChange={(e) =>
            setSelectedCategories(e.target.value ? [e.target.value] : [])
          }
        >
          <option value="">All Categories</option>
          <option value="action">Action</option>
          <option value="comedies">Comedy</option>
          <option value="dramas">Drama</option>
          <option value="documentaries">Documentary</option>
          <option value="horrorMovies">Horror</option>
          <option value="thrillers">Thriller</option>
          <option value="fantasy">Fantasy</option>
          <option value="romance">Romance</option>
          <option value="children">Children</option>
          <option value="tvDramas">TV Dramas</option>
          <option value="realityTV">TV Reality</option>
          <option value="tvComedies">TV Comedy</option>
        </select>

        <button
          className="reset-button"
          onClick={() => {
            setSearchQuery("");
            setSelectedCategories([]);
          }}
        >
          Reset
        </button>
      </div>

      {/* Movie grid */}
      <div className="movie-grid">
      {movies.map((movie) => (
      <div
        key={movie.showId}
        onClick={() => onMovieSelect?.(movie.showId.toString(), movie.title)}
        style={{ cursor: "pointer" }}
      >
        <OneMovieCard movie={movie} />
      </div>
    ))}
      </div>

      {/* Infinite scroll loader trigger */}
      <div
        ref={loaderRef}
        style={{
          height: "50px",
          marginTop: "20px",
          backgroundColor: "transparent", // You can make this red to test
        }}
      ></div>

      {/* Modal for movie details */}
      <Dialog
        fullScreen
        open={!!selectedMovieId}
        onClose={() => {
          setSelectedMovieId(null);
          setSelectedMovieTitle(null);
        }}
        TransitionComponent={Transition}
      >
        <AppBar>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setSelectedMovieId(null)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" component="div">
              {/* {selectedMovieTitle} */}
            </Typography>
          </Toolbar>
        </AppBar>
        {selectedMovieId && <MovieDetails movieId={selectedMovieId} />}
      </Dialog>
    </div>
  );
};

export default MovieList;
