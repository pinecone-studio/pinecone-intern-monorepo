import React from 'react';
import { render } from '@testing-library/react';
import { RecruitingButton } from '../../src/app/recruiting/_components';

describe('Recruit', () => {
  it('Should render profile button component', () => {
    const { container } = render(<RecruitingButton text="hello test" />);
    expect(container).toBeDefined();
  });
});