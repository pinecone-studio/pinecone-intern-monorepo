import React from 'react';
import { render } from '@testing-library/react';
import { FormInput } from '../../src/app/articles/_components/FormInput';

describe('ArticlesCard', () => {
  it('it should render with correct props', () => {
    const { getByTestId } = render(<FormInput label="2024.04.15" helperText="Morphosis" />);

    const date = getByTestId('label');

    const title = getByTestId('helperText');

    expect(date.textContent).toMatch('2024.04.15');
    expect(title.textContent).toMatch('Morphosis');
  });
});
