import AuthButtonScreen from './auth-button-screen';
import { AppRoute } from '../../const';
import MyBookingScreen from './my-booking-screen';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import cn from 'classnames';
import { getAuthorizationStatus } from '../../store/user-process/selectors';

export default function HeaderScreen(): JSX.Element {
  const location = useLocation();
  const authStatus = useAppSelector(getAuthorizationStatus);
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const lastSegment = (): string => {
    if (pathSegments.length === 0) {
      return '/';
    } else {
      return `/${pathSegments[pathSegments.length - 1]}`;
    }
  };

  const pageRoute = lastSegment();
  return (
    <header className="header">
      <div className="container container--size-l">
        <span className="logo header__logo">
          <Link to={AppRoute.MAIN}>
            <svg width={134} height={52} aria-hidden="true">
              <use xlinkHref="#logo" />
            </svg>
          </Link>
        </span>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <Link
                className={cn('link', {
                  'link active': pageRoute === AppRoute.MAIN,
                })}
                to={AppRoute.MAIN}
              >
                Квесты
              </Link>
            </li>
            <li className="main-nav__item">
              <Link
                className={cn('link', {
                  'link active': pageRoute === AppRoute.CONTACTS,
                })}
                to={AppRoute.CONTACTS}
              >
                Контакты
              </Link>
            </li>
            <MyBookingScreen isAuthStatus={authStatus} />
          </ul>
        </nav>
        <div className="header__side-nav">
          <AuthButtonScreen isAuthStatus={authStatus} />
          <a
            className="link header__side-item header__phone-link"
            href="tel:88003335599"
          >
            8 (000) 111-11-11
          </a>
        </div>
      </div>
    </header>
  );
}
