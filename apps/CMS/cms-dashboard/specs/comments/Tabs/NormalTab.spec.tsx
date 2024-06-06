import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NormalTab from '@/app/comments/_components/Tabs/NormalTab';

describe('NormalTab component', () => {
  it('renders NormalTab', () => {
    render(<NormalTab />);
    const normalButton = screen.getByTestId('normal-tab-test-id');
    expect(normalButton).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<NormalTab onClick={handleClick} />);

    const normalButton = screen.getByTestId('normal-tab-test-id');
    normalButton.click();

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
