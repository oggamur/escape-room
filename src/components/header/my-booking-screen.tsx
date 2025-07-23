import { AppRoute, AuthorizationStatus } from '../../const';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { useAppSelector } from '../../hooks';
import { getActivePage } from '../../store/page-process/selectors';
type MyBookingScreenType = {
  isAuthStatus: AuthorizationStatus;
};

export default function MyBookingScreen({
  isAuthStatus,
}: MyBookingScreenType): JSX.Element | null {
  const activePage = useAppSelector(getActivePage);

  if (isAuthStatus !== AuthorizationStatus.AUTH) {
    return null;
  }

  return (
    <li className="main-nav__item">
      <Link
        className={cn('link', {
          'link active': activePage === AppRoute.MY_QUESTS,
        })}
        to={AppRoute.MY_QUESTS}
      >
        Мои бронирования
      </Link>
    </li>
  );
}
