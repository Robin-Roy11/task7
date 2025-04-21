function SearchBar({ searchTerm, setSearchTerm, type, setType }) {
    return (
      <div className="search-bar">
        <input
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search movies..."
        />
        <select value={type} onChange={e => setType(e.target.value)}>
          <option value="">All</option>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
          <option value="episode">Episode</option>
        </select>
      </div>
    );
  }
  export default SearchBar;
  