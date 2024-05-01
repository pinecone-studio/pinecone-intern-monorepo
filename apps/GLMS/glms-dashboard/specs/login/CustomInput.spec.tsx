import React from 'react';
import CustomInput from '../../src/app/login/_components/CustomInput';
import { render } from '@testing-library/react';
describe('CustomInput', () => {
  it('it should render with correct props', () => {
    const { getByTestId } = render(<CustomInput data-testid="kk" />);

    const input = getByTestId('kk');

    expect(input.textContent).toBeDefined();
  });
});
