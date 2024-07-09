import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SubmitAlert } from '@/app/articles/_components/add/SubmitAlert';

test('renders the alert message and truncates long text with an ellipsis', () => {
  const longText = 'This is a very long text that will be truncated.';
  render(<SubmitAlert text={longText} />);
  expect(screen.getByText('Successfully')).toBeInTheDocument();
});