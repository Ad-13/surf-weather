import styles from './InputError.module.scss';

interface IProps {
  error: string;
}

const InputError= ({ error }: IProps) => <div className={styles.error}>{error}</div>;

export default InputError;
