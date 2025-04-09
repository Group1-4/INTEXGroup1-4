// MovieDetails.tsx
import React, { useEffect, useState } from 'react';
import { Movie } from '../types/Movie';
import { fetchMovieDetails, fetchRecommendations } from '../api/MoviesAPI';
import 'bootstrap/dist/css/bootstrap.min.css';
import RatingStars from './RatingStars';

interface MovieRecommendation {
  showId: string;
  title: string;
  similarity: number;
}

interface Props {
  movieId: string;
}

const MovieDetails: React.FC<Props> = ({ movieId }) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [recommendations, setRecommendations] = useState<MovieRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userRating, setUserRating] = useState<number | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const movieData = await fetchMovieDetails(movieId);
        let recs: MovieRecommendation[] = [];
        try {
          recs = await fetchRecommendations(movieId);
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
  }, [movieId]);

  const handleRatingChange = (rating: number | null) => {
    setUserRating(rating);
    console.log(`User's rating in MovieDetails: ${rating}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen d-flex align-items-center justify-content-center bg-image text-white">
        Loading movie details...
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen d-flex align-items-center justify-content-center bg-image text-danger">
        Error: {error}
      </div>
    );
  }
  if (!movie) return null;

  const encodedTitle = encodeURIComponent(movie.title || 'default-title');
  const posterUrl = `https://intexmovieposters14.blob.core.windows.net/posters/Movie%20Posters/${encodedTitle}.jpg`;

  const yearDisplay = movie.releaseYear ? movie.releaseYear : 'Unknown';
  const ratingDisplay = movie.rating !== undefined && movie.rating !== null ? movie.rating : 'Unknown';
  const durationDisplay = movie.duration ? movie.duration : 'Unknown';
  const directorDisplay = movie.director ? movie.director : 'Unknown';
  const castDisplay = movie.cast ? movie.cast : 'Unknown';
  const descriptionDisplay = movie.description ? movie.description : 'Unknown';

  const creamOpaque = 'rgba(245, 245, 220, 0.9)'; // Opaque cream color (PapayaWhip with 90% opacity)

  return (
    <div className="min-h-screen bg-image text-white py-5" style={{ backgroundImage: `url('/images/your-background-image.jpg')`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
      <div className="container">
        <div className="row mb-4 rounded p-3" style={{ backgroundColor: creamOpaque }}>
          {/* Movie Poster Column */}
          <div className="col-md-4">
            <div className="rounded shadow" style={{ backgroundColor: creamOpaque }}>
              <img
                src={posterUrl}
                alt={movie.title || 'Unknown Poster'}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/fallback-poster.jpg';
                }}
                className="img-fluid rounded"
                style={{ maxHeight: '350px', objectFit: 'contain', width: '100%' }}
              />
            </div>
          </div>
          {/* Movie Details Column */}
          <div className="col-md-8 position-relative" style={{ backgroundColor: creamOpaque, padding: '1.5rem' }}>
            <h2 className="font-weight-bold text-dark">{movie.title || 'Unknown Title'}</h2>
            <p className="text-muted text-dark">
              <span>{yearDisplay}</span>
              <span> | Rating: {ratingDisplay}</span>
              <span> | {durationDisplay}</span>
            </p>
            {/* User Rating Component in the corner */}
            <div
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                zIndex: 10,
              }}
            >
              <RatingStars onRatingChange={handleRatingChange} />
            </div>
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
                <div key={rec.showId} className="col">
                  <div className="rounded p-2 hover-bg-light text-center" style={{ backgroundColor: creamOpaque }}>
                    <p className="font-weight-medium text-dark mb-0">{rec.title || 'Unknown'}</p>
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