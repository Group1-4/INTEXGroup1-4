import React, { useEffect, useState } from "react";
import "./MoviePage.css";
import MovieList from "../components/MovieListCards";
import { fetchRecommendations, fetchMovieDetails } from "../api/MoviesAPI";
import OneMovieCard from "../components/1MovieCard";
import { MovieCard } from "../types/MovieCard";
import MovieDetails from "../components/MovieDetails";

import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MainPage = () => {
  const [activeTab, setActiveTab] = useState<"tailored" | "all">("tailored");

  const [recentlyWatched, setRecentlyWatched] = useState<MovieCard[]>([]);
  const [topPicks, setTopPicks] = useState<MovieCard[]>([]);
  const [related1, setRelated1] = useState<MovieCard[]>([]);
  const [related2, setRelated2] = useState<MovieCard[]>([]);
  const [related3, setRelated3] = useState<MovieCard[]>([]);
  const [userName, setUserName] = useState("Joe");

  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
  const [selectedMovieTitle, setSelectedMovieTitle] = useState<string | null>(
    null
  );

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

        const fullName = watchedData.name ?? "Joe";
        const firstName = fullName.split(" ")[0]; // takes first word before space
        setUserName(firstName);

        const watchedMovies: MovieCard[] = await Promise.all(
          watchedData.ratedMovies.map((m) => fetchMovieDetails(m.showId))
        );
        setRecentlyWatched(watchedMovies);

        const topPicksFull: MovieCard[] = await Promise.all(
          picksData.slice(0, 3).map((m) => fetchMovieDetails(m.showId))
        );
        setTopPicks(topPicksFull);

        if (topPicksFull.length >= 3) {
          const [rel1Raw, rel2Raw, rel3Raw] = await Promise.all([
            fetchRecommendations(topPicksFull[0].showId),
            fetchRecommendations(topPicksFull[1].showId),
            fetchRecommendations(topPicksFull[2].showId),
          ]);

          const rel1 = await Promise.all(
            rel1Raw.map((m) => fetchMovieDetails(m.showId))
          );
          const rel2 = await Promise.all(
            rel2Raw.map((m) => fetchMovieDetails(m.showId))
          );
          const rel3 = await Promise.all(
            rel3Raw.map((m) => fetchMovieDetails(m.showId))
          );

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

  const renderCarousel = (title: string, movieList: MovieCard[]) => (
    <div className="carousel-section">
      <h2>{title}</h2>
      <div className="carousel">
        {movieList.map((movie) => (
          <OneMovieCard
            key={movie.showId}
            movie={movie}
            onClick={() => {
              setSelectedMovieId(movie.showId.toString());
              setSelectedMovieTitle(movie.title ?? "Movie Details");
            }}
          />
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
        <div className="tab-content">
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
        </div>
      )}

      {activeTab === "all" && (
        <div className="tab-content movie-list-wrapper">
          <h2>All Movies</h2>
          <MovieList />
        </div>
      )}

      {/* Movie Details Model */}
      <Dialog
        fullScreen
        open={!!selectedMovieId}
        onClose={() => {
          setSelectedMovieId(null);
          setSelectedMovieTitle(null);
        }}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative", backgroundColor: "#111" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setSelectedMovieId(null)}
              aria-label="close"
            >
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

export default MainPage;
