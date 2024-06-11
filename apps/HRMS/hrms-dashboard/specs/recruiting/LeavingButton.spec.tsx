import { RecruitingButton } from '../../src/app/_recruiting/_components';
import React from 'react';
import { render } from '@testing-library/react';

describe('Leaving', () => {
  it('Should render profile button component', () => {
    const { container } = render(<RecruitingButton text="hello test" />);
    expect(container).toBeDefined();
  });
});
