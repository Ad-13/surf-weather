import { createAsyncThunk } from "@reduxjs/toolkit";

import { REDUCERS_NAMES } from "@src/app/store/reducerNames";
import type { ICity } from "@src/entities/city/types";
import type { IWeatherForecast } from "@src/entities/weather/types";

const API_URL = 'https://api.open-meteo.com/v1/forecast';

export const getWeather = createAsyncThunk<IWeatherForecast, ICity>(
  `${REDUCERS_NAMES.WEATHER_FORECAST}/getWeather`,
  async (city: ICity) => {
    const response = await fetch(
      `${API_URL}?latitude=${city.latitude}&longitude=${city.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m,weather_code,precipitation&daily=temperature_2m_max,temperature_2m_min,weather_code,wind_speed_10m_max,wind_direction_10m_dominant,precipitation_sum&timezone=Europe%2FBerlin&forecast_days=7`
    );

    if (!response.ok) {
      throw new Error('Failed to get weather data');
    }

    const data = await response.json();
    return data;
  }
);