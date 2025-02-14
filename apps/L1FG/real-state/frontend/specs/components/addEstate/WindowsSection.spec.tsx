import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import WindowsSection from '@/components/addEstate/WindowsSection';

describe('WindowsSection', () => {
  const mockHandleChange = jest.fn();

  it('should render with empty values', () => {
    const mockFormData = {
      completionDate: '',
      windowsCount: 0,
      windowType: '',
    };

    render(<WindowsSection formData={mockFormData} handleChange={mockHandleChange} />);

    expect(screen.getByLabelText('Ашиглалтанд орсон он:')).toBeInTheDocument();
    expect(screen.getByLabelText('Цонхны тоо:')).toBeInTheDocument();
    expect(screen.getByLabelText('Цонхны төрөл:')).toBeInTheDocument();
  });

  it('should render with provided values', () => {
    const mockFormData = {
      completionDate: '2024-02-13',
      windowsCount: 4,
      windowType: 'Double Glass',
    };

    render(<WindowsSection formData={mockFormData} handleChange={mockHandleChange} />);

    expect(screen.getByLabelText('Ашиглалтанд орсон он:')).toHaveValue('2024-02-13');
    expect(screen.getByLabelText('Цонхны тоо:')).toHaveValue(4);
    expect(screen.getByLabelText('Цонхны төрөл:')).toHaveValue('Double Glass');
  });

  it('should handle input changes', () => {
    const mockFormData = {
      completionDate: '',
      windowsCount: 0,
      windowType: '',
    };

    render(<WindowsSection formData={mockFormData} handleChange={mockHandleChange} />);

    const dateInput = screen.getByLabelText('Ашиглалтанд орсон он:');
    fireEvent.change(dateInput, { target: { value: '2024-02-13' } });
    expect(mockHandleChange).toHaveBeenCalled();

    const countInput = screen.getByLabelText('Цонхны тоо:');
    fireEvent.change(countInput, { target: { value: '4' } });
    expect(mockHandleChange).toHaveBeenCalled();
  });
});
