import { Movie } from "../types/Movie";

interface FetchMoviesResponse {
    movies : Movie[];
}

const api_url = "https://localhost:4000"

export const fetchMovies = async (): Promise<FetchMoviesResponse> => {
  try {
    const response = await fetch(`${api_url}/Movies/GetMovies`, {
      credentials: 'include'
    });
    const data = await response.json();
    console.log('Fetched Movies:', data); // Print the response
    return data;
  } catch (error) {
    console.error('Error fetching movies', error);
    throw error;
  }
};



export const addMovie = async (movie: Movie): Promise<{ success: boolean; newId: number }> => {
    try {
      const response = await fetch(`${api_url}/Movies/AddMovie`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movie),
      });
  
      if (!response.ok) throw new Error('Network response was not ok');
  
      const data = await response.json();
  
      // This assumes your API returns something like { id: 123 }
      return {
        success: true,
        newId: data.id || 0, // or whatever your backend returns
      };
    } catch (error) {
      console.error('Error adding movie:', error);
      return { success: false, newId: 0 };
    }
  };

  export const deleteMovie = async (id: number): Promise<void> => {
    try {
      await fetch(`${api_url}/Movies/DeleteMovie/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Error deleting movie:', error);
      throw error;
    }
  };

  export const updateMovie = async (movie: any): Promise<void> => {
    try {
      await fetch(`${api_url}/Movies/UpdateMovie/${movie.showId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(movie)
      });
    } catch (error) {
      console.error("Error updating movie:", error);
      throw error;
    }
  };
  
  
