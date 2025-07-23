import { filterLevelButtonsData } from '../../const';
import { getSortLevelType } from '../../store/sorting-process/selectors';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { setSortLevelType } from '../../store/sorting-process/sorting-process';

export default function FilterLevelScreen(): JSX.Element {
  const activeFilter = useAppSelector(getSortLevelType);
  const dispatch = useAppDispatch();

  return (
    <ul className="filter__list">
      {Object.entries(filterLevelButtonsData).map(([key, label]) => (
        <li className="filter__item" key={key}>
          <input
            type="radio"
            name="level"
            id={key}
            checked={key === activeFilter}
            onChange={() => dispatch(setSortLevelType(key))}
          />
          <label className="filter__label" htmlFor={key}>
            <span className="filter__label-text">{label}</span>
          </label>
        </li>
      ))}
    </ul>
  );
}
