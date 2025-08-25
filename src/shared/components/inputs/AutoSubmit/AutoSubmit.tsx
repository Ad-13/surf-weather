import { useEffect, useRef } from 'react';
import { useFormikContext } from 'formik';

import { areObjectsEqual } from '@src/shared/lib/utils.tsx';

interface IProps {
  debounce?: number;
}

const AutoSubmit = ({ debounce = 0 }: IProps) => {
  const { values, initialValues, isSubmitting, submitForm, setSubmitting } = useFormikContext();
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSubmit = async () => {
    await submitForm();
    setSubmitting(false);
  };

  useEffect(() => {
    if (!areObjectsEqual(values, initialValues)) {
      if (isSubmitting) return;

      if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);

      timeoutIdRef.current = setTimeout(() => {
        handleSubmit();
        timeoutIdRef.current = null;
      }, debounce);
    }
  }, [values]);

  return null;
};

export default AutoSubmit;
