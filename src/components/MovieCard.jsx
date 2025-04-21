import { Link } from 'react-router-dom';

function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.imdbID}`} className="movie-card">
      <img src={movie.Poster} alt={movie.Title} />
      <h3>{movie.Title}</h3>
      <p>{movie.Year}</p>
    </Link>
  );
}
export default MovieCard;
