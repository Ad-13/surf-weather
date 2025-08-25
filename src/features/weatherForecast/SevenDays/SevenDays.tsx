import type { IWeatherForecast } from '@src/entities/weather/types';
import { convertForecast } from '@src/shared/lib/utils.tsx';

import WeatherCard from '../WeatherCard';

import styles from './SevenDays.module.scss';

interface IProps {
  forecast: IWeatherForecast['daily'];
}

const SevenDays = ({ forecast }: IProps) => {
  const dailyForecast = convertForecast(forecast);

  return (
    <div className={styles.sevenDays}>
      <h2 className={styles.title}>7-Tage Vorhersage</h2>
      <div className={styles.cards}>
        {dailyForecast.map((item, index) => (
          <WeatherCard key={item.time} weather={item} className={styles.cardsItem} isToday={!index} />
        ))}
      </div>
    </div>
  );
};

export default SevenDays;
