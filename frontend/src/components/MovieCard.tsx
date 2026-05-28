interface MovieCardProps {
    movie: {
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
    };
}

function MovieCard({movie}:MovieCardProps) {
    return(
        <div className="movie-card">
            <img src={movie.posterUrl} alt={movie.name} className="movie-poster"/>
            <div className="movie-info">
                <h3>{movie.name}</h3>
                <span className="movie-rating">{movie.rating}*</span>
                <p>{movie.year}</p>
                <p>{movie.duration}</p>
                <p className="movie-desc">{movie.description}</p>
            </div>
        </div>
    );
}

export default MovieCard