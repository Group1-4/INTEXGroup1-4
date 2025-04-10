export interface Movie {
    showId: string;
    type?: string;
    title?: string;
    director?: string;
    cast?: string;
    country?: string;
    releaseYear?: string;
    rating?: string;
    duration?: string;
    description?: string;
    [key: string]: any; // allow dynamic category keys
  }
  