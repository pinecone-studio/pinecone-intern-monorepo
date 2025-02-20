import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { ActionButtons } from '@/components/adminHero/ActionButtons';

jest.mock('lucide-react', () => ({
  Pencil: jest.fn(() => <div data-testid="pencil-icon" />),
  Trash: jest.fn(() => <div data-testid="trash-icon" />),
}));

jest.mock('@/components/ui/button', () => ({
  Button: jest.fn(({ children, className }) => (
    <button className={className} data-testid="button">
      {children}
    </button>
  )),
}));

describe('ActionButtons', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<ActionButtons />);
    expect(screen.getByTestId('pencil-icon')).toBeInTheDocument();
    expect(screen.getByTestId('trash-icon')).toBeInTheDocument();
  });

  it('renders two buttons', () => {
    render(<ActionButtons />);
    const buttons = screen.getAllByTestId('button');
    expect(buttons).toHaveLength(2);
  });

  it('applies correct className to buttons', () => {
    render(<ActionButtons />);
    const buttons = screen.getAllByTestId('button');
    buttons.forEach((button) => {
      expect(button).toHaveClass('p-1');
      expect(button).toHaveClass('bg-[#F4F4F6]');
    });
  });

  it('renders Pencil icon in first button', () => {
    render(<ActionButtons />);
    const buttons = screen.getAllByTestId('button');
    const pencilIcon = screen.getByTestId('pencil-icon');
    expect(buttons[0]).toContainElement(pencilIcon);
  });

  it('renders Trash icon in second button', () => {
    render(<ActionButtons />);
    const buttons = screen.getAllByTestId('button');
    const trashIcon = screen.getByTestId('trash-icon');
    expect(buttons[1]).toContainElement(trashIcon);
  });

  it('applies correct wrapper className', () => {
    const { container } = render(<ActionButtons />);
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('flex');
    expect(wrapper).toHaveClass('space-x-2');
  });

  it('maintains correct button order', () => {
    render(<ActionButtons />);
    const buttons = screen.getAllByTestId('button');
    const pencilIcon = screen.getByTestId('pencil-icon');
    const trashIcon = screen.getByTestId('trash-icon');

    expect(buttons[0]).toContainElement(pencilIcon);
    expect(buttons[1]).toContainElement(trashIcon);
  });
});
