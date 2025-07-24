import MainScreen from '../../pages/main/main-screen';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import LoginScreen from '../../pages/login/login-screen';
import MyQuestsScreen from '../../pages/my-quests/my-quests-screen';
import BookingScreen from '../../pages/booking/booking-screen';
import DetailedQuestScreen from '../../pages/detailed-quest/detailed-quest-screen';
import ContactsScreen from '../../pages/contacts/contacts-screen';
import { HelmetProvider } from 'react-helmet-async';
import browserHistory from '../../browser-history';
import HistoryRouter from '../../history-router';
import WrongScreen from '../../pages/wrong/wrong-screen';
import NotFoundScreen from '../../pages/not-found/not-found-screen';

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route path={AppRoute.MAIN} element={<MainScreen />} />
          <Route path={AppRoute.ERROR} element={<WrongScreen />} />
          <Route path="*" element={<NotFoundScreen />} />
          <Route path={AppRoute.LOGIN} element={<LoginScreen />} />
          <Route path={AppRoute.MY_QUESTS} element={<MyQuestsScreen />} />
          <Route path={AppRoute.BOOKING} element={<BookingScreen />} />
          <Route path={AppRoute.QUEST} element={<DetailedQuestScreen />} />
          <Route path={AppRoute.CONTACTS} element={<ContactsScreen />} />
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;
