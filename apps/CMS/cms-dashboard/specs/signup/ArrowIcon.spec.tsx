import { render } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import { ArrowIcon } from '../../src/assets/icons/ArrowIcon';

describe('Arrow icon', () => {
  it('renders loader correctly', () => {
    const { getByTestId } = render(<ArrowIcon />);
    const container = getByTestId('arrow-icon-container');
    expect(container).toBeDefined();
  });
});
