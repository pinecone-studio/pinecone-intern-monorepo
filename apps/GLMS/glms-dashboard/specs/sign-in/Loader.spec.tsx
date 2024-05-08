import { render } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import { Loader } from '../../src/app/sign-in/_components/Loader';

describe('Loader', () => {
  it('renders loader correctly', () => {
    const { container } = render(<Loader />);

    expect(container).toBeDefined();
  });
});
