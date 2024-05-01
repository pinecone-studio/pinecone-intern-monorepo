import React from 'react';
import { render } from '@testing-library/react';
import { ApplicantStatusLabel, JobStatusLabel } from '../../src/app/recruiting/_components';

describe('JobStatusLabel Component', () => {
  it('status title should render', () => {
    const { getByText } = render(<JobStatusLabel labelType="Closed" title="Closed" />);
    expect(getByText).toBeDefined();
  });
});

describe('ApplicantStatusLabel Component', () => {
  it('status title should render', () => {
    const { getByText } = render(<ApplicantStatusLabel labelType="Rejected" title="Rejected" />);
    expect(getByText).toBeDefined();
  });
});
