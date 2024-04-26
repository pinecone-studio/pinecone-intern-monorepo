import React from 'react';
import { render } from '@testing-library/react';
import BackButton from '../../src/app/Lesson/component/BackButton';

describe('BackButton component', () => {
  it('renders BackButton', () => {
    const { getByTestId } = render(<BackButton />);
    const backButton = getByTestId('prev-button-test-id');
  });

  it('renders correct text in BackButton', () => {
    const { getByText } = render(<BackButton />);
    const buttonText = getByText('Сэдвүүд');
  });
});
