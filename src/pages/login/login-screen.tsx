import HeaderScreen from '../../components/header/header-screen';
import FooterScreen from '../../components/footer/footer-tsx';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loginAction } from '../../store/api-actions';
import { Helmet } from 'react-helmet-async';
import { getUserHasError, getUserIsLoading } from '../../store/user-process/selectors';
import WrongScreen from '../wrong/wrong-screen';
import { useForm } from 'react-hook-form';
import SpriteScreen from '../../components/sprite/sprite-screen';
import MetaScreen from '../../components/meta/meta-screen';

type FormData = {
  email: string;
  password: string;
  userAgreement: boolean;
};

export default function LoginScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(getUserIsLoading);
  const hasError = useAppSelector(getUserHasError);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: 'onChange',
  });

  const onSubmit = (data: FormData) => {
    dispatch(
      loginAction({
        login: data.email,
        password: data.password,
      }),
    );
  };

  if (hasError) {
    return <WrongScreen />;
  }

  return (
    <>
      <Helmet>
        <title>Авторизация - Escape Room</title>
      </Helmet>
      <MetaScreen />
      <SpriteScreen />
      <div className="wrapper">
        <HeaderScreen />
        <main className="decorated-page login">
          <div className="decorated-page__decor" aria-hidden="true">
            <picture>
              <source
                type="image/webp"
                srcSet="img/content/maniac/maniac-size-m.webp, img/content/maniac/maniac-size-m@2x.webp 2x"
              />
              <img
                src="img/content/maniac/maniac-size-m.jpg"
                srcSet="img/content/maniac/maniac-size-m@2x.jpg 2x"
                width={1366}
                height={768}
                alt=""
              />
            </picture>
          </div>
          <div className="container container--size-l">
            <div className="login__form">
              <form className="login-form" onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
                <div className="login-form__inner-wrapper">
                  <h1 className="title title--size-s login-form__title">Вход</h1>
                  <div className="login-form__inputs">
                    <div
                      className={`custom-input login-form__input ${
                        errors.email ? 'is-invalid' : ''
                      }`}
                    >
                      <label className="custom-input__label" htmlFor="email">
                        E&nbsp;–&nbsp;mail
                      </label>
                      <input
                        type="email"
                        id="email"
                        placeholder="Адрес электронной почты"
                        {...register('email', {
                          required: 'Обязательное поле',
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'Некорректный email',
                          },
                        })}
                      />
                      {errors.email && (
                        <p
                          className="error-message"
                          style={{
                            color: 'red',
                            fontSize: '12px',
                            marginTop: '5px',
                          }}
                        >
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                    <div
                      className={`custom-input login-form__input ${
                        errors.password ? 'is-invalid' : ''
                      }`}
                    >
                      <label className="custom-input__label" htmlFor="password">
                        Пароль
                      </label>
                      <input
                        type="password"
                        id="password"
                        placeholder="Пароль"
                        {...register('password', {
                          required: 'Обязательное поле',
                          pattern: {
                            value: /^(?=.*[a-zA-Z])(?=.*\d).{2,}$/,
                            message: 'Минимум 1 буква, 1 цифра и более 2 символов',
                          },
                        })}
                      />
                      {errors.password && (
                        <p
                          className="error-message"
                          style={{
                            color: 'red',
                            fontSize: '12px',
                            marginTop: '5px',
                          }}
                        >
                          {errors.password.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    className="btn btn--accent btn--general login-form__submit"
                    type="submit"
                    disabled={isLoading || !isValid}
                  >
                    Войти
                  </button>
                </div>

                <label className="custom-checkbox login-form__checkbox">
                  <input
                    type="checkbox"
                    id="id-order-agreement"
                    {...register('userAgreement', {
                      required: 'Необходимо ваше согласие',
                    })}
                  />
                  <span className="custom-checkbox__icon">
                    <svg width={20} height={17} aria-hidden="true">
                      <use xlinkHref="#icon-tick" />
                    </svg>
                  </span>
                  <span className="custom-checkbox__label">
                    Я&nbsp;согласен с
                    <a className="link link--active-silver link--underlined" href="#">
                      правилами обработки персональных данных
                    </a>
                    &nbsp;и пользовательским соглашением
                  </span>
                  {errors.userAgreement && (
                    <p
                      className="error-message"
                      style={{
                        color: 'red',
                        fontSize: '12px',
                        marginTop: '5px',
                      }}
                    >
                      {errors.userAgreement.message}
                    </p>
                  )}
                </label>
              </form>
            </div>
          </div>
        </main>
        <FooterScreen />
      </div>
    </>
  );
}
