interface Props {
  show: boolean;
}

export default function NoBookingsMessage({ show }: Props): JSX.Element | null {
  if (!show) {
    return null;
  }

  return (
    <div className="no-bookings-message">
      <p className="no-bookings-message__text">
        Пока у вас нет забронированных квестов.
        <br />
        Начните свое приключение!
      </p>
    </div>
  );
}
