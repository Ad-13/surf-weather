import { useState } from 'react';

import { useActions, useAppSelector } from '@src/app/store/hooks';
import Card from '@ui/Card';
import type { ICity } from '@src/entities/city/types';

import CitySearchResults from './CitySearchResults';
import CitySearchBar from './CitySearchBar';
import { clearSearchResults, setSelectedCity } from './citySearchSlice';
import { searchCities } from './thunk';

import styles from './CitySearch.module.scss';

const CitySearch = () => {
  const { dispatchSetSelectedCity, dispatchClearSearchResults, dispatchSearchCities } = useActions({
    setSelectedCity,
    clearSearchResults,
    searchCities,
  });
  const { searchResults, loading, selectedCity } = useAppSelector(state => state.citySearch);
  const [citySearchName, setCitySearchName] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleCitySelect = (city: ICity) => {
    dispatchSetSelectedCity(city);
    dispatchClearSearchResults();
  };

  const handleSearch = (values: { cityName: string }) => {
    if (values.cityName.length >= 2) {
      dispatchSearchCities(values.cityName);
    } else {
      dispatchClearSearchResults();
    }
    setCitySearchName(values.cityName);
  };

  const onFocus = () => setIsFocused(true);
  const onBlur = () => setIsFocused(false);

  return (
    <Card className={styles.card} title="Suche nach deutschen Städten">
      <div className={styles.fieldWrapper}>
        <CitySearchBar
          selectedCity={selectedCity}
          handleSearch={handleSearch}
          onBlur={onBlur}
          onFocus={onFocus}
        />

        {isFocused && citySearchName.length >= 2 && searchResults.length > 0 && (
          <div className={styles.resultWrapper}>
            <CitySearchResults searchResults={searchResults} handleCitySelect={handleCitySelect} />
          </div>
        )}

        {isFocused &&
          citySearchName.length >= 2 &&
          searchResults.length === 0 &&
          !loading &&
          !selectedCity && (
            <div className={styles.resultWrapper}>
              <div className={styles.noResults}>
                <p>Keine Städte gefunden. Versuchen Sie eine andere Suche.</p>
              </div>
            </div>
          )}
      </div>
    </Card>
  );
};

export default CitySearch;
