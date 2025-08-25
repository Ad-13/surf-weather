import { MapPin } from 'lucide-react';
import type { ICity } from '@src/entities/city/types';

import styles from './CitySearchResults.module.scss';

interface IProps {
  searchResults: ICity[];
  handleCitySelect: (city: ICity) => void;
}

const CitySearchResults = ({ searchResults, handleCitySelect }: IProps) => {
  return (
    <>
      {searchResults.map(city => (
        <button key={city.id} className={styles.resultItem} onMouseDown={e => {
          e.preventDefault();
          handleCitySelect(city)
          
        }}>
          <MapPin size={16} className={styles.resultIcon} />
          <div className={styles.resultText}>
            <div className={styles.cityName}>{city.name}</div>
            {city.admin1 && <span className={styles.regionName}>{city.admin1}, </span>}
            <span className={styles.countryName}>{city.country}</span>
          </div>
        </button>
      ))}
    </>
  );
};

export default CitySearchResults;
