export interface IWeatherForecast {
  current: {
    time: string;
    temperature_2m: number;
    relative_humidity_2m?: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
    weather_code: number;
    precipitation: number;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    weather_code: number[];
    wind_speed_10m_max: number[];
    wind_direction_10m_dominant: number[];
    precipitation_sum: number[];
  };
}

export interface IWeatherForecastState {
  weatherForecast: IWeatherForecast | null;
  loading: boolean;
  error: string | null;
}

export interface ISurfConditions { 
  rating: 'Excellent' | 'Good' | 'Fair' | 'Poor'; 
  description: string;
}
