import { render } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import { ArrowIcon } from '../../src/assets/icons/ArrowIcon';

describe('Arrow icon', () => {
  it('renders loader correctly', () => {
    const { container } = render(<ArrowIcon />);

    expect(container).toBeDefined();
  });
});
