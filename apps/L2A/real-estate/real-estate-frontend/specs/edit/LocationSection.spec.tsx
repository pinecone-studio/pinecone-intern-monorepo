/* eslint-disable @typescript-eslint/no-empty-function */
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Formik } from 'formik';
import LocationSection from '@/app/user-listing/edit/_components/LocationSection';

const renderWithFormik = (initialValues = { location: {} }) => {
  return render(

    <Formik initialValues={initialValues} onSubmit={() => {}}>
      <LocationSection />
    </Formik>
  );
};

describe('LocationSection', () => {
  it('renders all labels and inputs', () => {
    renderWithFormik();

    expect(screen.getByText('Байршил')).toBeInTheDocument();
    expect(screen.getByText(/Хаягийн мэдээллийг бөглөнө үү/)).toBeInTheDocument();

    expect(screen.getByLabelText('Дүүрэг')).toBeInTheDocument();
    expect(screen.getByLabelText('Хороо')).toBeInTheDocument();
    expect(screen.getByLabelText('Дэлгэрэнгүй')).toBeInTheDocument();
  });

  it('fills inputs and calls setFieldValue on change', () => {
    const setFieldValue = jest.fn();

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    jest.spyOn(require('formik'), 'useFormikContext').mockReturnValue({
      values: { location: { district: '', city: '', address: '' } },
      setFieldValue,
    });

    render(<LocationSection />);

    fireEvent.change(screen.getByTestId('input-district'), {
      target: { value: 'Сүхбаатар' },
    });
    fireEvent.change(screen.getByTestId('input-city'), {
      target: { value: '1-р хороо' },
    });
    fireEvent.change(screen.getByTestId('input-address'), {
      target: { value: 'Баянгол зочид буудлын хойно' },
    });

    expect(setFieldValue).toHaveBeenCalledWith('location.district', 'Сүхбаатар');
    expect(setFieldValue).toHaveBeenCalledWith('location.city', '1-р хороо');
    expect(setFieldValue).toHaveBeenCalledWith(
      'location.address',
      'Баянгол зочид буудлын хойно'
    );
  });

  it('handles undefined location gracefully by falling back to {}', () => {
    const setFieldValue = jest.fn();

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    jest.spyOn(require('formik'), 'useFormikContext').mockReturnValue({
      values: {}, 
      setFieldValue,
    });

    render(<LocationSection />);
    expect(screen.getByTestId('input-district')).toHaveValue('');
    expect(screen.getByTestId('input-city')).toHaveValue('');
    expect(screen.getByTestId('input-address')).toHaveValue('');
  });
});
