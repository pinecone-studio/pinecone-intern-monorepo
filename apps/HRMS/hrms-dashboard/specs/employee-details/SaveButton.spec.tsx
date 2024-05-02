import React from 'react';
import { render } from '@testing-library/react';
import { SaveButton } from '../../src/app/employee-details/_components';
describe('SaveButton', () => {
  it('Should render save button component', () => {
    const { container } = render(<SaveButton />);
    expect(container).toBeDefined();
  });
});
