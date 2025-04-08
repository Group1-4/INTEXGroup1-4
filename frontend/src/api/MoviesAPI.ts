import { Movie } from "../types/Movie";
import { MovieCard } from "../types/MovieCard";

const API_URL = "http://localhost:4000";

// ----- Shared Types -----
interface FetchMoviesResponse {
  movies: Movie[];
}

interface FetchMoviesCardsResponse {
  movies: MovieCard[];
  hasMore: boolean;
}

interface AddMovieResponse {
  success: boolean;
  newId: number;
}

// ----- API Functions -----

export const fetchMovies = async (): Promise<Movie[]> => {
  try {
    const response = await fetch(`${API_URL}/Movies/GetMovies`, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Fetch failed with status: ${response.status}`);
    }

    const data: Movie[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};


export const addMovie = async (movie: Movie): Promise<AddMovieResponse> => {
  try {
    const response = await fetch(`${API_URL}/Movies/AddMovie`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(movie),
    });

    if (!response.ok) {
      throw new Error(`Failed to add movie: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      success: true,
      newId: data.id ?? 0,
    };
  } catch (error) {
    console.error("Error adding movie:", error);
    return { success: false, newId: 0 };
  }
};

export const deleteMovie = async (id: number): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/Movies/DeleteMovie/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete movie with status: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error("Error deleting movie:", error);
    return false;
  }
};

export const updateMovie = async (movie: Movie): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/Movies/UpdateMovie/${movie.showId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(movie),
    });

    if (!response.ok) {
      throw new Error(`Failed to update movie: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error("Error updating movie:", error);
    return false;
  }
};

export const fetchMoviesCard = async (
  page: number,
  pageSize: number = 20

): Promise<FetchMoviesCardsResponse> => {
  try {
    const response = await fetch(
      `${API_URL}/Movies/MovieList/${page}/${pageSize}`,
      { credentials: "include" }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch movie cards: ${response.status}`);
    }

    const data: FetchMoviesCardsResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie cards:", error);
    throw error;
  }
};

export const fetchMoviesPaginated = async (page: number, pageSize: number): Promise<{ movies: Movie[], total: number }> => {
  const response = await fetch(`${API_URL}/Movies/GetMovies?page=${page}&pageSize=${pageSize}`, {
    credentials: 'include'
  });

  if (!response.ok) throw new Error('Failed to fetch paginated movies');

  return await response.json();
};

