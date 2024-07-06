import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ImageInput } from '@/app/articles/_components/add';
import { act } from 'react-dom/test-utils';

describe('ImageInput Component', () => {
  let setFile: jest.Mock<void, [File | null]>;

  beforeEach(() => {
    setFile = jest.fn();
  });

  test('renders the component with initial state', () => {
    render(<ImageInput setFile={setFile} />);

    expect(screen.getByText('Өнгөц зураг')).toBeInTheDocument();
    expect(screen.getByText('Зураг оруулах')).toBeInTheDocument();
    expect(screen.getByText('Хэмжээ: 928x427')).toBeInTheDocument();
  });

  test('opens file input when clicking on the parent div', () => {
    render(<ImageInput setFile={setFile} />);

    const parentDiv = screen.getByText('Зураг оруулах').parentElement;
    fireEvent.click(parentDiv);

    const fileInput = screen.getByLabelText('Өнгөц зураг');
    expect(fileInput).toHaveProperty('type', 'file');
    expect(fileInput).toHaveAttribute('accept', 'image/*');
  });

  test('uploads and previews an image', async () => {
    render(<ImageInput setFile={setFile} />);

    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
    const fileInput = screen.getByLabelText('Өнгөц зураг');

    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });

    await waitFor(() => {
      expect(screen.getByAltText('uploaded img')).toBeInTheDocument();
    });
    expect(setFile).toHaveBeenCalledWith(file);
  });

  test('does not call setFile if no file is selected', () => {
    render(<ImageInput setFile={setFile} />);
    const fileInput = screen.getByLabelText('Өнгөц зураг').closest('input') as HTMLInputElement;

    fireEvent.change(fileInput, { target: { files: [] } });

    expect(setFile).not.toHaveBeenCalled();
  });

  test('handles invalid file upload gracefully', () => {
    render(<ImageInput setFile={setFile} />);

    const invalidFile = new File([''], 'example.txt', { type: 'text/plain' });
    const fileInput = screen.getByLabelText('Өнгөц зураг');

    fireEvent.change(fileInput, { target: { files: [invalidFile] } });

    expect(screen.queryByAltText('uploaded img')).not.toBeInTheDocument();
    expect(setFile).not.toHaveBeenCalled();
  });
});

