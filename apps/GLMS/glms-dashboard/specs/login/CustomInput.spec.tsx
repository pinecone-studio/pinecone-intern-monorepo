import CustomInput from '../../src/app/login/_components/CustomInput';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
test('input component updates value correctly', () => {
  const onChangeMock = jest.fn();
  const { getByPlaceholderText } = render(<CustomInput />);

  const inputElement = getByPlaceholderText('Type something...');

  fireEvent.change(inputElement, { target: { value: 'Test input' } });

  expect(onChangeMock).toHaveBeenCalledWith('Test input');
});
