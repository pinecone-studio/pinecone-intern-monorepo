import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FloorDetailsSection from '@/components/addEstate/FloorDetailsSection';

describe('FloorDetailsSection', () => {
  const mockHandleChange = jest.fn();

  it('should render with empty values', () => {
    const mockFormData = {
      floorMaterial: '',
      totalFloors: 0,
      floorNumber: 0,
    };

    render(<FloorDetailsSection formData={mockFormData} handleChange={mockHandleChange} />);

    expect(screen.getByLabelText('Шалны материал:')).toBeInTheDocument();
    expect(screen.getByLabelText('Нийт давхар:')).toBeInTheDocument();
    expect(screen.getByLabelText('Давхар:')).toBeInTheDocument();
  });

  it('should render with provided values', () => {
    const mockFormData = {
      floorMaterial: 'Wood',
      totalFloors: 12,
      floorNumber: 5,
    };

    render(<FloorDetailsSection formData={mockFormData} handleChange={mockHandleChange} />);

    expect(screen.getByLabelText('Шалны материал:')).toHaveValue('Wood');
    expect(screen.getByLabelText('Нийт давхар:')).toHaveValue(12);
    expect(screen.getByLabelText('Давхар:')).toHaveValue(5);
  });

  it('should handle input changes', () => {
    const mockFormData = {
      floorMaterial: '',
      totalFloors: 0,
      floorNumber: 0,
    };

    render(<FloorDetailsSection formData={mockFormData} handleChange={mockHandleChange} />);

    const materialInput = screen.getByLabelText('Шалны материал:');
    fireEvent.change(materialInput, { target: { value: 'Wood' } });
    expect(mockHandleChange).toHaveBeenCalled();

    const floorNumberInput = screen.getByLabelText('Давхар:');
    fireEvent.change(floorNumberInput, { target: { value: '5' } });
    expect(mockHandleChange).toHaveBeenCalled();
  });
});
