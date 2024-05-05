import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProgressBar from '../../../src/app/challenge/_components/ProgressBar';

describe('ProgressBar', () => {
  it('increments progress value when button is clicked', async () => {
    const { getByTestId, getByText } = render(<ProgressBar />);
    const progress = getByTestId('progress');
    const button = getByText('Test Button');
    expect(progress).toHaveStyle('width: 0%');
    fireEvent.click(button);
    await waitFor(() => {
      expect(progress).toHaveStyle('width: 25%');
    });
    fireEvent.click(button);
    await waitFor(() => {
      expect(progress).toHaveStyle('width: 50%');
    });
    fireEvent.click(button);
    await waitFor(() => {
      expect(progress).toHaveStyle('width: 75%');
    });
    fireEvent.click(button);
    await waitFor(() => {
      expect(progress).toHaveStyle('width: 100%');
    });
    fireEvent.click(button);
    await waitFor(() => {
      expect(progress).toHaveStyle('width: 100%');
    });
  });
});
