import { createSlice } from '@reduxjs/toolkit';

import { REDUCERS_NAMES } from '@src/app/store/reducerNames';
import type { ICityState } from '@entities/city/types';

import { searchCities } from './thunk';

const initialState: ICityState = {
  selectedCity: null,
  searchResults: [],
  loading: false,
  error: null,
};

const citySearchSlice = createSlice({
  name: REDUCERS_NAMES.CITY_SEARCH,
  initialState,
  reducers: {
    setSelectedCity: (state, action) => {
      state.selectedCity = action.payload;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchCities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchCities.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchCities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to search cities';
      });
  },
});

export const { setSelectedCity, clearSearchResults } = citySearchSlice.actions;
export default citySearchSlice.reducer;
