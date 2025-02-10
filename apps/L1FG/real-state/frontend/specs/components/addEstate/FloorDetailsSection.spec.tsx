import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FloorDetailsSection from '@/components/addEstate/FloorDetailsSection';

describe('FloorDetailsSection', () => {
  it('should render successfully', () => {
    const mockFormData = {
      floorMaterial: 'Wood',
      floorNumber: 3,
    };

    const mockHandleChange = jest.fn();

    render(<FloorDetailsSection formData={mockFormData} handleChange={mockHandleChange} />);

    expect(screen.getByLabelText('Шалны материал:')).toBeInTheDocument();
    expect(screen.getByLabelText('Шалны материал:')).toHaveValue('Wood');
    expect(screen.getByLabelText('Давхар:')).toBeInTheDocument();
    expect(screen.getByLabelText('Давхар:')).toHaveValue(3);
  });

  it('should call handleChange on input change', () => {
    const mockFormData = {
      floorMaterial: '',
      floorNumber: 0,
    };

    const mockHandleChange = jest.fn();

    render(<FloorDetailsSection formData={mockFormData} handleChange={mockHandleChange} />);

    const floorMaterialInput = screen.getByLabelText('Шалны материал:');
    fireEvent.change(floorMaterialInput, { target: { value: 'Tile' } });
    expect(mockHandleChange).toHaveBeenCalled();

    const floorNumberInput = screen.getByLabelText('Давхар:');
    fireEvent.change(floorNumberInput, { target: { value: 5 } });
    expect(mockHandleChange).toHaveBeenCalled();
  });
});
