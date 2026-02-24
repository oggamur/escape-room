import HeaderScreen from '../../components/header/header-screen';
import FilterLevelScreen from '../../components/filter/filter-level-screen';
import FilterGenreScreen from '../../components/filter/filter-genre-screen';
import {
  getQuests,
  getQuestsHasError,
  getQuestsIsLoading,
} from '../../store/quests-data/selectors';
import QuestCardScreen from '../../components/quest-card/quest-card-screen';
import { useAppSelector } from '../../hooks';
import WrongScreen from '../wrong/wrong-screen';
import LoadingScreen from '../loading/loading-screen';

import { getSortLevelType, getSortGenreType } from '../../store/sorting-process/selectors';
import { sortQuests } from '../../logic/sort-quests';
import { Helmet } from 'react-helmet-async';
import FooterScreen from '../../components/footer/footer-tsx';
import SpriteScreen from '../../components/sprite/sprite-screen';
import MetaScreen from '../../components/meta/meta-screen';

export default function MainScreen(): JSX.Element {
  const loadedQuests = useAppSelector(getQuests);
  const activeLevelSort = useAppSelector(getSortLevelType);
  const activeGenreSort = useAppSelector(getSortGenreType);
  const isQuestsLoading = useAppSelector(getQuestsIsLoading);
  const isQuestsHasError = useAppSelector(getQuestsHasError);
  const quests = sortQuests(loadedQuests, activeLevelSort, activeGenreSort);

  if (isQuestsLoading) {
    return <LoadingScreen size={60} color="#c75d29" />;
  }

  if (isQuestsHasError) {
    return <WrongScreen />;
  }
  return (
    <>
      <Helmet>
        <title>Escape Room</title>
      </Helmet>
      <MetaScreen />
      <SpriteScreen />
      <div className="wrapper">
        <HeaderScreen />
        <main className="page-content">
          <div className="container">
            <div className="page-content__title-wrapper">
              <h1 className="subtitle page-content__subtitle">квесты в Санкт-Петербурге</h1>
              <h2 className="title title--size-m page-content__title">Выберите тематику</h2>
            </div>
            <div className="page-content__item">
              <form className="filter" action="#" method="get">
                <fieldset className="filter__section">
                  <legend className="visually-hidden">Тематика</legend>
                  <FilterGenreScreen />
                </fieldset>
                <fieldset className="filter__section">
                  <legend className="visually-hidden">Сложность</legend>
                  <FilterLevelScreen />
                </fieldset>
              </form>
            </div>
            <h2 className="title visually-hidden">Выберите квест</h2>
            <div className="cards-grid">
              {quests.map((quest) => (
                <QuestCardScreen key={quest.id} cardProps={quest} />
              ))}
            </div>
          </div>
        </main>
        <FooterScreen />
      </div>
    </>
  );
}
