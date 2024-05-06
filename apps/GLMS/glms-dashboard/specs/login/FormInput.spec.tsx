import React from 'react';
import CustomInput from '../../src/app/login/_components/FormInput';
import { render } from '@testing-library/react';
import FormInput from '../../src/app/login/_components/FormInput';
describe('ArticlesCard', () => {
  it('1. it should render with correct props', () => {
    const { getByTestId } = render(<FormInput data-testid="kk" />);

    const input = getByTestId('kk');
    expect(input.textContent).toBeDefined();
  });
});
