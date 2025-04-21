import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">🎬 MovieFinder</Link>
      </div>
    </header>
  );
}

export default Header;
