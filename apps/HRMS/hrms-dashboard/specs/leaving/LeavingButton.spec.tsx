import { LeavingButton } from '../../src/app/leaving/_components';
import React from 'react';
import { render } from '@testing-library/react';

describe('Leaving', () => {
  it('Should render profile button component', () => {
    const { container } = render(<LeavingButton text="hello test" />);
    expect(container).toBeDefined();
  });
});
