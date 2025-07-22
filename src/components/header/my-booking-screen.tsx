import { AppRoute, AuthorizationStatus } from '../../const';
import { Link } from 'react-router-dom';
type MyBookingScreenType = {
  isAuthStatus: AuthorizationStatus;
};

export default function MyBookingScreen({
  isAuthStatus,
}: MyBookingScreenType): JSX.Element | null {
  if (isAuthStatus !== AuthorizationStatus.AUTH) {
    return null;
  }
  return (
    <li className="main-nav__item">
      <Link className="link" to={AppRoute.MY_QUESTS}>
        Мои бронирования
      </Link>
    </li>
  );
}
