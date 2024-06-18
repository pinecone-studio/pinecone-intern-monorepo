import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ImageInput } from '@/app/articles/_components';
import { act } from 'react-dom/test-utils';

describe('ImageInput Component', () => {
  let mockOnImageUpload: jest.Mock;

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

    const parentDiv = screen.getByText('Зураг оруулах').parentElement;
    fireEvent.click(parentDiv);

    const fileInput = screen.getByLabelText('Өнгөц зураг');
    expect(fileInput).toHaveProperty('type', 'file');
    expect(fileInput).toHaveAttribute('accept', 'image/*');
  });

  test('uploads and previews an image', async () => {
    render(<ImageInput onImageUpload={mockOnImageUpload} />);

    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
    const fileInput = screen.getByLabelText('Өнгөц зураг');

    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });

    await waitFor(() => {
      expect(screen.getByAltText('uploaded img')).toBeInTheDocument();
    });
    expect(mockOnImageUpload).toHaveBeenCalledWith(file);
  });

  test('does not call onImageUpload if no file is selected', () => {
    render(<ImageInput onImageUpload={mockOnImageUpload} />);
    const fileInput = screen.getByLabelText('Өнгөц зураг').closest('input') as HTMLInputElement;

    fireEvent.change(fileInput, { target: { files: [] } });

    expect(mockOnImageUpload).not.toHaveBeenCalled();
  });

  test('handles invalid file upload gracefully', () => {
    render(<ImageInput onImageUpload={mockOnImageUpload} />);

    const invalidFile = new File([''], 'example.txt', { type: 'text/plain' });
    const fileInput = screen.getByLabelText('Өнгөц зураг');

    fireEvent.change(fileInput, { target: { files: [invalidFile] } });

    expect(screen.queryByAltText('uploaded img')).not.toBeInTheDocument();
    expect(mockOnImageUpload).not.toHaveBeenCalled();
  });
});
