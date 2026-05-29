import { useState } from 'react';
import '@/App.css';
import MovieCard from './MovieCard';
import { useMovies } from '@/hooks/useMovies';
import AddMovieModal from './AddMovieModal';
import { Input } from '@/components/ui/input';
import { Search, Plus } from 'lucide-react';


function List() {
  const { movies, isLoading, error, createMovie, deleteMovie } = useMovies();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  if (isLoading) return <div className="loading-state">Loading...</div>;
  if (error) return <div className="error-state">Error: {error}</div>;

  const filteredMovies = movies.filter((movie) =>
    movie.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='app-container'>
      <div className="list-header">
        <h1 className="list-title">
          My favorite movies list
        </h1>
        
        <div className="search-container">
          <Search className="search-icon" />
          <Input
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className='movies-list'>
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onDelete={deleteMovie} />
        ))}

        <div className='movie-card add-card' onClick={() => setIsModalOpen(true)}>
          <Plus/>
        </div>
      </div>

      <AddMovieModal show={isModalOpen} onClose={() => setIsModalOpen(false)} createMovie={createMovie} />
    </div>
  );
}

export default List;
