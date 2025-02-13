import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DescriptionSection from '@/components/addEstate/DescriptionSection';

describe('DescriptionSection', () => {
  it('should render successfully', () => {
    const mockFormData = {
      description: 'Initial description',
    };

    const mockHandleChange = jest.fn();

    render(<DescriptionSection formData={mockFormData} handleChange={mockHandleChange} />);

    const textarea = screen.getByLabelText('Дэлгэрэнгүй тайлбар:');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveValue('Initial description');
  });

  it('should call handleChange on textarea change', () => {
    const mockFormData = {
      description: '',
    };

    const mockHandleChange = jest.fn();

    render(<DescriptionSection formData={mockFormData} handleChange={mockHandleChange} />);

    const textarea = screen.getByLabelText('Дэлгэрэнгүй тайлбар:');
    fireEvent.change(textarea, { target: { value: 'Updated description' } });
    expect(mockHandleChange).toHaveBeenCalled();
  });
});
