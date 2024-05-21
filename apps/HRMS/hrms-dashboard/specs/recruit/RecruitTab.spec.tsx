import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { JobRecruitTabs } from '../../src/app/recruiting/_components';

describe('RecruitTabs Component', () => {
  it('should render', () => {
    const handleClick = jest.fn();
    const { getByTestId } = render(<JobRecruitTabs />);
    fireEvent.click(getByTestId('adtab'));
    expect(handleClick).toBeDefined();
  });
  it('should render', () => {
    const handleClick = jest.fn();
    const { getByTestId } = render(<JobRecruitTabs />);
    fireEvent.click(getByTestId('offertab'));
    expect(handleClick).toBeDefined();
  });
});
