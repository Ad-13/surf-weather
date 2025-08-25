import type { ISurfConditions, IWeatherForecast } from '@src/entities/weather/types';
import { Cloud, Sun, CloudRain, CloudDrizzle, CloudSnow, Zap } from 'lucide-react';

export const areObjectsEqual = (obj1: unknown, obj2: unknown): boolean => {
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
    return obj1 === obj2;
  }
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};

export const getWindDirection = (degrees: number): string => {
  const directions = ['N', 'NO', 'O', 'SO', 'S', 'SW', 'W', 'NW'];
  return directions[Math.round(degrees / 45) % 8];
};

export const getWeatherIcon = (code: number) => {
  if (code <= 1) return <Sun className="card-icon card-sun-icon" />;
  if (code <= 3) return <Cloud className="card-icon card-cloud-icon" />;
  if (code <= 48) return <CloudDrizzle className="card-icon card-drizzle-icon" />;
  if (code <= 67) return <CloudRain className="card-icon card-rain-icon" />;
  if (code <= 77) return <CloudSnow className="card-icon card-snow-icon" />;
  if (code <= 82) return <CloudRain className="card-icon card-rain-icon" />;
  if (code <= 99) return <Zap className="card-icon card-zap-icon" />;

  return <Sun className="card-sun-icon" />;
};

export const getWeatherDescription = (code: number): string => {
  if (code <= 1) return 'Sonnig';
  if (code <= 3) return 'Bewölkt';
  if (code <= 48) return 'Neblig';
  if (code <= 67) return 'Regnerisch';
  if (code <= 77) return 'Schneeschauer';
  if (code <= 82) return 'Starker Regen';
  if (code <= 99) return 'Gewitter';
  return 'Unbekannt';
};

export const getSurfConditions = (windSpeed: number, weatherCode: number): ISurfConditions => {
  if (weatherCode >= 80) {
    return { rating: 'Poor', description: 'Sturm - Zu gefährlich' };
  }

  if (windSpeed <= 5) {
    return { rating: 'Poor', description: 'Zu wenig Wind' };
  } else if (windSpeed <= 15) {
    return { rating: 'Good', description: 'Gute Bedingungen' };
  } else if (windSpeed <= 25) {
    return { rating: 'Excellent', description: 'Perfekte Bedingungen!' };
  } else {
    return { rating: 'Fair', description: 'Starker Wind' };
  }
};

export const convertForecast = (dailyData: IWeatherForecast['daily']): IWeatherForecast['current'][] => {
  const {
    time,
    temperature_2m_max,
    weather_code,
    wind_speed_10m_max,
    wind_direction_10m_dominant,
    precipitation_sum,
  } = dailyData;

  return time.map((date, index) => ({
    time: date,
    temperature_2m: temperature_2m_max[index],
    wind_speed_10m: wind_speed_10m_max[index],
    wind_direction_10m: wind_direction_10m_dominant[index],
    weather_code: weather_code[index],
    precipitation: precipitation_sum[index],
  }));
};
