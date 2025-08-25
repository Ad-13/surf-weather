import { Formik, Form, Field } from 'formik';

import Input from '@src/shared/components/inputs/Input';
import type { ICity } from '@src/entities/city/types';
import AutoSubmit from '@src/shared/components/inputs/AutoSubmit';

interface IProps {
  selectedCity: ICity | null;
  handleSearch: (values: { cityName: string }) => void;
  onFocus: () => void;
  onBlur: () => void;
}

const CitySearchBar = ({ selectedCity, handleSearch, onFocus, onBlur }: IProps) => {
  return (
    <Formik
      initialValues={{ cityName: selectedCity?.name || '' }}
      onSubmit={handleSearch}
      enableReinitialize
    >
      <Form>
        <Field
          component={Input}
          name="cityName"
          placeholder="Stadt in Deutschland suchen..."
          autoFocus
          onFocus={onFocus}
          onBlur={onBlur}
        />
        <AutoSubmit debounce={300} />
      </Form>
    </Formik>
  );
};

export default CitySearchBar;
