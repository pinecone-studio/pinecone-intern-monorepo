import React from 'react';
import CustomInput from '../../src/app/login/_components/CustomInput';
import { render } from '@testing-library/react';
describe('ArticlesCard', () => {
  it('1. it should render with correct props', () => {
    const { getByTestId } = render(<CustomInput placeholder="" />);

    const placeholder = getByTestId('placeholder');

    expect(placeholder.textContent).toMatch('');
  });
});
