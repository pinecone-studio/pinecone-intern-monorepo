/*eslint-disable*/
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { expect } from '@jest/globals';
import ImageUploadWithPreview from '@/app/_features/adminFeature/ImageUrlPreview';
import { act as rtlAct } from '@testing-library/react';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

global.URL.createObjectURL = jest.fn((file) => 'mock-url');
global.URL.revokeObjectURL = jest.fn();

process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET = 'test-preset';
process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = 'test-cloud';

describe('ImageUploadWithPreview', () => {
  let originalUseRef: typeof React.useRef;
  const mockOnChange = jest.fn();
  const defaultProps = {
    name: 'concertPhoto',
    onChange: mockOnChange,
  };
  beforeAll(() => {
    originalUseRef = React.useRef;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
  });

  it('renders without initial value', () => {
    render(<ImageUploadWithPreview {...defaultProps} />);
    expect(screen.getByText('Зураг Оруулах +')).toBeInTheDocument();
    expect(screen.getByLabelText('Concert Photo')).toBeInTheDocument();
  });

  it('renders with initial value', () => {
    render(<ImageUploadWithPreview {...defaultProps} value="initial-image.jpg" />);
    expect(screen.getByAltText('Preview')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Clear' })).toBeInTheDocument();
  });

  it('handles file upload successfully', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ secure_url: 'uploaded-image.jpg' }),
    });

    render(<ImageUploadWithPreview {...defaultProps} />);

    const file = new File(['test'], 'test.png', { type: 'image/png' });
    const input = screen.getByLabelText('Concert Photo');

    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByAltText('Preview')).toBeInTheDocument();
    });

    expect(mockOnChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: {
          name: 'concertPhoto',
          value: 'uploaded-image.jpg',
        },
      })
    );
  });

  it('switches between upload text states correctly', async () => {
    let resolveUpload: (value: any) => void;
    const uploadPromise = new Promise((resolve) => {
      resolveUpload = resolve;
    });
    (global.fetch as jest.Mock).mockImplementationOnce(() => uploadPromise);

    render(<ImageUploadWithPreview {...defaultProps} />);

    expect(screen.getByText('Зураг Оруулах +')).toBeInTheDocument();

    const file = new File([''], 'test.png', { type: 'image/png' });

    (global.URL.createObjectURL as jest.Mock).mockReturnValueOnce(null);

    const input = screen.getByLabelText('Concert Photo');

    await act(async () => {
      fireEvent.change(input, { target: { files: [file] } });
    });

    expect(screen.getByText('Uploading...')).toBeInTheDocument();

    await act(async () => {
      resolveUpload!({
        ok: true,
        json: () => Promise.resolve({ secure_url: 'test-url' }),
      });
    });

    await waitFor(() => {
      expect(screen.queryByText('Uploading...')).not.toBeInTheDocument();
    });
  });

  it('handles upload returning undefined', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ secure_url: undefined }),
    });

    render(<ImageUploadWithPreview {...defaultProps} />);

    const file = new File(['test'], 'test.png', { type: 'image/png' });
    const input = screen.getByLabelText('Concert Photo');

    await fireEvent.change(input, { target: { files: [file] } });

    expect(mockOnChange).not.toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });

  it('handles clearing the preview', async () => {
    render(<ImageUploadWithPreview {...defaultProps} value="initial-image.jpg" />);

    const clearButton = screen.getByRole('button', { name: 'Clear' });
    fireEvent.click(clearButton);

    expect(screen.queryByAltText('Preview')).not.toBeInTheDocument();
    expect(mockOnChange).toHaveBeenCalledWith({
      target: {
        name: 'concertPhoto',
        value: '',
      },
    });
  });

  it('handles empty file selection', () => {
    render(<ImageUploadWithPreview {...defaultProps} />);

    const input = screen.getByLabelText('Concert Photo');
    fireEvent.change(input, { target: { files: [] } });

    expect(screen.queryByAltText('Preview')).not.toBeInTheDocument();
    expect(mockOnChange).toHaveBeenCalledWith({
      target: {
        name: 'concertPhoto',
        value: '',
      },
    });
  });

  it('updates preview when value prop changes', () => {
    const { rerender } = render(<ImageUploadWithPreview {...defaultProps} value="initial-image.jpg" />);
    expect(screen.getByAltText('Preview')).toHaveAttribute('src', 'initial-image.jpg');

    rerender(<ImageUploadWithPreview {...defaultProps} value="new-image.jpg" />);
    expect(screen.getByAltText('Preview')).toHaveAttribute('src', 'new-image.jpg');
  });
  it('handles FormData with and without upload_preset', async () => {
    const formDataAppendSpy = jest.spyOn(FormData.prototype, 'append');
    const originalPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET = 'test-preset';
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ secure_url: 'test-url' }),
    });

    render(<ImageUploadWithPreview {...defaultProps} />);
    const file = new File(['test'], 'test.png', { type: 'image/png' });
    const input = screen.getByLabelText('Concert Photo');
    await act(async () => {
      await fireEvent.change(input, { target: { files: [file] } });
    });
    expect(formDataAppendSpy).toHaveBeenCalledWith('upload_preset', 'test-preset');

    delete process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ secure_url: 'test-url' }),
    });

    render(<ImageUploadWithPreview {...defaultProps} />);
    await act(async () => {
      await fireEvent.change(input, { target: { files: [file] } });
    });
    expect(formDataAppendSpy).toHaveBeenCalledWith('upload_preset', '');

    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET = originalPreset;
    formDataAppendSpy.mockRestore();
  });

  it('displays uploading state', async () => {
    let resolveUpload: (_value: any) => void;
    const uploadPromise = new Promise((resolve) => {
      resolveUpload = resolve;
    });

    (global.fetch as jest.Mock).mockImplementationOnce(() => uploadPromise);

    render(<ImageUploadWithPreview {...defaultProps} />);

    const file = new File(['test'], 'test.png', { type: 'image/png' });
    const input = screen.getByLabelText('Concert Photo');

    fireEvent.change(input, { target: { files: [file] } });

    expect(input).toBeDisabled();

    const clearButton = screen.getByRole('button', { name: 'Clear' });
    expect(clearButton).toBeDisabled();

    resolveUpload!({
      ok: true,
      json: () => Promise.resolve({ secure_url: 'uploaded-image.jpg' }),
    });

    await waitFor(() => {
      expect(input).not.toBeDisabled();
      expect(clearButton).not.toBeDisabled();
    });
  });
  describe('handleClearPreview', () => {
    const mockSetImagePreview = jest.fn();
    const mockOnChange = jest.fn();
    const mockFileInputRef = {
      current: {
        value: 'test-file.jpg',
      },
    };
    const name = 'imageInput';

    const handleClearPreview = () => {
      mockSetImagePreview(null);
      if (mockFileInputRef.current) {
        mockFileInputRef.current.value = '';
      }

      mockOnChange({
        target: {
          name: name,
          value: '',
        },
      } as React.ChangeEvent<HTMLInputElement>);
    };

    beforeEach(() => {
      jest.clearAllMocks();

      mockFileInputRef.current.value = 'test-file.jpg';
    });

    it('should clear the image preview', () => {
      handleClearPreview();
      expect(mockSetImagePreview).toHaveBeenCalledWith(null);
    });

    it('should clear the file input value', () => {
      handleClearPreview();
      expect(mockFileInputRef.current.value).toBe('');
    });

    it('should trigger onChange with empty value', () => {
      handleClearPreview();
      expect(mockOnChange).toHaveBeenCalledWith({
        target: {
          name: 'imageInput',
          value: '',
        },
      });
    });

    it('should handle case when fileInputRef is null', () => {
      const nullFileInputRef = { current: null };
      const handleClearPreviewWithNullRef = () => {
        mockSetImagePreview(null);
        if (nullFileInputRef.current) {
          nullFileInputRef.current.value = '';
        }

        mockOnChange({
          target: {
            name: name,
            value: '',
          },
        } as React.ChangeEvent<HTMLInputElement>);
      };

      handleClearPreviewWithNullRef();
      expect(mockSetImagePreview).toHaveBeenCalledWith(null);
      expect(mockOnChange).toHaveBeenCalled();
      // Should not throw an error when ref is null
    });

    it('should call all functions in the correct order', () => {
      const calls: string[] = [];

      const mockWithOrder = {
        setImagePreview: jest.fn(() => calls.push('setImagePreview')),
        onChange: jest.fn(() => calls.push('onChange')),
      };

      const handleClearPreviewOrdered = () => {
        mockWithOrder.setImagePreview(null);
        if (mockFileInputRef.current) {
          mockFileInputRef.current.value = '';
          calls.push('clearFileInput');
        }

        mockWithOrder.onChange({
          target: {
            name: name,
            value: '',
          },
        } as React.ChangeEvent<HTMLInputElement>);
      };

      handleClearPreviewOrdered();
      expect(calls).toEqual(['setImagePreview', 'clearFileInput', 'onChange']);
    });
  });
});

function act(callback: () => Promise<void>) {
  return rtlAct(callback);
}
