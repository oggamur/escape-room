import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './not-found-screen.css';

function NotFoundScreen(): JSX.Element {
  return (
    <div className="not-found-container">
      <Helmet>
        <title>Страница не найдена</title>
      </Helmet>

      <main className="not-found-main">
        <div className="content-wrapper">
          <div className="error-code">404</div>
          <h1 className="error-title">Page Not Found</h1>
          <p className="error-description">
            The page you are looking for might have been removed,
            <br />
            had its name changed or is temporarily unavailable.
          </p>
          <Link to="/" className="home-link">
            Go Back Home
          </Link>
        </div>
      </main>
    </div>
  );
}

export default NotFoundScreen;
