import React from 'react';
import { render } from '@testing-library/react';
import SignIn from '../../src/app/profile/_components/SignIn';
describe('SignIn', () => {
  it('Should render signin component', () => {
    const { container } = render(<SignIn />);
    expect(container).toBeDefined();
  });
});
