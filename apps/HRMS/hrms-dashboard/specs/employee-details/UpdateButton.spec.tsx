import React from 'react';
import { render } from '@testing-library/react';
import { UpdateButton } from '../../src/app/employee-details/_components';
describe('UpdateButton', () => {
  it('Should render update button component ', () => {
    const { container } = render(<UpdateButton />);
    expect(container).toBeDefined();
  });
});
