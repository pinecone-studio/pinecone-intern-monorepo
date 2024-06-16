import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ImageInput } from '@/app/articles/_components/ImageInput';

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }) => <img src={src} alt={alt} {...props} />,
}));

const mockOnImageUpload = jest.fn();

describe('ImageInput Component', () => {
  let mockOnImageUpload;

  beforeEach(() => {
    mockOnImageUpload = jest.fn();
  });

  test('renders the component with initial state', () => {
    render(<ImageInput onImageUpload={mockOnImageUpload} />);
    expect(screen.getByText('Өнгөц зураг')).toBeInTheDocument();
    expect(screen.getByText('Зураг оруулах')).toBeInTheDocument();
    expect(screen.getByText('Хэмжээ: 928x427')).toBeInTheDocument();
  });

  test('opens file input when clicking on the parent div', () => {
    render(<ImageInput onImageUpload={mockOnImageUpload} />);
    const divElement = screen.getByText('Зураг оруулах').parentElement;
    const fileInput = screen.getByLabelText('Өнгөц зураг').closest('input');
    fireEvent.click(divElement);

    expect(fileInput).toHaveProperty('type', 'file');
    expect(fileInput).toHaveAttribute('accept', 'image/*');
  });

  test('uploads and previews an image', async () => {
    render(<ImageInput onImageUpload={mockOnImageUpload} />);
  
    const fileInput = screen.getByLabelText('Өнгөц зураг');
    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
  
    const reader = new FileReader();
    jest.spyOn(reader, 'readAsDataURL').mockImplementation(function () {
      if (this.onload) {
        this.onload({ target: { result: 'data:image/png;base64,dummy' } });
      }
    });
  
    jest.spyOn(global, 'FileReader').mockImplementation(() => reader);
  
    fireEvent.change(fileInput, { target: { files: [file] } });
  
    await waitFor(() => expect(screen.getByAltText('uploaded img')).toBeInTheDocument());
    expect(mockOnImageUpload).toHaveBeenCalledWith(file);
  });
  
  afterEach(() => {
    jest.restoreAllMocks();
  });
  

  test('allows uploading a new image and updates the preview', async () => {
    render(<ImageInput onImageUpload={mockOnImageUpload} />);

    const firstFile = new File(['dummy content 1'], 'example1.png', { type: 'image/png' });
    const secondFile = new File(['dummy content 2'], 'example2.png', { type: 'image/png' });
    const fileInput = screen.getByLabelText('Өнгөц зураг').closest('input');

    // Mocking FileReader for first image
    jest.spyOn(FileReader.prototype, 'readAsDataURL').mockImplementationOnce(function() {
      this.onload({ target: { result: 'data:image/png;base64,dummy1' } });
    });

    fireEvent.change(fileInput, { target: { files: [firstFile] } });
    await waitFor(() => expect(screen.getByAltText('uploaded img')).toBeInTheDocument());
    expect(mockOnImageUpload).toHaveBeenCalledWith(firstFile);

    // Mocking FileReader for second image
    jest.spyOn(FileReader.prototype, 'readAsDataURL').mockImplementationOnce(function() {
      this.onload({ target: { result: 'data:image/png;base64,dummy2' } });
    });

    fireEvent.change(fileInput, { target: { files: [secondFile] } });
    await waitFor(() => expect(screen.getByAltText('uploaded img')).toBeInTheDocument());
    expect(mockOnImageUpload).toHaveBeenCalledWith(secondFile);
  });

  test('click event on file input does not trigger parent click event', () => {
    render(<ImageInput onImageUpload={mockOnImageUpload} />);

    const fileInput = screen.getByLabelText('Өнгөц зураг').closest('input');
    fireEvent.click(fileInput);

    expect(fileInput).toBeInTheDocument();
  });

  test('handles invalid file upload gracefully', () => {
    render(<ImageInput onImageUpload={mockOnImageUpload} />);

    const invalidFile = new File([''], 'example.txt', { type: 'text/plain' });
    const fileInput = screen.getByLabelText('Өнгөц зураг').closest('input');

    fireEvent.change(fileInput, { target: { files: [invalidFile] } });

    expect(screen.queryByAltText('uploaded img')).not.toBeInTheDocument();
    expect(mockOnImageUpload).not.toHaveBeenCalled();
  });
});
