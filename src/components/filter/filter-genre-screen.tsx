import { filterGenreButtonsData } from '../../const';

export default function FilterGenreScreen(): JSX.Element {
  const activeFilter = Object.keys(filterGenreButtonsData)[0];

  return (
    <ul className="filter__list">
      {Object.entries(filterGenreButtonsData).map(([key, label]) => (
        <li className="filter__item" key={key}>
          <input
            type="radio"
            name="type"
            id={key}
            checked={key === activeFilter}
          />
          <label className="filter__label" htmlFor={key}>
            <svg
              className="filter__icon"
              width={26}
              height={30}
              aria-hidden="true"
            >
              <use
                xlinkHref={
                  key === Object.keys(filterGenreButtonsData)[0]
                    ? '#icon-all-quests'
                    : `#icon-${key}`
                }
              />
            </svg>
            <span className="filter__label-text">{label}</span>
          </label>
        </li>
      ))}
    </ul>
  );
}
