import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProgressBar from '../../../src/app/challenge/_components/ProgressBar';

describe('ProgressBar', () => {
  const mockProgressValue = 0;
  it('it renders correctly with progressValue', async () => {
    const { getByTestId } = render(<ProgressBar progressValue={mockProgressValue} />);
    const progress = getByTestId('progress');
    expect(progress).toHaveStyle('width: 0%');
  });
});
