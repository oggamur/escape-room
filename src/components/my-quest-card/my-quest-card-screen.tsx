import { MyQuestType } from '../../types/types';
import { filterLevelButtonsData, datesForBookingData } from '../../const';
import { deleteBookingAction } from '../../store/api-actions';
import { useAppDispatch } from '../../hooks';
import { deleteBooking } from '../../store/my-quests-data/my-quests-data';
type MyQuestCardType = {
  myQuest: MyQuestType;
};
export default function MyQuestCardScreen({
  myQuest,
}: MyQuestCardType): JSX.Element {
  const dispatch = useAppDispatch();
  const level = filterLevelButtonsData[myQuest.quest.level];
  const date = datesForBookingData[myQuest.date];

  return (
    <div className="quest-card">
      <div className="quest-card__img">
        <picture>
          <source
            type="image/webp"
            srcSet={`${myQuest.quest.previewImgWebp}, ${myQuest.quest.previewImgWebp} 2x`}
          />
          <img
            src={myQuest.quest.previewImgWebp}
            srcSet={`${myQuest.quest.previewImgWebp} 2x`}
            width={344}
            height={232}
            alt={myQuest.quest.title}
          />
        </picture>
      </div>
      <div className="quest-card__content">
        <div className="quest-card__info-wrapper">
          <a className="quest-card__link" href="quest.html">
            {myQuest.quest.title}
          </a>
          <span className="quest-card__info">
            {date} &nbsp;{myQuest.time}&nbsp;{myQuest.location.address}
          </span>
        </div>
        <ul className="tags quest-card__tags">
          <li className="tags__item">
            <svg width={11} height={14} aria-hidden="true">
              <use xlinkHref="#icon-person" />
            </svg>
            {`${myQuest.peopleCount} чел`}
          </li>
          <li className="tags__item">
            <svg width={14} height={14} aria-hidden="true">
              <use xlinkHref="#icon-level" />
            </svg>
            {level}
          </li>
        </ul>
        <button
          className="btn btn--accent btn--secondary quest-card__btn"
          type="button"
          onClick={() => {
            dispatch(deleteBookingAction({ id: myQuest.id }));
            dispatch(deleteBooking({ id: myQuest.id }));
          }}
        >
          Отменить
        </button>
      </div>
    </div>
  );
}
