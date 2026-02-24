import HeaderScreen from '../../components/header/header-screen';
import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks';
import { fetchBookedQuestsDataAction } from '../../store/api-actions';
import { useAppSelector } from '../../hooks';
import {
  getMyBookedQuests,
  getMyQuestsIsLoading,
  getMyQuestsHasError,
} from '../../store/my-quests-data/selectors';
import MyQuestCardScreen from '../../components/my-quest-card/my-quest-card-screen';
import LoadingScreen from '../loading/loading-screen';
import WrongScreen from '../wrong/wrong-screen';
import NoBookingsMessage from '../../components/no-booking-message/no-booking-message';
import FooterScreen from '../../components/footer/footer-tsx';
import SpriteScreen from '../../components/sprite/sprite-screen';
import MetaScreen from '../../components/meta/meta-screen';
export default function MyQuestsScreen(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBookedQuestsDataAction());
  }, [dispatch]);

  const myQuestsIsLoading = useAppSelector(getMyQuestsIsLoading);
  const bookedQuestsList = useAppSelector(getMyBookedQuests);
  const bookingDataHasError = useAppSelector(getMyQuestsHasError);

  if (myQuestsIsLoading) {
    return <LoadingScreen size={60} color="#c75d29" />;
  }

  if (bookingDataHasError) {
    return <WrongScreen />;
  }
  return (
    <>
      <Helmet>
        <title>Мои бронирования - Escape Room</title>
      </Helmet>
      <MetaScreen />
      <SpriteScreen />
      <div className="wrapper">
        <HeaderScreen />
        <main className="page-content decorated-page">
          <div className="decorated-page__decor" aria-hidden="true">
            <picture>
              <source
                type="image/webp"
                srcSet="img/content/maniac/maniac-bg-size-m.webp, img/content/maniac/maniac-bg-size-m@2x.webp 2x"
              />
              <img
                src="img/content/maniac/maniac-bg-size-m.jpg"
                srcSet="img/content/maniac/maniac-bg-size-m@2x.jpg 2x"
                width={1366}
                height={1959}
                alt=""
              />
            </picture>
          </div>
          <div className="container">
            <div className="page-content__title-wrapper">
              <h1 className="title title--size-m page-content__title">
                {bookedQuestsList.length === 0}
                Мои бронирования
              </h1>
            </div>

            <div className="cards-grid">
              {Array.isArray(bookedQuestsList) && bookedQuestsList.length > 0 ? (
                bookedQuestsList.map((quest) => (
                  <MyQuestCardScreen myQuest={quest} key={quest.id} />
                ))
              ) : (
                <NoBookingsMessage show={bookedQuestsList.length === 0} />
              )}
            </div>
          </div>
        </main>
        <FooterScreen />
      </div>
    </>
  );
}
