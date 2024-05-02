import React from 'react';
import { render } from '@testing-library/react';
import { CancelButton } from '../../src/app/employee-details/_components';
describe('CancelButton', () => {
  it('Should render cancel button component', () => {
    const { container } = render(<CancelButton />);
    expect(container).toBeDefined();
  });
});
