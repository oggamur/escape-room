import HeaderScreen from '../../components/header/header-screen';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBookingDataAction, fetchDetailedQuestDataAction } from '../../store/api-actions';
import {
  getActiveBookingData,
  getBookingQuestData,
  getBookingQuestHasError,
  getBookingQuestIsLoading,
} from '../../store/booking-process/selectors';
import WrongScreen from '../wrong/wrong-screen';
import LoadingScreen from '../loading/loading-screen';
import {
  getDetailedQuestHasError,
  getDetailedQuestIsLoading,
  getDetailedQuestData,
} from '../../store/detailed-process/selectors';
import MapScreen from '../../components/map/map';
import BookingFormDate from '../../components/booking-form-date/booking-form-date';
import { Helmet } from 'react-helmet-async';
import { DatesForBooking } from '../../const';
import { setPlaceId, clearDataToSend } from '../../store/booking-process/booking-process';
import { postBookingAction } from '../../store/api-actions';
import { getDataToSend } from '../../store/booking-process/selectors';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useForm, Controller } from 'react-hook-form';
import FooterScreen from '../../components/footer/footer-tsx';
import SpriteScreen from '../../components/sprite/sprite-screen';

type FormData = {
  contactPerson: string;
  phone: string;
  peopleCount: number;
  withChildren: boolean;
  politicsAgreed: boolean;
};

