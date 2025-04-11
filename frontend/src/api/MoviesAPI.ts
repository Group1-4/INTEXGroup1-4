import { Movie } from "../types/Movie";
import { MovieCard } from "../types/MovieCard";

export const API_URL = import.meta.env.VITE_API_URL;

// ----- Shared Types -----
// interface FetchMoviesResponse {
//   movies: Movie[];
//   total: number;
// }

interface FetchMoviesCardsResponse {
  movies: MovieCard[];
  hasMore: boolean;
}

interface AddMovieResponse {
  success: boolean;
  newId: number;
}

// ----- API Functions -----

export const fetchMovies = async (
  page: number,
  pageSize: number
): Promise<{ movies: Movie[]; total: number }> => {
  const response = await fetch(
    `${API_URL}/Movies/GetMovies?page=${page + 1}&pageSize=${pageSize}`,
    {
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error(`Fetch failed with status: ${response.status}`);
  }

  return await response.json();
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

export const deleteMovie = async (id: string): Promise<boolean> => {
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
  pageSize: number = 20,
  selectedCategories: string[] = [],
  searchField: string = "",
  searchQuery: string = ""
): Promise<FetchMoviesCardsResponse> => {
  const params = new URLSearchParams();

  if (selectedCategories.length > 0) {
    params.append("categories", selectedCategories.join(","));
  }

  if (searchField && searchQuery) {
    params.append("searchField", searchField);
    params.append("searchQuery", searchQuery);
  }

  const response = await fetch(
    `${API_URL}/Movies/MovieList/${page}/${pageSize}?${params.toString()}`,
    { credentials: "include" }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch movie cards: ${response.status}`);
  }

  return await response.json();
};




export const fetchMoviesPaginated = async (page: number, pageSize: number): Promise<{ movies: Movie[], total: number }> => {
  const response = await fetch(`${API_URL}/Movies/GetMovies?page=${page}&pageSize=${pageSize}`, {
    credentials: 'include'
  });

  if (!response.ok) throw new Error('Failed to fetch paginated movies');

  return await response.json();
};


// fetch movie details for product page

export const fetchMovieDetails = async (id: string): Promise<MovieCard> => {
  const response = await fetch(`${API_URL}/Movies/MovieDetails/${id}`, {
    credentials: "include"
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch movie details: ${response.status}`);
  }

  return await response.json();
};


// product details recommendations
export interface MovieRecommendation {
  showId: string;
  title: string;
  similarity: number;
}

export const fetchRecommendations = async (id: string): Promise<MovieRecommendation[]> => {
  const response = await fetch(`${API_URL}/Recommender/ContentBased/${id}`, {
    credentials: "include"
  });

  if (response.status === 404) {
    return []; // ⛔️ No recommendations — return empty list
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch recommendations: ${response.status}`);
  }

  return await response.json();
};

// ----- User Rating API Function -----
export async function rateMovie(movieId: string, rating: number) {
  try {
    const response = await fetch(
      `${API_URL}/Recommender/rate/${movieId}/${rating}`,
      {
        method: "POST",
        credentials: "include", // important for cookie-based auth
      }
    );

    if (!response.ok) {
      // If there's an error response, try to parse the error message
      let errorMessage = `Failed to rate movie (status: ${response.status})`;
      try {
        const errorData = await response.json();
        if (errorData.message) errorMessage = errorData.message;
      } catch {}
      throw new Error(errorMessage);
    }

    // Safely try to parse JSON only if content exists
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      return data;
    }

    return { message: "Rating saved (no content returned)." };
  } catch (error) {
    console.error("Error rating movie:", error);
    throw error;
  }
}


export async function fetchUserMovieDetails(movieId: string) {
  const response = await fetch(`${API_URL}/Recommender/UserMovieDetails/${movieId}`, {
    method: "GET",
    credentials: "include", // needed for cookies to send the auth info
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user movie details");
  }

  const data = await response.json();

  return {
    movie: data.movie,
    userRating: data.userRating,
  };
}


//log out user and send to home page
// src/api/AuthAPI.ts
export const logoutUser = async () => {
  await fetch(`${API_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });
};
