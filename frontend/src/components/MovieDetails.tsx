import React, { useEffect, useState } from 'react';
import { Movie } from '../types/Movie';
import { fetchMovieDetails, fetchRecommendations } from '../api/MoviesAPI';

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
            recs = []; // No recommendations available
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

  if (loading) return <div className="p-4 text-white">Loading movie details...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
  if (!movie) return null;

  return (
    <div className="p-4 text-white space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{movie.title}</h2>
        <p><strong>Show ID:</strong> {movie.showId}</p>
        <p><strong>Type:</strong> {movie.type}</p>
        <p><strong>Director:</strong> {movie.director}</p>
        <p><strong>Cast:</strong> {movie.cast}</p>
        <p><strong>Country:</strong> {movie.country}</p>
        <p><strong>Year:</strong> {movie.releaseYear}</p>
        <p><strong>Rating:</strong> {movie.rating}</p>
        <p><strong>Duration:</strong> {movie.duration}</p>
        <p><strong>Description:</strong> {movie.description}</p>
      </div>

      <div>
        <h3 className="text-xl font-semibold mt-6 mb-2">Recommended Movies</h3>

        {recommendations.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {recommendations.map((rec) => (
              <div
                key={rec.showId}
                className="bg-gray-800 rounded p-3 hover:bg-gray-700 transition cursor-pointer"
              >
                <p className="font-medium">{rec.title}</p>
                <p className="text-sm text-gray-400">
                  Similarity: {rec.similarity.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 italic">No recommendations available.</p>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
