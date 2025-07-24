import { QuestCardScreenType } from '../../types/types';
import { filterLevelButtonsData } from '../../const';
import { Link } from 'react-router-dom';

export default function QuestCardScreen({
  cardProps,
}: QuestCardScreenType): JSX.Element {
  const { title, previewImg, previewImgWebp, level, peopleMinMax, id } =
    cardProps;
  const [peopleMin, peopleMax] = peopleMinMax;
  return (
    <div className="quest-card">
      <div className="quest-card__img">
        <Link to={`/quest/${id}`}>
          <picture>
            <source
              type="image/webp"
              srcSet={`${previewImgWebp}, ${previewImgWebp} 2x`}
            />
            <img
              src={previewImg}
              srcSet={`${previewImg} 2x`}
              width={344}
              height={232}
              alt={title}
            />
          </picture>
        </Link>
      </div>
      <div className="quest-card__content">
        <div className="quest-card__info-wrapper">
          <Link className="quest-card__link" to={`/quest/${id}`}>
            {title}
          </Link>
        </div>
        <ul className="tags quest-card__tags">
          <li className="tags__item">
            <svg width={11} height={14} aria-hidden="true">
              <use xlinkHref="#icon-person" />
            </svg>
            {peopleMin}–{peopleMax}&nbsp;чел
          </li>
          <li className="tags__item">
            <svg width={14} height={14} aria-hidden="true">
              <use xlinkHref="#icon-level" />
            </svg>
            {filterLevelButtonsData[level]}
          </li>
        </ul>
      </div>
    </div>
  );
}
