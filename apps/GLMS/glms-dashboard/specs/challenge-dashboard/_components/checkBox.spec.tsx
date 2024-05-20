import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CheckBox } from '../../../src/app/challenge-dashboard/_components/CheckBox';

describe('CheckBox Component', () => {
  const mockOnClick = jest.fn();

  const defaultProps = {
    label: 'Test Label',
    checked: false,
    onClick: mockOnClick,
    className: 'test-class',
  };

  it('renders with correct label', () => {
    render(<CheckBox {...defaultProps} />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('renders with the correct className', () => {
    render(<CheckBox {...defaultProps} />);
    expect(screen.getByText('Test Label').parentElement).toHaveClass('test-class');
  });

  it('checkbox should be unchecked initially', () => {
    render(<CheckBox {...defaultProps} />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('calls onClick handler when clicked', () => {
    render(<CheckBox {...defaultProps} />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('checkbox should be checked if checked prop is true', () => {
    render(<CheckBox {...defaultProps} checked={true} />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('applies hidden class when isExist is false', () => {
    render(<CheckBox {...defaultProps} isExist={false} />);
    expect(screen.getByText('Test Label').parentElement).toHaveClass('hidden');
  });

  it('does not apply hidden class when isExist is true', () => {
    render(<CheckBox {...defaultProps} isExist={true} />);
    expect(screen.getByText('Test Label').parentElement).not.toHaveClass('hidden');
  });
});
