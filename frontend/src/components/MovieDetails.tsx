// MovieDetails.tsx
import React, { useEffect, useState } from 'react';
import { Movie } from '../types/Movie';
import { fetchMovieDetails, fetchRecommendations, rateMovie } from '../api/MoviesAPI'; // Import rateMovie
import 'bootstrap/dist/css/bootstrap.min.css';
import RatingStars from './RatingStars';
import './index.css'; // Or your main CSS file

interface MovieRecommendation {
  showId: string;
  title: string;
  similarity: number;
}

interface Props {
  movieId: string;
}

const MovieDetails: React.FC<Props> = ({ movieId: initialMovieId }) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [recommendations, setRecommendations] = useState<MovieRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [currentMovieId, setCurrentMovieId] = useState<string>(initialMovieId);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const movieData = await fetchMovieDetails(currentMovieId);
        let recs: MovieRecommendation[] = [];
        try {
          recs = await fetchRecommendations(currentMovieId);
        } catch (recError: any) {
          if (recError.message?.includes("404")) {
            recs = [];
          } else {
            throw recError;
          }
        }
        setMovie(movieData);
        setRecommendations(recs);
      } catch (err: any) {
        setError(err.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [currentMovieId]);

  const handleRatingChange = async (newRating: number | null) => {
    setUserRating(newRating);
    console.log(`User's rating: ${newRating}`);

    if (newRating !== null) {
      const authToken = localStorage.getItem('authToken');
      try {
        const response = await rateMovie(currentMovieId, newRating, authToken);
        console.log('Rating submitted successfully:', response);
        // Optionally, update UI
      } catch (error: any) {
        console.error('Error submitting rating:', error.message);
        // Optionally, display error
      }
    }
  };

  const handleWatchNowClick = () => {
    window.open('https://www.netflix.com/browse', '_blank');
  };

  const handleRecommendationClick = (showId: string) => {
    setCurrentMovieId(showId);
  };

  if (loading) {
    return (
      <div className="min-h-screen d-flex align-items-center justify-content-center bg-image text-white page-container">
        Loading movie details...
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen d-flex align-items-center justify-content-center bg-image text-danger page-container">
        Error: {error}
      </div>
    );
  }
  if (!movie) return null;

  const encodedTitle = encodeURIComponent(movie.title || 'default-title');
  const posterUrl = `https://intexmovieposters14.blob.core.windows.net/posters/Movie%20Posters/${encodedTitle}.jpg`;
  const creamOpaque = 'rgba(245, 245, 220, 0.9)';
  const turquoise = '#30D5C8';

  const yearDisplay = movie.releaseYear ? movie.releaseYear : 'Unknown';
  const ratingDisplay = movie.rating !== undefined && movie.rating !== null ? movie.rating : 'Unknown';
  const durationDisplay = movie.duration ? movie.duration : 'Unknown';
  const directorDisplay = movie.director ? movie.director : 'Unknown';
  const castDisplay = movie.cast ? movie.cast : 'Unknown';
  const descriptionDisplay = movie.description ? movie.description : 'Unknown';

  const recommendationTileStyle = {
    backgroundColor: creamOpaque,
    transition: 'transform 0.2s ease-in-out',
    cursor: 'pointer',
  };

  const recommendationTileHoverStyle = {
    transform: 'scale(1.05)',
  };

  return (
    <div className="min-h-screen bg-image text-white py-5 page-container" style={{ backgroundImage: `url('./SquiglyStripes.png')`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', position: 'relative' }}>
      <div className="container">
        <div className="row mb-4 rounded p-3" style={{ backgroundColor: creamOpaque }}>
          {/* Movie Poster Column */}
          <div className="col-md-4">
            <div className="rounded shadow" style={{ backgroundColor: creamOpaque }}>
              <img
                src={posterUrl}
                alt={movie.title || 'Unknown Poster'}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = './fallback-poster.png';
                }}
                className="img-fluid rounded"
                style={{ maxHeight: '350px', objectFit: 'contain', width: '100%' }}
              />
            </div>
          </div>
          {/* Movie Details Column */}
          <div className="col-md-8 position-relative" style={{ backgroundColor: creamOpaque, padding: '1.5rem' }}>
            <h2 className="font-weight-bold text-dark">{movie.title || 'Unknown Title'}</h2>
            <p className="text-muted text-dark d-flex align-items-center">
              <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                <span>{yearDisplay}</span>
                {ratingDisplay && <span style={{ marginLeft: '0.5rem' }}> | Rating: {ratingDisplay}</span>}
                {durationDisplay && <span style={{ marginLeft: '0.5rem' }}> | {durationDisplay}</span>}
                <span style={{ marginLeft: '1rem' }}>
                  <div className="rating-inline" style={{ display: 'inline-flex', alignItems: 'center' }}>
                    <RatingStars onRatingChange={handleRatingChange} initialRating={userRating} />
                  </div>
                </span>
              </span>
            </p>
            {/* Watch Now Button */}
            <button
              className="btn"
              style={{ backgroundColor: turquoise, color: 'white', marginBottom: '10px' }}
              onClick={handleWatchNowClick}
            >
              Watch Now
            </button>
            <p className="text-dark"><strong>Directors:</strong> {directorDisplay}</p>
            <p className="text-dark"><strong>Cast:</strong> {castDisplay}</p>
            <p className="mt-3 text-dark">{descriptionDisplay}</p>
          </div>
        </div>

        {/* Recommendations Row */}
        {recommendations.length > 0 && (
          <div className="row mt-4 rounded p-3" style={{ backgroundColor: creamOpaque }}>
            <h3 className="font-weight-semibold mb-3 text-dark">Recommended Movies</h3>
            <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3">
              {recommendations.map((rec) => (
                <div key={rec.showId} className="col" style={{ cursor: 'pointer' }} onClick={() => handleRecommendationClick(rec.showId)}>
                  <div
                    className="rounded p-2 text-center"
                    style={{ ...recommendationTileStyle }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = recommendationTileHoverStyle.transform)}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  >
                    <img
                      src={`https://intexmovieposters14.blob.core.windows.net/posters/Movie%20Posters/${encodeURIComponent(rec.title)}.jpg`}
                      alt={rec.title || 'Unknown Poster'}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = './fallback-poster.png';
                      }}
                      className="img-fluid rounded mb-2"
                      style={{ maxHeight: '150px', objectFit: 'contain', width: '100%' }}
                    />
                    <p className="font-weight-medium text-dark mb-0 text-sm">{rec.title || 'Unknown'}</p>
                    <p className="text-muted small text-dark mb-0">Similarity: {rec.similarity.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {recommendations.length === 0 && !loading && !error && (
          <div className="row mt-4 rounded p-3" style={{ backgroundColor: creamOpaque }}>
            <p className="text-muted italic text-dark">No recommendations available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;