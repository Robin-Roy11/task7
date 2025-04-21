import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchMovieDetails } from '../services/omdbService';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function getMovie() {
      try {
        const data = await fetchMovieDetails(id);
        if (data.Response === 'True') {
          setMovie(data);
          setError('');
        } else {
          setError(data.Error);
        }
      } catch {
        setError('Failed to load movie details.');
      }
    }

    getMovie();
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!movie) return <p>Loading...</p>;

  return (
    <div className="movie-details">
      <img src={movie.Poster} alt={movie.Title} />
      <h2>{movie.Title} ({movie.Year})</h2>
      <p><strong>Genre:</strong> {movie.Genre}</p>
      <p><strong>Plot:</strong> {movie.Plot}</p>
      <p><strong>Actors:</strong> {movie.Actors}</p>
      <p><strong>Rating:</strong> {movie.imdbRating}</p>
    </div>
  );
}
export default MovieDetails;
