import React, { useEffect, useState } from "react";
import "./MoviePage.css";

const MainPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/Movies/GetMovies")
      .then((res) => res.json())
      .then((data) => setMovies(data));
  }, []);

  const filterByCategory = (category) =>
    movies.filter((movie) => movie[category] === 1);

  const previouslyWatched = filterByCategory("watched"); // adjust if there's a 'watched' field
  const recommended = filterByCategory("recommended"); // same here
  const action = filterByCategory("action");
  const comedy = filterByCategory("comedies");
  const drama = filterByCategory("dramas");

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderCarousel = (title, movieList) => (
    <div className="carousel-section">
      <h2>{title}</h2>
      <div className="carousel">
        {movieList.map((movie, index) => (
          <div key={index} className="movie-card">
            <img src={movie.posterUrl} alt={movie.title} />
            <p>{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="main-container">
      <h1>Welcome Back, Joe!</h1>
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
              <img src={movie.posterUrl} alt={movie.title} />
              <p>{movie.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