export default function BookingScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(fetchBookingDataAction(id));
      dispatch(fetchDetailedQuestDataAction(id));
      dispatch(setPlaceId(id));
      dispatch(clearDataToSend());
    }
  }, [dispatch, id]);

  const bookingQuestData = useAppSelector(getBookingQuestData);
  const detailedQuestData = useAppSelector(getDetailedQuestData);
  const bookingDataHasError = useAppSelector(getBookingQuestHasError);
  const isBookingDataLoading = useAppSelector(getBookingQuestIsLoading);
  const detailedQuestDataHasError = useAppSelector(getDetailedQuestHasError);
  const isDetailedQuestLoading = useAppSelector(getDetailedQuestIsLoading);
  const activeBookingData = useAppSelector(getActiveBookingData);
  const dataToSend = useAppSelector(getDataToSend);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      contactPerson: '',
      phone: '',
      peopleCount: 1,
      withChildren: false,
      politicsAgreed: false,
    },
  });

  const isFormValid = () => {
    if (!detailedQuestData) {
      return false;
    }

    return isValid && !!dataToSend.time && !!dataToSend.date && !isBookingDataLoading;
  };

  const onSubmit = (formData: FormData) => {
    if (!detailedQuestData || !isFormValid()) {
      return;
    }

    dispatch(
      postBookingAction({
        data: {
          ...dataToSend,
          contactPerson: formData.contactPerson,
          phone: formData.phone,
          peopleCount: formData.peopleCount,
          withChildren: formData.withChildren,
        },
        id: detailedQuestData.id,
      }),
    );
    dispatch(clearDataToSend());
    navigate(AppRoute.MY_QUESTS);
  };

  if (isBookingDataLoading || isDetailedQuestLoading || activeBookingData === null) {
    return <LoadingScreen size={60} color="#c75d29" />;
  }

  if (!bookingQuestData || !detailedQuestData || bookingDataHasError || detailedQuestDataHasError) {
    return <WrongScreen />;
  }

  return (
    <>
      <Helmet>
        <title>Бронирование квеста - Escape Room</title>
      </Helmet>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <meta name="description" content="Escape Room — квесты в Санкт-Петербурге" />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
      <link
        rel="manifest"
        href="../markup/favicon/site.webmanifest"
        crossOrigin="use-credentials"
      />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#141414" />
      <link rel="shortcut icon" href="favicon/favicon.ico" />
      <meta name="msapplication-TileColor" content="#141414" />
      <meta name="theme-color" content="#141414" />
      <link rel="preload" href="fonts/raleway-800.woff2" as="font" crossOrigin="anonymous" />
      <link rel="preload" href="fonts/raleway-600.woff2" as="font" crossOrigin="anonymous" />
      <link rel="stylesheet" href="/markup/css/style.min.css" />
      <SpriteScreen />
      <div className="wrapper">
        <HeaderScreen />
        <main className="page-content decorated-page">
          <div className="decorated-page__decor" aria-hidden="true">
            <picture>
              <source
                type="image/webp"
                srcSet={`${detailedQuestData.previewImgWebp}, ${detailedQuestData.coverImgWebp} 2x`}
              />
              <img
                src={detailedQuestData.previewImg}
                srcSet={`${detailedQuestData.coverImg} 2x`}
                width={1366}
                height={1959}
                alt={detailedQuestData.title}
              />
            </picture>
          </div>
          <div className="container container--size-s">
            <div className="page-content__title-wrapper">
              <h1 className="subtitle subtitle--size-l page-content__subtitle">
                Бронирование квеста
              </h1>
              <p className="title title--size-m title--uppercase page-content__title">
                {detailedQuestData.title}
              </p>
            </div>
            <div className="page-content__item">
              <div className="booking-map">
                <div className="map">
                  <div className="map__container">
                    <MapScreen quests={bookingQuestData} activeQuest={activeBookingData} />
                  </div>
                </div>
                <p className="booking-map__address">
                  {`Вы выбрали: ${activeBookingData.location.address}`}
                </p>
              </div>
            </div>
            <form className="booking-form" onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
              <fieldset className="booking-form__section">
                <legend className="visually-hidden">Выбор даты и времени</legend>
                <fieldset className="booking-form__date-section">
                  <legend className="booking-form__date-title">Сегодня</legend>
                  <div className="booking-form__date-inner-wrapper">
                    {activeBookingData.slots.today.map((slot) => (
                      <BookingFormDate key={slot.time} {...slot} day={DatesForBooking.TODAY} />
                    ))}
                  </div>
                </fieldset>
                <fieldset className="booking-form__date-section">
                  <legend className="booking-form__date-title">Завтра</legend>
                  <div className="booking-form__date-inner-wrapper">
                    {activeBookingData.slots.tomorrow.map((slot) => (
                      <BookingFormDate key={slot.time} {...slot} day={DatesForBooking.TOMORROW} />
                    ))}
                  </div>
                </fieldset>
              </fieldset>
              <fieldset className="booking-form__section">
                <legend className="visually-hidden">Контактная информация</legend>
                <div
                  className={`custom-input booking-form__input ${
                    errors.contactPerson ? 'is-invalid' : ''
                  }`}
                >
                  <label className="custom-input__label" htmlFor="contactPerson">
                    Ваше имя
                  </label>
                  <input
                    type="text"
                    id="contactPerson"
                    placeholder="Имя"
                    {...register('contactPerson', {
                      required: 'Обязательное поле',
                      minLength: {
                        value: 1,
                        message: 'Минимум 1 символ',
                      },
                      maxLength: {
                        value: 15,
                        message: 'Максимум 15 символов',
                      },
                    })}
                  />
                  {errors.contactPerson && (
                    <p
                      className="error-message"
                      style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}
                    >
                      {errors.contactPerson.message}
                    </p>
                  )}
                </div>
                <div
                  className={`custom-input booking-form__input ${errors.phone ? 'is-invalid' : ''}`}
                >
                  <label className="custom-input__label" htmlFor="phone">
                    Контактный телефон
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="Телефон"
                    {...register('phone', {
                      required: 'Обязательное поле',
                      pattern: {
                        value: /^[0-9]{11}$/,
                        message: 'Телефон должен содержать 11 цифр',
                      },
                    })}
                  />
                  {errors.phone && (
                    <p
                      className="error-message"
                      style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}
                    >
                      {errors.phone.message}
                    </p>
                  )}
                </div>
                <div
                  className={`custom-input booking-form__input ${
                    errors.peopleCount ? 'is-invalid' : ''
                  }`}
                >
                  <label className="custom-input__label" htmlFor="peopleCount">
                    Количество участников
                  </label>
                  <input
                    type="number"
                    id="peopleCount"
                    placeholder="Количество участников"
                    {...register('peopleCount', {
                      required: 'Обязательное поле',
                      min: {
                        value: detailedQuestData.peopleMinMax[0],
                        message: `Минимум ${detailedQuestData.peopleMinMax[0]} участников`,
                      },
                      max: {
                        value: detailedQuestData.peopleMinMax[1],
                        message: `Максимум ${detailedQuestData.peopleMinMax[1]} участников`,
                      },
                      valueAsNumber: true,
                    })}
                  />
                  {errors.peopleCount && (
                    <p
                      className="error-message"
                      style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}
                    >
                      {errors.peopleCount.message}
                    </p>
                  )}
                </div>
                <Controller
                  name="withChildren"
                  control={control}
                  render={({ field }) => (
                    <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--children">
                      <input
                        type="checkbox"
                        id="withChildren"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                      <span className="custom-checkbox__icon">
                        <svg width={20} height={17} aria-hidden="true">
                          <use xlinkHref="#icon-tick" />
                        </svg>
                      </span>
                      <span className="custom-checkbox__label">Со&nbsp;мной будут дети</span>
                    </label>
                  )}
                />
              </fieldset>
              <button
                className="btn btn--accent btn--cta booking-form__submit"
                type="submit"
                disabled={!isFormValid()}
              >
                Забронировать
              </button>

              <Controller
                name="politicsAgreed"
                control={control}
                rules={{ required: 'Необходимо ваше согласие' }}
                render={({ field }) => (
                  <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--agreement">
                    <input
                      type="checkbox"
                      id="politicsAgreed"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                    <span className="custom-checkbox__icon">
                      <svg width={20} height={17} aria-hidden="true">
                        <use xlinkHref="#icon-tick" />
                      </svg>
                    </span>
                    <span className="custom-checkbox__label">
                      Я&nbsp;согласен с
                      <a className="link link--active-silver link--underlined" href="#">
                        правилами обработки персональных данных
                      </a>
                      &nbsp;и пользовательским соглашением
                    </span>
                    {errors.politicsAgreed && (
                      <p
                        className="error-message"
                        style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}
                      >
                        {errors.politicsAgreed.message}
                      </p>
                    )}
                  </label>
                )}
              />
            </form>
          </div>
        </main>
        <FooterScreen />
      </div>
    </>
  );
}
