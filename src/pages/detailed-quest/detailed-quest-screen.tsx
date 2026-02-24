import HeaderScreen from '../../components/header/header-screen';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchDetailedQuestDataAction } from '../../store/api-actions';
import {
  getDetailedQuestData,
  getDetailedQuestHasError,
  getDetailedQuestIsLoading,
} from '../../store/detailed-process/selectors';
import WrongScreen from '../wrong/wrong-screen';
import { filterGenreButtonsData, filterLevelButtonsData } from '../../const';
import LoadingScreen from '../loading/loading-screen';
import { Helmet } from 'react-helmet-async';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { AuthorizationStatus } from '../../const';
import { AppRoute } from '../../const';
import FooterScreen from '../../components/footer/footer-tsx';
import SpriteScreen from '../../components/sprite/sprite-screen';

export default function DetailedQuestScreen(): JSX.Element {
  const dispatch = useAppDispatch();

  const { id } = useParams();
  const hasError = useAppSelector(getDetailedQuestHasError);
  const isLoading = useAppSelector(getDetailedQuestIsLoading);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  useEffect(() => {
    dispatch(fetchDetailedQuestDataAction(id));
  }, [dispatch, id]);
  const detailedQuestData = useAppSelector(getDetailedQuestData);

  if (isLoading) {
    return <LoadingScreen size={60} color="#c75d29" />;
  }
  if (!detailedQuestData || hasError) {
    return <WrongScreen />;
  }

  return (
    <>
      <Helmet>
        <title>Квест - Escape Room</title>
      </Helmet>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <meta name="description" content="Escape Room — квесты в Санкт-Петербурге" />
      <link rel="apple-touch-icon" sizes="180x180" href="favicon/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="favicon/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="favicon/favicon-16x16.png" />
      <link rel="manifest" href="favicon/site.webmanifest" crossOrigin="use-credentials" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#141414" />
      <link rel="shortcut icon" href="favicon/favicon.ico" />
      <meta name="msapplication-TileColor" content="#141414" />
      <meta name="theme-color" content="#141414" />
      <link rel="preload" href="fonts/raleway-800.woff2" as="font" crossOrigin="anonymous" />
      <link rel="preload" href="fonts/raleway-600.woff2" as="font" crossOrigin="anonymous" />
      <link rel="stylesheet" href="/markup/css/style.min.css" />
      <SpriteScreen />
      <div className="wrapper">
        <HeaderScreen />
        <main className="decorated-page quest-page">
          <div className="decorated-page__decor" aria-hidden="true">
            <picture>
              <source
                type="image/webp"
                srcSet={`${detailedQuestData.previewImgWebp}, ${detailedQuestData.coverImgWebp} 2x`}
              />
              <img
                src={detailedQuestData.previewImg}
                srcSet={`${detailedQuestData.coverImg} 2x`}
                width={1366}
                height={768}
                alt={detailedQuestData.title}
              />
            </picture>
          </div>
          <div className="container container--size-l">
            <div className="quest-page__content">
              <h1 className="title title--size-l title--uppercase quest-page__title">
                {detailedQuestData.title}
              </h1>
              <p className="subtitle quest-page__subtitle">
                <span className="visually-hidden">Жанр:</span>
                {filterGenreButtonsData[detailedQuestData.type]}
              </p>
              <ul className="tags tags--size-l quest-page__tags">
                <li className="tags__item">
                  <svg width={11} height={14} aria-hidden="true">
                    <use xlinkHref="#icon-person" />
                  </svg>
                  {detailedQuestData.peopleMinMax[0]}–{detailedQuestData.peopleMinMax[1]}&nbsp;чел
                </li>
                <li className="tags__item">
                  <svg width={14} height={14} aria-hidden="true">
                    <use xlinkHref="#icon-level" />
                  </svg>
                  {filterLevelButtonsData[detailedQuestData.level]}
                </li>
              </ul>
              <p className="quest-page__description">{detailedQuestData.description}</p>
              {authorizationStatus === AuthorizationStatus.AUTH && (
                <Link
                  className="btn btn--accent btn--cta quest-page__btn"
                  to={`/booking/${detailedQuestData.id}`}
                >
                  Забронировать
                </Link>
              )}
              {authorizationStatus === AuthorizationStatus.NO_AUTH && (
                <Link className="btn btn--accent btn--cta quest-page__btn" to={AppRoute.LOGIN}>
                  Забронировать
                </Link>
              )}
            </div>
          </div>
        </main>
        <FooterScreen />
      </div>
    </>
  );
}
