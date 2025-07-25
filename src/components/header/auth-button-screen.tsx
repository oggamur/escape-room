import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch } from '../../hooks';
import { logoutAction } from '../../store/api-actions';
type AuthButtonScreenType = {
  isAuthStatus: AuthorizationStatus;
};

export default function AuthButtonScreen({
  isAuthStatus,
}: AuthButtonScreenType): JSX.Element {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logoutAction());
  };

  if (isAuthStatus === AuthorizationStatus.AUTH) {
    return (
      <Link
        className="btn btn--accent header__side-item"
        to={AppRoute.MAIN}
        onClick={() => {
          handleLogout();
        }}
      >
        Выйти
      </Link>
    );
  }
  return (
    <Link
      className="btn header__side-item header__login-btn"
      to={AppRoute.LOGIN}
    >
      Вход
    </Link>
  );
}
