import { Link } from 'react-router-dom';
import authService from '../../services/authService';
import './Header.css';

function Header() {
  const handleLogout = () => {
    authService.logout();
    window.location.href = '/login';
  };

  const isAuthenticated = authService.isAuthenticated();

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          Job Tracker
        </Link>
        {isAuthenticated && (
          <nav className="nav">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/applications">Applications</Link>
            <Link to="/interviews">Interviews</Link>
            <Link to="/reminders">Reminders</Link>
            <button onClick={handleLogout}>Logout</button>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
