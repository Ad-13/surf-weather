import { type ReactNode } from 'react';
import { type FieldProps } from 'formik';
import classNames from 'classnames';

import InputError from '@components/inputs/InputError';

import styles from './Input.module.scss';

type InputType =
  | 'text'
  | 'number'
  | 'email'
  | 'password'
  | 'tel'
  | 'date'
  | 'time'
  | 'datetime-local'
  | 'month'
  | 'week'
  | 'url'
  | 'search'
  | 'color';

interface IProps extends FieldProps {
  label: string;
  type: InputType;
  isShowError: boolean;
  disabled: boolean;
  image: ReactNode;
  className: string;
}

const Input = ({
  field: { name, value },
  form: { touched, errors, setFieldValue },
  label,
  type = 'text',
  isShowError = true,
  image,
  disabled,
  className,
  ...props
}: IProps) => {
  const error = (touched[name] && errors[name]) as string;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(name, e.target.value);
  }

  return (
    <div className={`${styles.inputGroup} ${className ? className : ''}`}>
      {label && (
        <label className={styles.label} htmlFor={name}>
          {label}
        </label>
      )}
      <div
        className={classNames(styles.inputWrapper, {
          [styles.disabled]: disabled,
        })}
      >
        <input
          {...props}
          type={type}
          id={name}
          name={name}
          value={value}
          disabled={disabled}
          onChange={handleChange}
          className={classNames(styles.input, {
            [styles.invalid]: error,
          })}
        />
        {image && <div className={styles.img}>{image}</div>}
      </div>
      {isShowError && error && <InputError error={error} />}
    </div>
  );
};

export default Input;
