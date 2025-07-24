import { SlotsType } from '../../types/state';

export default function BookingFormDate({
  time,
  isAvailable,
}: SlotsType): JSX.Element {
  return (
    <label className="custom-radio booking-form__date">
      <input
        type="radio"
        id="today9h45m"
        name="date"
        defaultValue="today9h45m"
        required
        disabled={!isAvailable}
      />
      <span className="custom-radio__label">{time}</span>
    </label>
  );
}
