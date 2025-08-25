import { type FC } from 'react';

import { Waves } from 'lucide-react';

import styles from './Header.module.scss';

const Header: FC = () => {
  console.log('Header');

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.headerContent}>
          <h1 className={styles.title}><Waves className={styles.titleIcon} />SurfWeather</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
