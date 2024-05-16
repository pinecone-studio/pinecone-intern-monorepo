import { render } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import { GoogleIcon } from '../../src/assets/icons/GoogleIcon';

describe('Arrow icon', () => {
  it('renders loader correctly', () => {
    const { getByTestId } = render(<GoogleIcon />);
    const container = getByTestId('google-icon-container');
    expect(container).toBeDefined();
  });
});
