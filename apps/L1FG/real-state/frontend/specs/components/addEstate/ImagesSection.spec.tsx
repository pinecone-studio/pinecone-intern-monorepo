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

  it('should render the upload section correctly', () => {
    const mockFormData = { images: [] };
    render(<ImagesSection formData={mockFormData} handleChange={mockHandleChange} />);

    expect(screen.getByText('Зураг')).toBeInTheDocument();
    expect(screen.getByText('+ Зураг оруулах')).toBeInTheDocument();
    expect(screen.getByText(/Та үл хөдлөх хөрөнгийн зарын зурагнуудыг оруулна уу/)).toBeInTheDocument();
  });

  it('should render with existing images', () => {
    const mockFormData = {
      images: ['image1.jpg', 'image2.jpg'],
    };
    render(<ImagesSection formData={mockFormData} handleChange={mockHandleChange} />);

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute('src', 'image1.jpg');
    expect(images[1]).toHaveAttribute('src', 'image2.jpg');
  });

  it('should handle file upload', () => {
    const mockFormData = { images: [] };
    render(<ImagesSection formData={mockFormData} handleChange={mockHandleChange} />);

    const file = new File(['dummy content'], 'test.jpg', { type: 'image/jpeg' });
    const input = screen.getByTestId('upload-image');
    fireEvent.change(input, { target: { files: [file] } });

    expect(URL.createObjectURL).toHaveBeenCalledWith(file);
    expect(mockHandleChange).toHaveBeenCalledWith({
      target: {
        name: 'images',
        value: ['mocked-url'],
      },
    });
  });

  it('should handle file input with null files', () => {
    const mockFormData = { images: [] };
    render(<ImagesSection formData={mockFormData} handleChange={mockHandleChange} />);

    const input = screen.getByTestId('upload-image');
    fireEvent.change(input, { target: { files: null } });

    expect(mockHandleChange).toHaveBeenCalledWith({
      target: {
        name: 'images',
        value: [],
      },
    });
  });

  it('should handle multiple image uploads', () => {
    const mockFormData = { images: [] };
    render(<ImagesSection formData={mockFormData} handleChange={mockHandleChange} />);

    const files = [new File(['dummy1'], 'test1.jpg', { type: 'image/jpeg' }), new File(['dummy2'], 'test2.jpg', { type: 'image/jpeg' })];
    const input = screen.getByTestId('upload-image');
    fireEvent.change(input, { target: { files } });

    expect(URL.createObjectURL).toHaveBeenCalledTimes(2);
    expect(mockHandleChange).toHaveBeenCalledWith({
      target: {
        name: 'images',
        value: ['mocked-url', 'mocked-url'],
      },
    });
  });

  it('should remove image when X button is clicked', () => {
    const mockFormData = {
      images: ['image1.jpg', 'image2.jpg'],
    };
    render(<ImagesSection formData={mockFormData} handleChange={mockHandleChange} />);

    const removeButtons = screen.getAllByText('X');
    fireEvent.click(removeButtons[0]);
    expect(mockHandleChange).toHaveBeenCalledWith({
      target: {
        name: 'images',
        value: ['image2.jpg'],
      },
    });
  });

  it('should sync with formData changes', () => {
    const mockFormData = { images: ['initial.jpg'] };
    const { rerender } = render(<ImagesSection formData={mockFormData} handleChange={mockHandleChange} />);

    let images = screen.getAllByRole('img');
    expect(images).toHaveLength(1);
    expect(images[0]).toHaveAttribute('src', 'initial.jpg');

    rerender(<ImagesSection formData={{ images: ['initial.jpg', 'new.jpg'] }} handleChange={mockHandleChange} />);

    images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
    expect(images[1]).toHaveAttribute('src', 'new.jpg');
  });

  it('should initialize with empty array if no images provided', () => {
    const mockFormData = { images: undefined };
    render(<ImagesSection formData={mockFormData} handleChange={mockHandleChange} />);

    const images = screen.queryAllByRole('img');
    expect(images).toHaveLength(0);
  });
});
