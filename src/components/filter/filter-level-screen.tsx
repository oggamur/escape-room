import { filterLevelButtonsData } from '../../const';

export default function FilterLevelScreen(): JSX.Element {
  const activeFilter = Object.keys(filterLevelButtonsData)[0];

  return (
    <ul className="filter__list">
      {Object.entries(filterLevelButtonsData).map(([key, label]) => (
        <li className="filter__item" key={key}>
          <input
            type="radio"
            name="level"
            id={key}
            checked={key === activeFilter}
          />
          <label className="filter__label" htmlFor={key}>
            <span className="filter__label-text">{label}</span>
          </label>
        </li>
      ))}
    </ul>
  );
}
