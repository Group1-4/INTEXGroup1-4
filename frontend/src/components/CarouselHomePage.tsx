import React, { useRef, useState, useEffect } from "react";
import { fetchMovieDetails } from "../api/MoviesAPI";
import { MovieCard } from "../types/MovieCard";

const handpickedIds = [
  "s42", "s7883", "s7845", "s341", "s5406", "s452", "s8415", "s574", "s7461", "s7565",
];

const CarouselHomePage: React.FC = () => {
  const [movies, setMovies] = useState<MovieCard[]>([]);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered || !scrollRef.current) return;
  
    const el = scrollRef.current;
  
    const interval = setInterval(() => {
      // Scroll slowly by a few pixels
      if (el.scrollLeft + el.offsetWidth >= el.scrollWidth) {
        el.scrollTo({ left: 0, behavior: "auto" }); // 🌀 Jump back to start (no animation)
      } else {
        el.scrollBy({ left: 1, behavior: "auto" }); // ⬅️ Slow scroll: 1px per frame
      }
    }, 20); // Run every 20ms (~50px per second)
  
    return () => clearInterval(interval);
  }, [isHovered]);
  
  

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const results = await Promise.all(
          handpickedIds.map((id) => fetchMovieDetails(id))
        );
        setMovies(results);
      } catch (error) {
        console.error("Failed to load movies", error);
      }
    };

    loadMovies();
  }, []);

  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (el) {
      setAtStart(el.scrollLeft <= 5);
      // remove atEnd logic (or always keep it false)
      setAtEnd(false);
    }
  };

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
  
    const movieCardWidth = 200 + 16; // 200px width + 16px gap between cards
    const scrollAmount = movieCardWidth * 2; // scroll by 2 movie cards
  
    if (direction === "right") {
      if (el.scrollLeft + el.offsetWidth >= el.scrollWidth - scrollAmount) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    } else {
      el.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  
    setTimeout(updateScrollButtons, 200);
  };
  

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateScrollButtons();
    el.addEventListener("scroll", updateScrollButtons);
    return () => el.removeEventListener("scroll", updateScrollButtons);
  }, [movies]);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const results = await Promise.all(
          handpickedIds.map((id) => fetchMovieDetails(id))
        );
        // Duplicate the list to create seamless scroll illusion
        setMovies([...results, ...results]);
      } catch (error) {
        console.error("Failed to load movies", error);
      }
    };
  
    loadMovies();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2 className="featured-movie-title">Featured Movies</h2>

      <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
        {/* Left Arrow */}
        {!atStart && (
            <button
            onClick={() => scroll("left")}
            style={{
                background: "transparent",
                border: "none",
                fontSize: "2rem",
                color: "transparent",
                cursor: "pointer",
                marginRight: "10px", // optional spacing
            }}
            >
            &#10094;
            </button>
        )}

        {/* Carousel Content */}
        <div
            ref={scrollRef}
            className="carousel"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                display: "flex",
                gap: "16px",
                padding: "10px 0",
                flex: 1,
                overflowX: "auto", // make sure it's scrollable
                scrollBehavior: "smooth",
            }}
            >

            {movies.map((movie) => (
            <div
                key={movie.showId}
                style={{
                minWidth: "200px",
                padding: "10px",
                borderRadius: "8px",
                textAlign: "center",
                flexShrink: 0,
                }}
            >
                <img
                src={`https://intexmovieposters14.blob.core.windows.net/posters/Movie%20Posters/${encodeURIComponent(movie.title)}.jpg`}
                alt={movie.title}
                onError={(e) => (e.currentTarget.src = "/fallback-poster.png")}
                style={{
                    width: "100%",
                    height: "300px",
                    objectFit: "cover",
                    borderRadius: "6px",
                    marginBottom: "8px",
                }}
                />
                <div
                style={{
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                    color: "#6c3f18",
                }}
                >
                {movie.title}
                </div>
            </div>
            ))}
        </div>

        {/* Right Arrow */}
        {!atEnd && (
            <button
            onClick={() => scroll("right")}
            style={{
                background: "transparent",
                border: "none",
                fontSize: "2rem",
                color: "transparent",
                cursor: "pointer",
                marginLeft: "10px", // optional spacing
            }}
            >
            &#10095;
            </button>
        )}
        </div>

    </div>
  );
};

export default CarouselHomePage;
