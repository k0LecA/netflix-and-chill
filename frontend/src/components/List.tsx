import { useState } from 'react';
import '@/App.css';
import MovieCard from './MovieCard';
import { useMovies } from '@/hooks/useMovies';
import AddMovieModal from './AddMovieModal';

function List() {
  const { movies, isLoading, error, createMovie } = useMovies();
  const [isModalOpen,setIsModalOpen] = useState(false);

  if(isLoading) return <div>Loading...</div>
  if(error) return <div>Error: {error}</div>

  return (
    <div className='app-container'>
      <h1>My favorite movies list</h1>
      <div className='movies-list'>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}

        <div className='movie-card add-card' onClick={()=>setIsModalOpen(true)}>
          <h3>+ Add</h3>
        </div>

      </div>
      <AddMovieModal show={isModalOpen} onClose={()=>setIsModalOpen(false)} createMovie={createMovie}/>
    </div>
  );
}

export default List
