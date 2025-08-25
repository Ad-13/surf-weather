import {
  Wind,
  Droplets,
  Waves,
  CloudRain,
} from 'lucide-react';
import Card from '@ui/Card';
import type { IWeatherForecast } from '@src/entities/weather/types';
import { getSurfConditions, getWeatherDescription, getWeatherIcon, getWindDirection } from '@src/shared/lib/utils.tsx';

import styles from './WeatherCard.module.scss';

interface IProps {
  weather: IWeatherForecast['current'];
  isToday?: boolean;
  className?: string;
}

const WeatherCard = ({ weather, isToday, className }: IProps) => {
  const surfConditions = getSurfConditions(weather.wind_speed_10m, weather.weather_code);
  const windDir = getWindDirection(weather.wind_direction_10m);
  const date = new Date(weather.time);

  const formatDate = (date: Date) => {
    if (isToday) return 'Heute';

    return date.toLocaleDateString('de-DE', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short' 
    });
  };
  console.log('WeatherCard rendered', weather);

  return (
    <Card className={`${styles.card} ${className}`}>
      <div className={styles.top}>
        <h3 className={styles.date}>{formatDate(date)} - </h3>
        <div className={styles.weatherStatus}>
          <div className={styles.weatherIcon}>{getWeatherIcon(weather.weather_code)}</div>
          <div className={styles.weatherDescription}>{getWeatherDescription(weather.weather_code)}</div>
        </div>
      </div>
      <div className={styles.temperature}>{Math.round(weather.temperature_2m)}°C</div>
      <div className={styles.surfConditions}>
        <div className={styles.surfConditionsTitle}><Waves /> Surf Bedingungen:</div>
        <div className={styles.surfRating}>
          {surfConditions.rating}
        </div>
        <div className={styles.surfDescription}>{surfConditions.description}</div>
      </div>
      <div className={styles.weatherDetails}>
        <div className={styles.detailItem}>
          <Wind className={styles.detailIcon} />
          <div className={styles.detailText}>
            <div className={styles.detailLabel}>Wind:</div>
            <div className={styles.detailValue}>
              {Math.round(weather.wind_speed_10m)} km/h {windDir}
            </div>
          </div>
        </div>
        {weather.relative_humidity_2m && (
          <div className={styles.detailItem}>
            <Droplets className={styles.detailIcon} />
            <div className={styles.detailText}>
              <div className={styles.detailLabel}>Luftf.:</div>
              <div className={styles.detailValue}>
                {weather.relative_humidity_2m}%
              </div>
            </div>
          </div>
        )}
        <div className={styles.detailItem}>
          <CloudRain className={styles.detailIcon} />
          <div className={styles.detailText}>
            <div className={styles.detailLabel}>Regen:</div>
            <div className={styles.detailValue}>
              {weather.precipitation} mm
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WeatherCard;
