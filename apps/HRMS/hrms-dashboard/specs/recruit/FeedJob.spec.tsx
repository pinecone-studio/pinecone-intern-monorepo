import React from 'react';
import { render } from '@testing-library/react';
import { JobRecruitDashboard } from '../../src/app/recruiting/_components/feedJob/JobRecruit';

describe('Recruit Component', () => {
  it('should render recruit components', () => {
    const { container } = render(<JobRecruitDashboard />);
    expect(container).toBeDefined();
  });
});
