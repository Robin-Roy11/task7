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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovies() {
      setLoading(true);
      try {
        const data = await fetchMovies(searchTerm, page, type);
        if (data.Response === 'True') {
          setMovies(data.Search || []);
          setTotalResults(parseInt(data.totalResults));
          setError('');
        } else {
          setMovies([]);
          setError(data.Error || 'No movies found');
        }
      } catch {
        setMovies([]);
        setError('Something went wrong. Try again!');
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, [searchTerm, page, type]);

  return (
    <div className="home-container">
      <h1 className="home-title">🎬 Movie Search App</h1>
      <SearchBar {...{ searchTerm, setSearchTerm, type, setType }} />
      
      {error && <p className="error">{error}</p>}
      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <div className="movie-grid">
          {Array.isArray(movies) && movies.map(movie => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}

      {!loading && totalResults > 10 && (
        <div className="pagination">
          <button
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
            className="pagination-btn"
          >
            Previous
          </button>
          <span>Page {page}</span>
          <button
            disabled={page * 10 >= totalResults}
            onClick={() => setPage(p => p + 1)}
            className="pagination-btn"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;