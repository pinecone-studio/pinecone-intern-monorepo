import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DeleteConfirmModal from '@/components/addEstate/assests/DeleteConfirmModal';

describe('DeleteConfirmModal', () => {
  const mockOnClose = jest.fn();
  const mockOnConfirm = jest.fn();

  beforeEach(() => {
    mockOnClose.mockReset();
    mockOnConfirm.mockReset();
  });

  it('should render confirm modal with correct buttons', () => {
    render(<DeleteConfirmModal onClose={mockOnClose} onConfirm={mockOnConfirm} />);

    expect(screen.getByText('Та энэ зарыг устгахдаа итгэлтэй байна уу?')).toBeInTheDocument();
    expect(screen.getByText('Үгүй')).toBeInTheDocument();
    expect(screen.getByText('Тийм')).toBeInTheDocument();
  });

  it('should call onClose when cancel button is clicked', () => {
    render(<DeleteConfirmModal onClose={mockOnClose} onConfirm={mockOnConfirm} />);

    fireEvent.click(screen.getByText('Үгүй'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
    expect(mockOnConfirm).not.toHaveBeenCalled();
  });

  it('should call onConfirm when confirm button is clicked', () => {
    render(<DeleteConfirmModal onClose={mockOnClose} onConfirm={mockOnConfirm} />);

    fireEvent.click(screen.getByText('Тийм'));
    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
    expect(mockOnClose).not.toHaveBeenCalled();
  });
});
