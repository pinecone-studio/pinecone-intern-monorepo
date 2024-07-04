import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SectionEntry } from '../../src/app/addLesson/_components/SectionEntry';

jest.mock('@/components/ui/input', () => ({
  Input: ({ name, value, onChange, placeholder, className }: never) => (
    <input data-testid="mocked-input" name={name} value={value} onChange={onChange} placeholder={placeholder} className={className} />
  ),
}));

jest.mock('@/components/ui/textarea', () => ({
  Textarea: ({ name, value, onChange, placeholder, className }: never) => (
    <textarea data-testid="mocked-textarea" name={name} value={value} onChange={onChange} placeholder={placeholder} className={className} />
  ),
}));

describe('SectionEntry', () => {
  const mockInputData = {
    title: 'Test Title',
    description: 'Test Description',
  };

  const mockHandleInputChange = jest.fn();

  it('renders all components correctly', () => {
    render(<SectionEntry inputData={mockInputData} handleInputChange={mockHandleInputChange} />);

    expect(screen.getByText('Хичээлийн гарчиг')).toBeInTheDocument();
    expect(screen.getByText('Дэлгэрэнгүй')).toBeInTheDocument();
    expect(screen.getByText('Хичээлийн зураг')).toBeInTheDocument();
  });

  it('calls handleInputChange when input changes', () => {
    render(<SectionEntry inputData={mockInputData} handleInputChange={mockHandleInputChange} />);

    const input = screen.getByTestId('mocked-input');
    fireEvent.change(input, { target: { value: 'New Title' } });
    expect(mockHandleInputChange).toHaveBeenCalled();
  });

  it('calls handleInputChange when textarea changes', () => {
    render(<SectionEntry inputData={mockInputData} handleInputChange={mockHandleInputChange} />);

    const textarea = screen.getByTestId('mocked-textarea');
    fireEvent.change(textarea, { target: { value: 'New Description' } });
    expect(mockHandleInputChange).toHaveBeenCalled();
  });
});
