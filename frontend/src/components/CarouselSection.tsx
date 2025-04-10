import React, { useRef, useState, useEffect } from "react";
import OneMovieCard from "./1MovieCard";
import { MovieCard } from "../types/MovieCard";

interface CarouselSectionProps {
  title: string;
  movieList: MovieCard[];
  onSelect: (id: string, title: string) => void;
}

const CarouselSection: React.FC<CarouselSectionProps> = ({
  title,
  movieList,
  onSelect,
}) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (el) {
      setAtStart(el.scrollLeft <= 5);
      setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 5);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.offsetWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(updateScrollButtons, 200); // Give scroll time to finish
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateScrollButtons();
    el.addEventListener("scroll", updateScrollButtons);
    return () => el.removeEventListener("scroll", updateScrollButtons);
  }, []);

  useEffect(() => {
    // Delay check to after layout has finalized
    const timeout = setTimeout(() => {
      updateScrollButtons();
    }, 100); // slight delay to allow layout to settle

    return () => clearTimeout(timeout);
  }, [movieList]);


return (
  <div className="carousel-section">
    <h2 className="carousel-title">{title}</h2>
    <div className="carousel-wrapper-barred">
      <div className="arrow-bar left-bar">
        {!atStart && (
          <button className="carousel-arrow-bar" onClick={() => scroll("left")}>
            &#10094;
          </button>
        )}
      </div>

      <div
        className="carousel"
        ref={scrollRef}
        onWheel={(e) => e.stopPropagation()}
      >
        {movieList.map((movie) => (
          <OneMovieCard
            key={movie.showId}
            movie={movie}
            onClick={() =>
              onSelect(movie.showId.toString(), movie.title ?? "Movie Details")
            }
          />
        ))}
      </div>

      <div className="arrow-bar right-bar">
        {!atEnd && (
          <button
            className="carousel-arrow-bar"
            onClick={() => scroll("right")}
          >
            &#10095;
          </button>
        )}
      </div>
    </div>
  </div>
);

};

export default CarouselSection;
