import React, { useEffect, useState } from "react";
import "./MoviePage.css";
import MovieList from "../components/MovieListCards";
import { fetchRecommendations } from "../api/MoviesAPI";

const MainPage = () => {
  const [activeTab, setActiveTab] = useState<"tailored" | "all">("tailored");

  const [recentlyWatched, setRecentlyWatched] = useState([]);
  const [topPicks, setTopPicks] = useState([]);
  const [related1, setRelated1] = useState([]);
  const [related2, setRelated2] = useState([]);
  const [related3, setRelated3] = useState([]);
  const [userName, setUserName] = useState("Joe");

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [watchedRes, picksRes] = await Promise.all([
          fetch("https://localhost:4000/Recommender/recentlywatched", {
            credentials: "include",
          }),
          fetch("https://localhost:4000/Recommender/content-user-based", {
            credentials: "include",
          }),
        ]);

        const watchedData = await watchedRes.json();
        const picksData = await picksRes.json();

        setUserName(watchedData.name ?? "Joe");
        setRecentlyWatched(watchedData.ratedMovies ?? []);
        setTopPicks(picksData.slice(0, 3));

        if (picksData.length >= 3) {
          const [rel1, rel2, rel3] = await Promise.all([
            fetchRecommendations(picksData[0].showId),
            fetchRecommendations(picksData[1].showId),
            fetchRecommendations(picksData[2].showId),
          ]);
          setRelated1(rel1);
          setRelated2(rel2);
          setRelated3(rel3);
        }
      } catch (err) {
        console.error("Error loading personalized carousels", err);
      }
    };

    fetchAll();
  }, []);

  const getPosterUrl = (title) =>
    title
      ? `https://intexmovieposters14.blob.core.windows.net/posters/Movie%20Posters/${encodeURIComponent(title)}.jpg`
      : "/fallback-poster.png";

  const renderCarousel = (title, movieList) => (
    <div className="carousel-section">
      <h2>{title}</h2>
      <div className="carousel">
        {movieList.map((movie, index) => (
          <div key={index} className="movie-card">
            <img
              src={getPosterUrl(movie.title)}
              alt={movie.title}
              onError={(e) => (e.currentTarget.src = "/fallback-poster.png")}
            />
            <p>{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="main-container">
      <div className="tabs">
        <button
          className={activeTab === "tailored" ? "tab active" : "tab"}
          onClick={() => setActiveTab("tailored")}
        >
          Tailored For You
        </button>
        <button
          className={activeTab === "all" ? "tab active" : "tab"}
          onClick={() => setActiveTab("all")}
        >
          All Movies
        </button>
      </div>

      {activeTab === "tailored" && (
        <>
          <h1>Welcome back, {userName}!</h1>
          <br />
          {renderCarousel("Recently Watched", recentlyWatched)}
          {renderCarousel("Top Picks for You", topPicks)}
          {topPicks.length > 0 &&
            renderCarousel(
              `Movies Related to "${topPicks[0]?.title}"`,
              related1
            )}
          {topPicks.length > 1 &&
            renderCarousel(
              `Movies Related to "${topPicks[1]?.title}"`,
              related2
            )}
          {topPicks.length > 2 &&
            renderCarousel(
              `Movies Related to "${topPicks[2]?.title}"`,
              related3
            )}
        </>
      )}

      {activeTab === "all" && (
        <div className="movie-list-wrapper">
          <h2>All Movies</h2>
          <MovieList />
        </div>
      )}
    </div>
  );
};

export default MainPage;
