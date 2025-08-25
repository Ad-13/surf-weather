import CitySearch from '@src/features/weatherForecast/CitySearch';
import WeatherForecast from '@src/features/weatherForecast/WeatherForecast';

import styles from './WeatherPage.module.scss';

const WeatherPage = () => {
  console.log('WeatherPage rendered');
  
  return (
    <div className={styles.weatherPage}>
      <div className="container">
        <CitySearch />
        <WeatherForecast />
      </div>
    </div>
  );
};

export default WeatherPage;
