import React, { useEffect, useState } from "react";
import "./MoviePage.css";
import MovieList from "../components/MovieListCards";

const MainPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch recommended/watched/etc. movies from your custom model API
  useEffect(() => {
    const fetchRecommendedMovies = async () => {
      try {
        const res = await fetch("https://localhost:4000/Movies/GetRecommended");
        const data = await res.json();
        setMovies(data.movies);
      } catch (error) {
        console.error("Failed to fetch recommended movies:", error);
      }
    };

    fetchRecommendedMovies();
  }, []);

  const filterByCategory = (category) =>
    movies.filter((movie) => movie[category] === 1);

  const action = filterByCategory("action");
  const comedy = filterByCategory("comedies");
  const drama = filterByCategory("dramas");
  const previouslyWatched = filterByCategory("watched");
  const recommended = filterByCategory("recommended");

  const renderCarousel = (title, movieList) => (
    <div className="carousel-section">
      <h2>{title}</h2>
      <div className="carousel">
        {movieList.map((movie, index) => (
          <div key={index} className="movie-card">
            <img
              src={
                movie.posterUrl && movie.posterUrl.trim() !== ""
                  ? movie.posterUrl
                  : "/fallback-poster.png"
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
      <br />
      {renderCarousel("Previously Watched", previouslyWatched)}
      {renderCarousel("Recommended For You", recommended)}
      {renderCarousel("Action", action)}
      {renderCarousel("Comedy", comedy)}
      {renderCarousel("Drama", drama)}

      <div className="movie-list-wrapper">
        <h2>All Movies</h2>
        <MovieList />
      </div>
    </div>
  );
};

export default MainPage;
