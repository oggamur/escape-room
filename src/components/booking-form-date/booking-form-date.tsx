import { SlotsType } from '../../types/state';
import { useAppDispatch } from '../../hooks';
import { setDate } from '../../store/booking-process/booking-process';

export default function BookingFormDate({
  time,
  isAvailable,
  day,
}: SlotsType & { day: string }): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <label className="custom-radio booking-form__date">
      <input
        type="radio"
        className="custom-radio__input"
        id="today9h45m"
        name="date"
        defaultValue="today9h45m"
        required
        disabled={!isAvailable}
        onChange={() => {
          dispatch(
            setDate({
              date: day,
              time: time,
            })
          );
        }}
      />
      <span className="custom-radio__label">{time}</span>
    </label>
  );
}
