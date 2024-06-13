import { render } from '@testing-library/react';
import { SelectedClassHeader } from '../../src/app/_topic/_components';
import React from 'react';

describe('SelectedClassHeader', () => {
  it('SelectedClass props', () => {
    const { container } = render(<SelectedClassHeader text="hello test" day="day time" />);
    expect(container).toBeDefined();
  });
});
