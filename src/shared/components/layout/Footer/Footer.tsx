import { type FC } from 'react';

import styles from './Footer.module.scss';

const Footer: FC = () => {
  console.log('Footer');

  return (
    <footer className={styles.footer}>
      <div className="container">Entwickelt mit ❤️</div>
    </footer>
  );
};

export default Footer;
