import { render } from '@testing-library/react';
import { SelectedClassHeaderInfo } from '../../src/app/topic/_features/SelectedClassHeaderInfo';
import React from 'react';

describe('SelectedClassHeader', () => {
  it('SelectedClass props', () => {
    const { container } = render(<SelectedClassHeaderInfo text="hello test" profile="https://avatars.githubusercontent.com/u/1000100?v=4" name="Багш " />);
    expect(container).toBeDefined();
  });
});
