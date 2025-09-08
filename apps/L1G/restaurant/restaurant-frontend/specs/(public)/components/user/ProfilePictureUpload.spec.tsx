import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ProfilePictureUpload } from '@/components/user/ProfilePictureUpload';
import { UploadImage } from '@/utils/image-upload';
import '@testing-library/jest-dom';

// Mock UploadImage util
jest.mock('@/utils/image-upload', () => ({
  UploadImage: jest.fn(),
}));

describe('ProfilePictureUpload', () => {
  const mockOnUpdate = jest.fn();
  const mockOnError = jest.fn();
  const mockOnSuccess = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders avatar with fallback when no image provided', () => {
    render(<ProfilePictureUpload onImageUpdate={mockOnUpdate} />);
    expect(screen.getByTestId('profile-avatar')).toBeInTheDocument();
  });

  it('displays currentImage if provided', () => {
    render(<ProfilePictureUpload currentImage="test.jpg" onImageUpdate={mockOnUpdate} />);
    const avatar = screen.getByTestId('profile-avatar');
    expect(avatar).toBeInTheDocument();
  });

  it('calls onError when a non-image file is selected', () => {
    render(<ProfilePictureUpload onImageUpdate={mockOnUpdate} onError={mockOnError} />);
    const input = screen.getByTestId('profile-upload-input') as HTMLInputElement;

    const file = new File(['text'], 'test.txt', { type: 'text/plain' });
    fireEvent.change(input, { target: { files: [file] } });

    expect(mockOnError).toHaveBeenCalledWith('Зөвхөн зураг файл сонгоно уу');
  });

  it('uploads image successfully and calls onSuccess + onImageUpdate', async () => {
    (UploadImage as jest.Mock).mockResolvedValue('http://image-url.com/test.png');
    render(<ProfilePictureUpload onImageUpdate={mockOnUpdate} onSuccess={mockOnSuccess} />);

    const input = screen.getByTestId('profile-upload-input') as HTMLInputElement;
    const file = new File(['dummy'], 'test.png', { type: 'image/png' });

    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(UploadImage).toHaveBeenCalledWith(file);
      expect(mockOnUpdate).toHaveBeenCalledWith('http://image-url.com/test.png');
      expect(mockOnSuccess).toHaveBeenCalledWith('Профайл зураг шинэчлэгдлээ');
    });
  });

  it('calls onError if upload fails', async () => {
    (UploadImage as jest.Mock).mockRejectedValue(new Error('Upload failed'));
    render(<ProfilePictureUpload onImageUpdate={mockOnUpdate} onError={mockOnError} />);

    const input = screen.getByTestId('profile-upload-input') as HTMLInputElement;
    const file = new File(['dummy'], 'test.png', { type: 'image/png' });

    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(mockOnError).toHaveBeenCalledWith('Зураг байршуулахад алдаа гарлаа');
    });
  });

  it('disables input when isLoading is true', () => {
    render(<ProfilePictureUpload onImageUpdate={mockOnUpdate} isLoading={true} />);
    const input = screen.getByTestId('profile-upload-input');
    expect(input).toBeDisabled();
  });

  // 🆕 EXTRA TEST: no file selected branch
  it('does nothing when no file is selected', () => {
    render(<ProfilePictureUpload onImageUpdate={mockOnUpdate} />);
    const input = screen.getByTestId('profile-upload-input') as HTMLInputElement;

    fireEvent.change(input, { target: { files: [] } });

    expect(mockOnUpdate).not.toHaveBeenCalled();
    expect(UploadImage).not.toHaveBeenCalled();
  });
});
