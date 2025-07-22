import { AuthorizationStatus } from '../../const';

type AuthButtonScreenType = {
  isAuthStatus: AuthorizationStatus;
};

export default function AuthButtonScreen({
  isAuthStatus,
}: AuthButtonScreenType): JSX.Element {
  if (isAuthStatus === AuthorizationStatus.AUTH) {
    return (
      <a className="btn btn--accent header__side-item" href="#">
        Выйти
      </a>
    );
  }
  return (
    <a className="btn header__side-item header__login-btn" href="login.html">
      Вход
    </a>
  );
}
