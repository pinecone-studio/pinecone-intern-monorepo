import { RecruitingButton } from '../../src/app/recruiting/_components';
import React from 'react';
import { render } from '@testing-library/react';

describe('Recruiting Button', () => {
  it('Should render recruiting button component', () => {
    const { container } = render(<RecruitingButton text="hello test" />);
    expect(container).toBeDefined();
  });
});
