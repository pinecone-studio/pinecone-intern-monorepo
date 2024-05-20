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

  test('renders with correct label', () => {
    render(<CheckBox {...defaultProps} />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  test('renders with the correct className', () => {
    render(<CheckBox {...defaultProps} />);
    expect(screen.getByText('Test Label').parentElement).toHaveClass('test-class');
  });

  test('checkbox should be unchecked initially', () => {
    render(<CheckBox {...defaultProps} />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  test('calls onClick handler when clicked', () => {
    render(<CheckBox {...defaultProps} />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('checkbox should be checked if checked prop is true', () => {
    render(<CheckBox {...defaultProps} checked={true} />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  test('applies hidden class when isExist is false', () => {
    render(<CheckBox {...defaultProps} isExist={false} />);
    expect(screen.getByText('Test Label').parentElement).toHaveClass('hidden');
  });

  test('does not apply hidden class when isExist is true', () => {
    render(<CheckBox {...defaultProps} isExist={true} />);
    expect(screen.getByText('Test Label').parentElement).not.toHaveClass('hidden');
  });
});
