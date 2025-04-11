import React, { useEffect, useState } from "react";
import "./MoviePage.css";
import MovieList from "../components/MovieListCards";
import { RequireRole } from "../components/RequireRole";

import {
  fetchRecommendations,
  fetchMovieDetails,
  API_URL,
} from "../api/MoviesAPI";
import { MovieCard } from "../types/MovieCard";
import MovieDetails from "../components/MovieDetails";

import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Movie } from "../types/Movie";
import CarouselSection from "../components/CarouselSection";

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
  const [, setSelectedMovieTitle] = useState<string | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        // 🔍 Fetch user info first
        const userRes = await fetch(`${API_URL}/pingauth`, {
          credentials: "include",
        });

        if (userRes.ok) {
          const userInfo = await userRes.json();
          const email = userInfo.email ?? "Joe";
          const nameGuess = email.split("@")[0];
          setUserName(nameGuess.charAt(0).toUpperCase() + nameGuess.slice(1));
        }

        // 🧠 Continue loading the personalized stuff...
        const [watchedRes, picksRes] = await Promise.all([
          fetch(`${API_URL}/Recommender/recentlywatched`, {
            credentials: "include",
          }),
          fetch(`${API_URL}/Recommender/content-user-based`, {
            credentials: "include",
          }),
        ]);

        const watchedData = await watchedRes.json();
        const picksData = await picksRes.json();

        const watchedMovies: MovieCard[] = await Promise.all(
          watchedData.ratedMovies.map((m: Movie) => fetchMovieDetails(m.showId))
        );
        setRecentlyWatched(watchedMovies);

        const topPicksFull: MovieCard[] = await Promise.all(
          picksData.slice(0, 3).map((m: Movie) => fetchMovieDetails(m.showId))
        );
        setTopPicks(topPicksFull);

        if (topPicksFull.length >= 3) {
          const [rel1Raw, rel2Raw, rel3Raw] = await Promise.all([
            fetchRecommendations(topPicksFull[0].showId),
            fetchRecommendations(topPicksFull[1].showId),
            fetchRecommendations(topPicksFull[2].showId),
          ]);

          const rel1 = await Promise.all(
            rel1Raw.map((m: Movie) => fetchMovieDetails(m.showId))
          );
          const rel2 = await Promise.all(
            rel2Raw.map((m: Movie) => fetchMovieDetails(m.showId))
          );
          const rel3 = await Promise.all(
            rel3Raw.map((m: Movie) => fetchMovieDetails(m.showId))
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

  const handleSelectMovie = (id: string, title: string) => {
    setSelectedMovieId(id);
    setSelectedMovieTitle(title);
  };

  return (
    <RequireRole role="User">
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
            <h1 className="welcome-head">Welcome back, {userName}!</h1>
            <br />
            <CarouselSection
              title="Recently Watched"
              movieList={recentlyWatched}
              onSelect={handleSelectMovie}
            />
            <CarouselSection
              title="Top Picks for You"
              movieList={topPicks}
              onSelect={handleSelectMovie}
            />
            {topPicks.length > 0 && (
              <CarouselSection
                title={`Related to "${topPicks[0]?.title}"`}
                movieList={related1}
                onSelect={handleSelectMovie}
              />
            )}
            {topPicks.length > 1 && (
              <CarouselSection
                title={`Related to "${topPicks[1]?.title}"`}
                movieList={related2}
                onSelect={handleSelectMovie}
              />
            )}
            {topPicks.length > 2 && (
              <CarouselSection
                title={`Related to "${topPicks[2]?.title}"`}
                movieList={related3}
                onSelect={handleSelectMovie}
              />
            )}
          </div>
        )}

        {activeTab === "all" && (
          <div className="tab-content movie-list-wrapper">
            <h2 className="welcome-head">All Movies</h2>
            <MovieList
              onMovieSelect={(id, title) =>
                handleSelectMovie(id, title ?? "Movie Details")
              }
            />
          </div>
        )}

        {/* Movie Details Modal */}
        <Dialog
          fullScreen
          open={!!selectedMovieId}
          onClose={() => {
            setSelectedMovieId(null);
            setSelectedMovieTitle(null);
          }}
          TransitionComponent={Transition}
        >
          <AppBar
            sx={{ position: "relative", backgroundColor: "#4A2B0F !important" }}
          >
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => setSelectedMovieId(null)}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          {selectedMovieId && <MovieDetails movieId={selectedMovieId} />}
        </Dialog>
      </div>
    </RequireRole>
  );
};

export default MainPage;
