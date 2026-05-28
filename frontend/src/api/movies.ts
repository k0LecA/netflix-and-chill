const BASE_URL = 'http://localhost:3000/movies';

export const moviesApi = {
  async getAll() {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error('Error loading movies list');
    return response.json();
  },
  async getOne(id: number) {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) throw new Error('Movie not found');
    return response.json();
  },
  async create(data: { name: string; description: string }) {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Error adding');
    return response.json();
  },
  async update(id:number, data: { name?: string; description?: string}) {
    const response = await fetch(`${BASE_URL}/${id}`,{
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Error updating');
    return response.json();
  },
  async remove(id: number) {
    const response = await fetch(`${BASE_URL}/${id}`,{
        method: 'DELETE'
    });
    if(!response.ok) throw new Error('Error deleting');
    return response.json();
  }
};