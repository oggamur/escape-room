import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './wrong-screen.css';

function WrongScreen(): JSX.Element {
  return (
    <div className="not-found-container">
      <Helmet>
        <title>Что-то пошло не так</title>
      </Helmet>

      <main className="not-found-main">
        <div className="content-wrapper">
          <div className="error-code">404</div>
          <h1 className="error-title">Page Not Found</h1>
          <p className="error-description">
            Something is went wrong.
            <br />
            Please try again.
          </p>
          <Link to="/" className="home-link">
            Go Back Home
          </Link>
        </div>
      </main>
    </div>
  );
}

export default WrongScreen;
