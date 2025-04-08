export interface Movie {
    showId: number;
    type?: string;
    title?: string;
    director?: string;
    cast?: string;
    country?: string;
    releaseYear?: number;
    rating?: number;
    duration?: number;
    description?: string;
    [key: string]: any; // allow dynamic category keys
  }
  