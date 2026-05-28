import { useMovies } from '../hooks/useMovies';
import '../App.css';

function List() {
  const{ movies, isLoading, error } = useMovies();

  if (isLoading) return <div>Loading movies...</div>;
  if (error) return <div>Error: {error}</div>

  return (
    <div className='app-container'>
      <h1>My favorite movies list</h1>

      <div className='movies-list'>
        {movies.map((movie)=>(
          <div key={movie.id} className='movie-card'>
              <h3>{movie.name}</h3>
              <p>{movie.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default List
