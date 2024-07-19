import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import UploadImage from '../..//src/app/student/_components/UploadImage';
import { toast } from 'sonner';

// Mock the external dependencies
jest.mock('@/components/svg/Vector', () => ({
  Vector: () => <div data-testid="vector-mock" />,
}));

jest.mock('sonner', () => ({
  toast: {
    error: jest.fn(),
  },
}));

describe('UploadImage', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when no value is provided', () => {
    const { getByTestId, getByText } = render(<UploadImage value="" onChange={mockOnChange} />);

    expect(getByTestId('dropzone-file')).toBeInTheDocument();
    expect(getByText('Татах')).toBeInTheDocument();
  });

  it('does not render the upload button when a value is provided', () => {
    const { queryByTestId } = render(<UploadImage value="https://example.com/image.jpg" onChange={mockOnChange} />);

    expect(queryByTestId('dropzone-file')).not.toBeInTheDocument();
  });

  it('shows uploading state when file is being uploaded', async () => {
    const { getByTestId, getByText } = render(<UploadImage value="" onChange={mockOnChange} />);

    const input = getByTestId('dropzone-file').querySelector('input');
    const file = new File(['dummy content'], 'test.png', { type: 'image/png' });

    // Mock fetch to delay the response
    global.fetch = jest.fn(() => new Promise((resolve) => setTimeout(() => resolve({ ok: true, json: () => Promise.resolve({ secure_url: 'https://example.com/uploaded.jpg' }) }), 100)));

    await act(async () => {
      fireEvent.change(input!, { target: { files: [file] } });
    });

    expect(getByText('UPLOADING...')).toBeInTheDocument();
  });

  it('calls onChange with the secure URL when upload is successful', async () => {
    const { getByTestId } = render(<UploadImage value="" onChange={mockOnChange} />);

    const input = getByTestId('dropzone-file').querySelector('input');
    const file = new File(['dummy content'], 'test.png', { type: 'image/png' });

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ secure_url: 'https://example.com/uploaded.jpg' }),
    });

    await act(async () => {
      fireEvent.change(input!, { target: { files: [file] } });
    });

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith('https://example.com/uploaded.jpg');
    });
  });

  it('shows error toast when upload fails', async () => {
    const { getByTestId } = render(<UploadImage value="" onChange={mockOnChange} />);

    const input = getByTestId('dropzone-file').querySelector('input');
    const file = new File(['dummy content'], 'test.png', { type: 'image/png' });

    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
    });

    console.error = jest.fn(); // Mock console.error to prevent it from cluttering the test output

    await act(async () => {
      fireEvent.change(input!, { target: { files: [file] } });
    });

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Алдаа гарлаа Дахин оролдоно уу');
    });
  });

  it('does nothing when no file is selected', async () => {
    const { getByTestId } = render(<UploadImage value="" onChange={mockOnChange} />);

    const input = getByTestId('dropzone-file').querySelector('input');

    await act(async () => {
      fireEvent.change(input!, { target: { files: [] } });
    });

    expect(mockOnChange).not.toHaveBeenCalled();
  });
});
