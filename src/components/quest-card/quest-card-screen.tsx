import { QuestCardScreenType } from '../../types/types';
import { filterLevelButtonsData } from '../../const';
export default function QuestCardScreen({
  cardProps,
}: QuestCardScreenType): JSX.Element {
  const { title, previewImg, previewImgWebp, level, peopleMinMax } = cardProps;
  const [peopleMin, peopleMax] = peopleMinMax;
  return (
    <div className="quest-card">
      <div className="quest-card__img">
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
      </div>
      <div className="quest-card__content">
        <div className="quest-card__info-wrapper">
          <a className="quest-card__link" href="quest.html">
            {title}
          </a>
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
