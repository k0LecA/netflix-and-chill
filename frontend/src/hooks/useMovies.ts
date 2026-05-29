import { useState, useEffect, useCallback } from 'react';
import { moviesApi } from '@/api/movies';

interface Movie {
    id: number;
    name: string;
    description?: string;
    year: number;
    rating: number;
    posterUrl: string;
    duration: number;
    genre?: {
        id: number;
        name: string;
    }
}

export function useMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await moviesApi.getAll();
      setMovies(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  },[]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);
  
  
  const createMovie = async (newMovieData: Omit<Movie, 'id' | 'genre'> & { genreId: number }) => {
    try {
      await moviesApi.create(newMovieData);
      await fetchMovies();
    } catch (err: any) {
      throw new Error(err.message || 'Failed to create movie');
    }
  };

  const deleteMovie = async (id: number) => {
    try {
      await moviesApi.remove(id);
      await fetchMovies();
    } catch (err: any) {
      throw new Error(err.message || 'Failed to delete movie');
    }
  };

  return { movies, isLoading, error, refreshMovies: fetchMovies, createMovie, deleteMovie};
}