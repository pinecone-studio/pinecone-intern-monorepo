import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SectionSaveButt } from '../../src/app/admin/addLesson/_components/SectionSaveButt';

jest.mock('@/components/ui/button', () => ({
  Button: ({ children, disabled, className, onClick }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={className}
      data-testid="mocked-button"
    >
      {children}
    </button>
  ),
}));

describe('SectionSaveButt Component Tests', () => {
  it('renders the button and handles click events', () => {
    const mockOnClick = jest.fn();
    render(<SectionSaveButt disabled={false} onClick={mockOnClick} />);

    const button = screen.getByTestId('mocked-button');
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(button).not.toBeDisabled();
  });

  it('renders correctly when disabled and does not trigger onClick', () => {
    const mockOnClick = jest.fn();
    render(<SectionSaveButt disabled={true} onClick={mockOnClick} />);

    const button = screen.getByTestId('mocked-button');
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
    fireEvent.click(button); 
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it('renders the correct text', () => {
    const mockOnClick = jest.fn();
    render(<SectionSaveButt disabled={false} onClick={mockOnClick} />);

    const buttonText = screen.getByText('Хадгалах');
    expect(buttonText).toBeInTheDocument();
  });
});


