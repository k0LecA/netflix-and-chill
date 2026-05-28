import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [movies, setMovies] = useState<any[]>([]);
  useEffect(()=>{
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:3000/movies');
        const data = await response.json();

        setMovies(data);
      } catch (error) {
        console.error('error getting movies: ',error);
      }
    };
    fetchMovies();
  }, []);

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

export default App
