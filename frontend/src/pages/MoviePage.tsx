// MainPage.tsx
import React, { useEffect, useState } from "react";
import "./MoviePage.css";
import MovieList from "../components/MovieListCards";
import { RequireRole } from "../components/RequireRole";

import {
  getRecentlyWatched,
  getUserCollaborativeRecs,
  getContentRecsForMovie,
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

// Define this type above the component
type RatedMovie = {
  showId: string;
  rating: number;
};

const MainPage = () => {
  const [activeTab, setActiveTab] = useState<"tailored" | "all">("tailored");

  const [recentlyWatched, setRecentlyWatched] = useState<MovieCard[]>([]);
  const [topPicks, setTopPicks] = useState<MovieCard[]>([]);
  const [related1, setRelated1] = useState<MovieCard[]>([]);
  const [related2, setRelated2] = useState<MovieCard[]>([]);
  const [related3, setRelated3] = useState<MovieCard[]>([]);
  const [userName, setUserName] = useState("Joe");
  const [hasWatched, setHasWatched] = useState(true);

  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
  const [, setSelectedMovieTitle] = useState<string | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        // ✅ 1. Fetch Recently Watched FIRST
        try {
          const watchedData: { name: string; ratedMovies: RatedMovie[] } = await getRecentlyWatched();
  
          if (!watchedData.ratedMovies || watchedData.ratedMovies.length === 0) {
            setHasWatched(false);
            setUserName(""); // Remove name if no watched data
          } else {
            setHasWatched(true);
            setUserName(watchedData.name); // Use real name
  
            // 🎞 Recently Watched
            const watchedCards: MovieCard[] = await Promise.all(
              watchedData.ratedMovies.map((m: RatedMovie) => fetchMovieDetails(m.showId))
            );
            setRecentlyWatched(watchedCards);
  
            // 🧠 Step 1: Get top 5 highest-rated DISTINCT movies
            const topRatedCandidates = watchedData.ratedMovies
              .sort((a, b) => b.rating - a.rating)
              .filter(
                (movie, index, self) =>
                  index === self.findIndex((m) => m.showId === movie.showId)
              )
              .slice(0, 5);
  
            // 🧠 Step 2: Try content-based recs for each until we get 3 valid ones
            const relatedSets: MovieCard[][] = [];
  
            for (const movie of topRatedCandidates) {
              const recsRaw = await getContentRecsForMovie(movie.showId);
              if (recsRaw.length > 0) {
                const recsFull = await Promise.all(
                  recsRaw.map((m: Movie) => fetchMovieDetails(m.showId))
                );
                relatedSets.push(recsFull);
              }
              if (relatedSets.length === 3) break;
            }
  
            // 🧠 Step 3: Set related carousels
            setRelated1(relatedSets[0] || []);
            setRelated2(relatedSets[1] || []);
            setRelated3(relatedSets[2] || []);
  
            // ✅ Step 4: Only fetch Collaborative Recs if user has watched something
            const collabData = await getUserCollaborativeRecs();
            const collabMovies: MovieCard[] = await Promise.all(
              collabData.map((m: Movie) => fetchMovieDetails(m.showId))
            );
            setTopPicks(collabMovies);
          }
        } catch (watchedErr) {
          console.warn("Could not fetch recently watched:", watchedErr);
          setHasWatched(false);
          setUserName(""); // Fallback — remove name if error
        }
      } catch (err) {
        console.error("Error loading personalized movie sections", err);
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
          <h1 className="welcome-head">
          Welcome back{userName ? `, ${userName}` : ""}!
        </h1>

            <br />
            {!hasWatched ? (
              <p className="welcome-head">
                Looks like you haven't watched anything yet — go check out some movies!
              </p>
            ) : (
              <>
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
                {related1.length > 0 && (
                  <CarouselSection
                    title={`Related to "${related1[0]?.title}"`}
                    movieList={related1}
                    onSelect={handleSelectMovie}
                  />
                )}
                {related2.length > 0 && (
                  <CarouselSection
                    title={`Related to "${related2[0]?.title}"`}
                    movieList={related2}
                    onSelect={handleSelectMovie}
                  />
                )}
                {related3.length > 0 && (
                  <CarouselSection
                    title={`Related to "${related3[0]?.title}"`}
                    movieList={related3}
                    onSelect={handleSelectMovie}
                  />
                )}
              </>
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
