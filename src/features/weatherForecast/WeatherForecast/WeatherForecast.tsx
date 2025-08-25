import { useEffect } from 'react';

import { useActions, useAppSelector } from '@src/app/store/hooks';
import Spinner from '@ui/Spinner';

import SevenDays from '../SevenDays';
import WeatherCard from '../WeatherCard';
import { getWeather } from './thunk';

const WeatherForecast = () => {
  const { dispatchGetWeather } = useActions({ getWeather });
  const selectedCity = useAppSelector(state => state.citySearch.selectedCity);
  const { loading, weatherForecast } = useAppSelector(state => state.weatherForecast);

  useEffect(() => {
    if (selectedCity) dispatchGetWeather(selectedCity);
  }, [selectedCity]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {weatherForecast && (
            <>
              <WeatherCard weather={weatherForecast.current} isToday />
              <SevenDays forecast={weatherForecast.daily} />
            </>
          )}
          {!weatherForecast && selectedCity && (
            <div>No weather data available for the selected city.</div>
          )}
        </>
      )}
    </>
  );
};

export default WeatherForecast;
