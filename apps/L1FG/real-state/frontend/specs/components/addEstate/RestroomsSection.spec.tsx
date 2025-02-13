import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RestroomsSection from '@/components/addEstate/RestroomsSection';

describe('RestroomsSection', () => {
  it('should render successfully', () => {
    const mockFormData = {
      restrooms: 2,
    };

    const mockHandleChange = jest.fn();

    render(<RestroomsSection formData={mockFormData} handleChange={mockHandleChange} />);

    expect(screen.getByLabelText('Ариун цэврийн өрөө:')).toBeInTheDocument();
    expect(screen.getByLabelText('Ариун цэврийн өрөө:')).toHaveValue(2);
  });

  it('should call handleChange on input change', () => {
    const mockFormData = {
      restrooms: 0,
    };

    const mockHandleChange = jest.fn();

    render(<RestroomsSection formData={mockFormData} handleChange={mockHandleChange} />);

    const restroomsInput = screen.getByLabelText('Ариун цэврийн өрөө:');
    fireEvent.change(restroomsInput, { target: { value: 3 } });
    expect(mockHandleChange).toHaveBeenCalled();
  });
});
