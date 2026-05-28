import { useState, useEffect } from 'react';
import { moviesApi } from '../api/movies';

interface Movie {
  id: number;
  name: string;
  description: string;
}

export function useMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = async () => {
    try {
      setIsLoading(true);
      const data = await moviesApi.getAll();
      setMovies(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Что-то пошло не так');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);
  
  return { movies, isLoading, error, refreshMovies: fetchMovies };
}