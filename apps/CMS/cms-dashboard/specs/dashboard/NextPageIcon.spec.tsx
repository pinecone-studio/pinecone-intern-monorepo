import React from 'react';
import { render } from '@testing-library/react';
import { NextPageIcon } from '../../src/app/dashboard/_components/NextPageIcon';

describe('NextPageIcon', () => {
  it('1. Should render', () => {
    const { container } = render(<NextPageIcon />);
    expect(container).toBeDefined();
  });
});
