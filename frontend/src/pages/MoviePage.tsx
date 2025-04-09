import React, { useEffect, useState, useRef } from "react";
import "./MoviePage.css";

const MainPage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const loaderRef = useRef(null);

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  const fetchMovies = async (pageNum) => {
    const res = await fetch(
      `https://localhost:4000/Movies/GetMovies?page=${pageNum}`
    );
    const data = await res.json();

    if (data.movies.length === 0) {
      setHasMore(false);
    } else {
      setMovies((prev) => [...prev, ...data.movies]);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [hasMore]);

  const filterByCategory = (category) =>
    movies.filter((movie) => movie[category] === 1);

  const action = filterByCategory("action");
  const comedy = filterByCategory("comedies");
  const drama = filterByCategory("dramas");
  const previouslyWatched = filterByCategory("watched");
  const recommended = filterByCategory("recommended");

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderCarousel = (title, movieList) => (
    <div className="carousel-section">
      <h2>{title}</h2>
      <div className="carousel">
        {movieList.map((movie, index) => (
          <div key={index} className="movie-card">
            <img
              src={
                movie.posterUrl ||
                "https://via.placeholder.com/150x220?text=No+Image"
              }
              alt={movie.title}
            />
            <p>{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="main-container">
      <h1>Welcome back, Joe!</h1>

      {renderCarousel("Previously Watched", previouslyWatched)}
      {renderCarousel("Recommended For You", recommended)}
      {renderCarousel("Action", action)}
      {renderCarousel("Comedy", comedy)}
      {renderCarousel("Drama", drama)}

      <div className="search-section">
        <h2>All Movies</h2>
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="all-movies">
          {filteredMovies.map((movie, index) => (
            <div key={index} className="movie-card">
              <img
                src={
                  movie.posterUrl ||
                  "https://via.placeholder.com/150x220?text=No+Image"
                }
                alt={movie.title}
              />
              <p>{movie.title}</p>
            </div>
          ))}
        </div>

        <div ref={loaderRef} className="loading-trigger"></div>
      </div>
    </div>
  );
};

export default MainPage;
