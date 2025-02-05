import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BalconyLiftSection from '@/components/addEstate/BalconyLiftSection';

describe('BalconyLiftSection', () => {
  // ...existing code...

  it('should handle undefined values', () => {
    const mockFormData = {
      balcony: undefined,
      lift: undefined,
    };
    const mockHandleChange = jest.fn();

    render(<BalconyLiftSection formData={mockFormData} handleChange={mockHandleChange} />);

    expect(screen.getByLabelText('Тагт:')).toHaveValue('');
    expect(screen.getByLabelText('Лифт:')).toHaveValue('');
  });

  it('should handle null values', () => {
    const mockFormData = {
      balcony: null,
      lift: null,
    };
    const mockHandleChange = jest.fn();

    render(<BalconyLiftSection formData={mockFormData} handleChange={mockHandleChange} />);

    expect(screen.getByLabelText('Тагт:')).toHaveValue('');
    expect(screen.getByLabelText('Лифт:')).toHaveValue('');
  });

  it('should handle empty string values', () => {
    const mockFormData = {
      balcony: '',
      lift: '',
    };
    const mockHandleChange = jest.fn();

    render(<BalconyLiftSection formData={mockFormData} handleChange={mockHandleChange} />);

    expect(screen.getByLabelText('Тагт:')).toHaveValue('');
    expect(screen.getByLabelText('Лифт:')).toHaveValue('');
  });
});
