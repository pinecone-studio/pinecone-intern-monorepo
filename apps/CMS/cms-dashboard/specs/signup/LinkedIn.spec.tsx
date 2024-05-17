import { render } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import { LinkedInIcon } from '../../src/assets/icons/LinkedInIcon';

describe('Arrow icon', () => {
  it('renders loader correctly', () => {
    const { getByTestId } = render(<LinkedInIcon />);
    const container = getByTestId('linkedIn-icon-container');
    expect(container).toBeDefined();
  });
});
