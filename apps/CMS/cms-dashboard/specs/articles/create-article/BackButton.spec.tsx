import React from 'react';
import { render } from '@testing-library/react';
import BackButton from '../../../src/app/articles/_components/create-article/BackButton';

describe('BackButton component', () => {
  it('renders BackButton', () => {
    const { getByTestId } = render(<BackButton />);
    const backButton = getByTestId('back-button');
    expect(backButton).toBeDefined()
  });
});