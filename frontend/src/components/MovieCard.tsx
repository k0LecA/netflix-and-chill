import { Star, Calendar, Clock, Film, Trash2 } from "lucide-react";
import { useState } from "react";

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
    onDelete?: (id: number) => void | Promise<void>;
}

function MovieCard({movie, onDelete}:MovieCardProps) {
    const [isConfirming, setIsConfirming] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!onDelete) return;
        try {
            setIsDeleting(true);
            await onDelete(movie.id);
        } catch (err) {
            console.error(err);
            setIsDeleting(false);
            setIsConfirming(false);
        }
    };

    return(
        <div className="movie-card">
            {onDelete && (
                <>
                    {isConfirming ? (
                        <div className="delete-confirm-overlay" onClick={(e) => e.stopPropagation()}>
                            <p>Delete this movie?</p>
                            <div className="delete-confirm-buttons">
                                <button className="confirm-btn yes" onClick={handleDelete} disabled={isDeleting}>
                                    {isDeleting ? "Deleting..." : "Delete"}
                                </button>
                                <button className="confirm-btn no" onClick={() => setIsConfirming(false)} disabled={isDeleting}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button 
                            className="delete-button" 
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsConfirming(true);
                            }}
                            aria-label="Delete movie"
                            title="Delete movie"
                        >
                            <Trash2 size={15} />
                        </button>
                    )}
                </>
            )}
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