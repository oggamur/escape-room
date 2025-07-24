import { AppRoute, AuthorizationStatus } from '../../const';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { useLocation } from 'react-router-dom';
type MyBookingScreenType = {
  isAuthStatus: AuthorizationStatus;
};

export default function MyBookingScreen({
  isAuthStatus,
}: MyBookingScreenType): JSX.Element | null {
  const location = useLocation();

  const pathSegments = location.pathname.split('/').filter(Boolean);
  const pageRoute = `/${pathSegments[pathSegments.length - 1]}`;

  if (isAuthStatus !== AuthorizationStatus.AUTH) {
    return null;
  }

  return (
    <li className="main-nav__item">
      <Link
        className={cn('link', {
          'link active': pageRoute === AppRoute.MY_QUESTS,
        })}
        to={AppRoute.MY_QUESTS}
      >
        Мои бронирования
      </Link>
    </li>
  );
}
