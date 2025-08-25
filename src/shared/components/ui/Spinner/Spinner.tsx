import classnames from 'classnames';

import Spin from '@images/spin.svg';

import styles from './Spinner.module.scss';

interface IProps {
  width?: number;
  className?: string;
}

const Spinner = ({ className, width }: IProps) => (
  <img
    className={classnames(styles.spinner, className)}
    style={{ width }}
    alt="spinner"
    src={Spin}
  />
);

export default Spinner;
