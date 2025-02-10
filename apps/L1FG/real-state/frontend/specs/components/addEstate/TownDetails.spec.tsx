import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TownDetails from '@/components/addEstate/TownDetails';

describe('TownDetails', () => {
  it('should render successfully', () => {
    const mockFormData = {
      subDistrict: 'Sample SubDistrict',
      district: 'Sample District',
      city: 'Sample City',
      address: 'Sample Address',
    };

    const mockHandleChange = jest.fn();

    render(<TownDetails formData={mockFormData} handleChange={mockHandleChange} />);

    expect(screen.getByLabelText('Дүүрэг:')).toBeInTheDocument();
    expect(screen.getByLabelText('Дүүрэг:')).toHaveValue('Sample SubDistrict');
    expect(screen.getByLabelText('Хороо:')).toBeInTheDocument();
    expect(screen.getByLabelText('Хороо:')).toHaveValue('Sample District');
    expect(screen.getByLabelText('Хот:')).toBeInTheDocument();
    expect(screen.getByLabelText('Хот:')).toHaveValue('Sample City');
    expect(screen.getByLabelText('Хаяг:')).toBeInTheDocument();
    expect(screen.getByLabelText('Хаяг:')).toHaveValue('Sample Address');
  });

  it('should call handleChange on input change', () => {
    const mockFormData = {
      subDistrict: '',
      district: '',
      city: '',
      address: '',
    };

    const mockHandleChange = jest.fn();

    render(<TownDetails formData={mockFormData} handleChange={mockHandleChange} />);

    const subDistrictInput = screen.getByLabelText('Дүүрэг:');
    fireEvent.change(subDistrictInput, { target: { value: 'New SubDistrict' } });
    expect(mockHandleChange).toHaveBeenCalled();

    const districtInput = screen.getByLabelText('Хороо:');
    fireEvent.change(districtInput, { target: { value: 'New District' } });
    expect(mockHandleChange).toHaveBeenCalled();

    const cityInput = screen.getByLabelText('Хот:');
    fireEvent.change(cityInput, { target: { value: 'New City' } });
    expect(mockHandleChange).toHaveBeenCalled();

    const addressInput = screen.getByLabelText('Хаяг:');
    fireEvent.change(addressInput, { target: { value: 'New Address' } });
    expect(mockHandleChange).toHaveBeenCalled();
  });
});
