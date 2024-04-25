import React from 'react';
import { render } from '@testing-library/react';
import { ProfileButton } from '../../src/app/profile/_components/ProfileButton';
describe('ProfileButton', () => {
  it('Should render profile button component', () => {
    const { container } = render(<ProfileButton text="hello test" />);
    expect(container).toBeDefined();
  });
});


