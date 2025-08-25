import { createSlice } from '@reduxjs/toolkit';

import { REDUCERS_NAMES } from '@src/app/store/reducerNames';
import type { IWeatherForecastState } from '@entities/weather/types';

import { getWeather } from './thunk';

const initialState: IWeatherForecastState = {
  weatherForecast: null,
  loading: false,
  error: null,
};

const weatherForecastSlice = createSlice({
  name: REDUCERS_NAMES.WEATHER_FORECAST,
  initialState,
  reducers: {
    clearWeatherData: (state) => {
      state.weatherForecast = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.weatherForecast = action.payload;
      })
      .addCase(getWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch weather data';
      });
  },
});

export const { clearWeatherData } = weatherForecastSlice.actions;
export default weatherForecastSlice.reducer;
