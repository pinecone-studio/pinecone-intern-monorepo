import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ImagesSection from '@/components/addEstate/ImagesSection';

// Mock URL.createObjectURL
global.URL.createObjectURL = jest.fn(() => 'mocked-url');

describe('ImagesSection', () => {
  const mockHandleChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render successfully', () => {
    render(<ImagesSection handleChange={mockHandleChange} />);
    expect(screen.getByText('Зураг')).toBeInTheDocument();
  });

  it('should handle file upload', () => {
    render(<ImagesSection handleChange={mockHandleChange} />);
    const file = new File(['dummy content'], 'test.jpg', { type: 'image/jpeg' });
    const input = screen.getByLabelText('+ Зураг оруулах');

    fireEvent.change(input, { target: { files: [file] } });

    expect(URL.createObjectURL).toHaveBeenCalledWith(file);
    expect(mockHandleChange).toHaveBeenCalledWith({
      target: {
        name: 'images',
        value: ['mocked-url'],
      },
    });
  });

  it('should remove image when X button is clicked', async () => {
    render(<ImagesSection handleChange={mockHandleChange} />);

    // Upload an image first
    const file = new File(['dummy content'], 'test.jpg', { type: 'image/jpeg' });
    const input = screen.getByLabelText('+ Зураг оруулах');
    fireEvent.change(input, { target: { files: [file] } });

    // Find and click remove button
    const removeButton = screen.getByText('X');
    fireEvent.click(removeButton);

    expect(mockHandleChange).toHaveBeenLastCalledWith({
      target: {
        name: 'images',
        value: [],
      },
    });
  });
  it('should handle null files', () => {
    render(<ImagesSection handleChange={mockHandleChange} />);
    const input = screen.getByLabelText('+ Зураг оруулах');

    fireEvent.change(input, { target: { files: null } });

    expect(mockHandleChange).toHaveBeenCalledWith({
      target: {
        name: 'images',
        value: [],
      },
    });
  });
  it('should handle multiple image uploads', () => {
    render(<ImagesSection handleChange={mockHandleChange} />);

    const files = [new File(['dummy1'], 'test1.jpg', { type: 'image/jpeg' }), new File(['dummy2'], 'test2.jpg', { type: 'image/jpeg' })];
    const input = screen.getByLabelText('+ Зураг оруулах');

    fireEvent.change(input, { target: { files } });

    expect(URL.createObjectURL).toHaveBeenCalledTimes(2);
    expect(mockHandleChange).toHaveBeenCalledWith({
      target: {
        name: 'images',
        value: ['mocked-url', 'mocked-url'],
      },
    });
  });
});
