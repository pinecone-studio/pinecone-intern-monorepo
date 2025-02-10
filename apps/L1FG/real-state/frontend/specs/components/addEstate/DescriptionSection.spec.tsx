import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DescriptionSection from '@/components/addEstate/DescriptionSection';

describe('DescriptionSection', () => {
  it('should render successfully', () => {
    const mockFormData = {
      description: 'Initial description',
    };

    const mockHandleChange = jest.fn();

    render(<DescriptionSection formData={mockFormData} handleChange={mockHandleChange} />);

    const textarea = screen.getByLabelText('Тайлбар:');
    expect(textarea).not.toBeNull();
    expect(textarea.value).toBe('Initial description');
  });

  it('should call handleChange on textarea change', () => {
    const mockFormData = {
      description: '',
    };

    const mockHandleChange = jest.fn();

    render(<DescriptionSection formData={mockFormData} handleChange={mockHandleChange} />);

    const textarea = screen.getByLabelText('Тайлбар:');
    fireEvent.change(textarea, { target: { value: 'Updated description' } });
    expect(mockHandleChange).toHaveBeenCalled();
  });
});
