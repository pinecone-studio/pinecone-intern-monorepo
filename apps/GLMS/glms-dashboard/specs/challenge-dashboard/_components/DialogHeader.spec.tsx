import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { DialogHeader } from '../../../src/app/challenge-dashboard/_components/DialogHeader';

describe('DialogHeader', () => {
  const title = 'Dialog Title';
  const onCloseMock = jest.fn();

  beforeEach(() => {
    render(<DialogHeader title={title} onClose={onCloseMock} />);
  });

  it('renders the title correctly', () => {
    const titleElement = screen.getByText(title);
    expect(titleElement).toBeDefined();
    expect(titleElement.tagName).toBe('H2');
  });

  it('should renders the close button', () => {
    const closeButton = screen.getByRole('button', { name: /close/i });
    expect(closeButton).toBeDefined();
  });

  it('should calls onClose function when close button is clicked', () => {
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
