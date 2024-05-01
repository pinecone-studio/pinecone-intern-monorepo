import React from 'react';
import CustomInput from '../../src/app/login/_components/CustomInput';
import { render } from '@testing-library/react';
describe('ArticlesCard', () => {
  it('it should render with correct props', () => {
    const getByTestId = render(<CustomInput />);
  });
});
