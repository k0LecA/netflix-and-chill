const BASE_URL = 'http://localhost:3000/movies';

export interface Movie {
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

export const moviesApi = {
  async getAll(): Promise<Movie[]> {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error('Error loading movies list');
    return response.json();
  },

  async getOne(id: number): Promise<Movie> {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) throw new Error('Movie not found');
    return response.json();
  },

  async create(data: Omit<Movie, 'id' | 'genre'> & { genreId: number }): Promise<Movie> {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Error adding movie');
    }
    return response.json();
  },

  async update(id: number, data: Partial<Omit<Movie, 'id' | 'genre'>> & { genreId?: number }): Promise<Movie> {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Error updating movie');
    }
    return response.json();
  },

  async remove(id: number): Promise<{ success: boolean }> {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error('Error deleting movie');
    return response.json();
  }
};