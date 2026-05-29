import { Star, Calendar, Clock, Film } from "lucide-react";

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
            {movie.posterUrl ? (
                <img src={movie.posterUrl} alt={movie.name} className="movie-poster" />
            ) : (
                <div className="movie-poster-placeholder">
                <Film className="placeholder-icon" />
                </div>
            )}
            <div className="movie-info">
                <h3>{movie.name}</h3>
                <div className="movie-meta-row">
                    <span className="movie-rating">
                        <Star className="icon-star"/>
                        {movie.rating}
                    </span>
                </div>
                <p className="movie-year">
                    <Calendar className="icon-meta" />
                    {movie.year}
                </p>
                <p className="movie-duration">
                    <Clock className="icon-meta" />
                    {movie.duration} min
                </p>
                <p className="movie-desc">{movie.description}</p>
            </div>
        </div>
    );
}

export default MovieCard