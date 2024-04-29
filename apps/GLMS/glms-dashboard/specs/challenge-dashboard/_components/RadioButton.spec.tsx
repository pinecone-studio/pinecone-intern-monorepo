import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { RadioButton } from '../../../src/app/challenge-dashboard/_components/RadioButton';

test('renders radio button with correct props', () => {;
  const { getByTestId } = render(<RadioButton value={false} checked={false}  />);

  const radioButton = getByTestId('radio-button');
  expect(radioButton).toBeDefined();

  fireEvent.click(radioButton);

});
