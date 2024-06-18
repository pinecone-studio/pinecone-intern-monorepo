import React from 'react';
import { render, screen } from '@testing-library/react';
import { Steps } from '../../src/app/employee-details/_components/add-employee-steps/Steps';
import '@testing-library/jest-dom';

describe('UpdateButton', () => {
  it('should render the UpdateButton component', () => {
    render(<Steps />);
    const addButton = screen.getByTestId('create-employee-test-id');
    expect(addButton).toBeDefined();
  });
});
const setFieldValue = jest.fn();
const handleSubmit = jest.fn();
jest.mock('formik', () => ({
  useFormik: () => ({
    setFieldValue,
    handleSubmit,
    values: {
      transferMethodCountry: 'AZ',
      transferMethodCurrency: 'AZN',
      type: 'BANK_ACCOUNT',
    },
  }),
}));
expect(handleSubmit).toBeCalled();
