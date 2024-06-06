import React from 'react';
import { render, screen } from '@testing-library/react';
import NormalTab from '@/app/comments/_components/Tabs/NormalTab';

describe('NormalTab component', () => {
  it('renders NormalTab', () => {
    render(<NormalTab />);
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<NormalTab onClick={handleClick} />);

    const normalButton = screen.getByTestId('normal-tab-test-id');
    normalButton.click();

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
