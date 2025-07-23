import AuthButtonScreen from './auth-button-screen';
import { AppRoute, AuthorizationStatus } from '../../const';
import MyBookingScreen from './my-booking-screen';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getActivePage } from '../../store/page-process/selectors';
import cn from 'classnames';

export default function HeaderScreen(): JSX.Element {
  const activePage = useAppSelector(getActivePage);

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
                  'link active': activePage === AppRoute.MAIN,
                })}
                to={AppRoute.MAIN}
              >
                Квесты
              </Link>
            </li>
            <li className="main-nav__item">
              <Link
                className={cn('link', {
                  'link active': activePage === AppRoute.CONTACTS,
                })}
                to={AppRoute.CONTACTS}
              >
                Контакты
              </Link>
            </li>
            <MyBookingScreen isAuthStatus={AuthorizationStatus.AUTH} />
          </ul>
        </nav>
        <div className="header__side-nav">
          <AuthButtonScreen isAuthStatus={AuthorizationStatus.AUTH} />
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
