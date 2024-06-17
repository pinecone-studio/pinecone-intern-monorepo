import React from 'react';
import { render } from '@testing-library/react';
import { StudentButton } from '../../src/app/student/_components';

describe('Leaving', () => {
  it('Should render profile button component', () => {
    const { container } = render(<StudentButton text="hello test" />);
    expect(container).toBeDefined();
  });
});
