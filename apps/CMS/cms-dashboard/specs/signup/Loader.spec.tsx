import { render } from '@testing-library/react';
import React from 'react';
import { Loader } from '../../src/app/sign-up/_components/Loader';
import '@testing-library/jest-dom';

describe('Loader', () => {
  it('renders loader correctly', () => {
    const { container } = render(<Loader />);

    expect(container).toBeDefined();
  });
});
