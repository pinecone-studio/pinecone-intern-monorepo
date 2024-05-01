import React from 'react';
import { render } from '@testing-library/react';
import BackButton from '../../src/app/[id]/_components/BackButton';

describe('BackButton component', () => {
  it('renders BackButton', () => {
    const { getByTestId } = render(<BackButton />);
    const backButton = getByTestId('prev-button-test-id');
    expect(backButton).toBeDefined()
  });

  it('renders correct text in BackButton', () => {
    const { getByText } = render(<BackButton />);
    const buttonText = getByText('Сэдвүүд');
    expect(buttonText).toBeDefined()
  });
});