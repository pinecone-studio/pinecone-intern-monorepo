import { render } from '@testing-library/react';
import { SelectedClassHeader } from '../../src/app/topic/_components/SelectedClassHeader';
import React from 'react';

describe('SelectedClassHeader', () => {
  it('SelectedClass props', () => {
    const { container } = render(<SelectedClassHeader text="hello test" students={10} />);
    expect(container).toBeDefined();
  });
});
