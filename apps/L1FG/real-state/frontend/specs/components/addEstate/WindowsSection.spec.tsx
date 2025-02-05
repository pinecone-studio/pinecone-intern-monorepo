import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import WindowsSection from '@/components/addEstate/WindowsSection';

describe('WindowsSection', () => {
  it('should render successfully', () => {
    const mockFormData = {
      windowsCount: 4,
      windowType: 'Double Glazed',
    };

    const mockHandleChange = jest.fn();

    render(<WindowsSection formData={mockFormData} handleChange={mockHandleChange} />);

    expect(screen.getByLabelText('Цонхны тоо:')).toBeInTheDocument();
    expect(screen.getByLabelText('Цонхны тоо:')).toHaveValue(4);
    expect(screen.getByLabelText('Цонхны төрөл:')).toBeInTheDocument();
    expect(screen.getByLabelText('Цонхны төрөл:')).toHaveValue('Double Glazed');
  });

  it('should call handleChange on input change', () => {
    const mockFormData = {
      windowsCount: 0,
      windowType: '',
    };

    const mockHandleChange = jest.fn();

    render(<WindowsSection formData={mockFormData} handleChange={mockHandleChange} />);

    const windowsCountInput = screen.getByLabelText('Цонхны тоо:');
    fireEvent.change(windowsCountInput, { target: { value: 5 } });
    expect(mockHandleChange).toHaveBeenCalled();

    const windowTypeInput = screen.getByLabelText('Цонхны төрөл:');
    fireEvent.change(windowTypeInput, { target: { value: 'Triple Glazed' } });
    expect(mockHandleChange).toHaveBeenCalled();
  });
});
