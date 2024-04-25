import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { SelectButton } from '../../../src/app/challenge-dashboard/_components/Select';
describe('SelectButton', () => {
  it('should render options correctly', () => {
    const options = ['Option 1', 'Option 2', 'Option 3'];
    const selectedOption = 'Option 2';
    const handleSelectChange = jest.fn();

    const { getByText, getByTestId } = render(<SelectButton options={options} selectedOption={selectedOption} handleSelectChange={handleSelectChange} />);

    options.forEach((option) => {
      expect(getByText(option)).toBeDefined();
    });

    fireEvent.change(getByTestId('select-button'), { target: { value: 'Option 3' } });
  });
});
