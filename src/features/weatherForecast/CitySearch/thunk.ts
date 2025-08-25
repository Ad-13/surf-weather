import { createAsyncThunk } from "@reduxjs/toolkit";

import { REDUCERS_NAMES } from "@src/app/store/reducerNames";
import type { ICity } from "@src/entities/city/types";

const API_URL = 'https://geocoding-api.open-meteo.com/v1/search';

export const searchCities = createAsyncThunk<ICity[], string>(
  `${REDUCERS_NAMES.CITY_SEARCH}/searchCities`,
  async (query: string) => {
    const response = await fetch(
      `${API_URL}?name=${encodeURIComponent(query)}&count=10&language=de&format=json&country=DE`
    );

    if (!response.ok) {
      throw new Error('Failed to search cities');
    }

    const data = await response.json();
    return data.results || [];
  }
);