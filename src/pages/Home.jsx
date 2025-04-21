import { useState, useEffect } from 'react';
import { fetchMovies } from '../services/omdbService';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';

function Home() {
  const [searchTerm, setSearchTerm] = useState('batman');
  const [type, setType] = useState('');
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadMovies() {
      try {
        const data = await fetchMovies(searchTerm, page, type);
        if (data.Response === 'True') {
          setMovies(data.Search);
          setTotalResults(parseInt(data.totalResults));
          setError('');
        } else {
          setMovies([]);
          setError(data.Error);
        }
      } catch {
        setError('Something went wrong. Try again!');
      }
    }

    loadMovies();
  }, [searchTerm, page, type]);

  return (
    <div>
      <h1>🎬 Movie Search App</h1>
      <SearchBar {...{ searchTerm, setSearchTerm, type, setType }} />
      {error && <p>{error}</p>}
      <div className="movie-grid">
        {movies.map(movie => <MovieCard key={movie.imdbID} movie={movie} />)}
      </div>
      {totalResults > 10 && (
        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>Previous</button>
          <span>Page {page}</span>
          <button disabled={page * 10 >= totalResults} onClick={() => setPage(p => p + 1)}>Next</button>
        </div>
      )}
    </div>
  );
}
export default Home;
