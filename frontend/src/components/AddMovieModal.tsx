import { Modal, Button, Form } from 'react-bootstrap';
import { useState } from 'react'
import { useGenres } from '../hooks/useGenres';

interface AddMovieModalProps {
    show: boolean
    onClose: () => void;
    createMovie: (newMovieData: any) => Promise<void>;
}

function AddMovieModal({show,onClose,createMovie}: AddMovieModalProps) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [year, setYear] = useState('');
    const [rating, setRating] = useState('');
    const [posterUrl, setPosterUrl] = useState('');
    const [duration, setDuration] = useState('');
    const [genreId, setGenreId] = useState<string>('');
    
    const { genres, isLoading: isGenresLoading } = useGenres();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!genreId){
            alert('Select a genre!');
            return;
        }

        try {
            await createMovie({
                name,
                description: description || undefined,
                year: Number(year),
                rating: Number(rating),
                posterUrl,
                genreId: Number(genreId),
                duration: Number(duration),
            });

            alert('Movie added successfully');

            setName('');
            setDescription('');
            setYear('');
            setRating('');
            setPosterUrl('');
            setDuration('');

            onClose();
        } catch (error: any) {
            alert(`Error: ${error.message}`)
        }

        
    }

    return (
        <Modal show={show} onHide={onClose} centered data-bs-theme="dark">
            <Modal.Header>
                <Modal.Title>Add New Movie</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body className="text-white" style={{ backgroundColor: '#181818' }}>
                    <Form.Group className="mb-3">
                        <Form.Label>Movie Title</Form.Label>
                        <Form.Control 
                        type="text" 
                        placeholder="Enter title"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required 
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control 
                        as="textarea" 
                        rows={3} 
                        placeholder="Enter description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Genre</Form.Label>
                        <Form.Select 
                        value={genreId} 
                        onChange={(e) => setGenreId(e.target.value)}
                        required
                        disabled={isGenresLoading}
                        >
                        <option value="">-- Select Genre --</option>

                        {genres.map((genre) => (
                        <option key={genre.id} value={genre.id}>
                        {genre.name}
                        </option>
                        ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Year</Form.Label>
                        <Form.Control 
                        type="text" 
                        placeholder="Enter year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control 
                        type="text" 
                        placeholder="Enter rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Poster</Form.Label>
                        <Form.Control 
                        type="text" 
                        placeholder="Enter image url"
                        value={posterUrl}
                        onChange={(e) => setPosterUrl(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Duration</Form.Label>
                        <Form.Control 
                        type="text" 
                        placeholder="Enter duration in minutes"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        />
                    </Form.Group>

                </Modal.Body>

                <Modal.Footer className="border-secondary" style={{ backgroundColor: '#181818' }}>
                    <Button variant="secondary" onClick={onClose}>
                    Cancel
                    </Button>
                    <Button variant="danger" type="submit">
                    Save Movie
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default AddMovieModal;