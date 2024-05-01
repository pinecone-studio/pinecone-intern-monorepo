import React from 'react';
import { render } from '@testing-library/react';
import FormInput from '../../src/app/login/_components/FormInput';
describe('CustomInput', () => {
  it('it should render with correct props', () => {
    const { getByTestId } = render(<FormInput data-testid="kk" />);

    const input = getByTestId('kk');

    expect(input.textContent).toBeDefined();
  });
});
