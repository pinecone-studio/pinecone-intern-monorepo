import { render } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import { FaceBookIcon } from '../../src/assets/icons/FacebookIcon';

describe('Arrow icon', () => {
  it('renders loader correctly', () => {
    const { getByTestId } = render(<FaceBookIcon />);
    const container = getByTestId('facebook-icon-container');
    expect(container).toBeDefined();
  });
});
