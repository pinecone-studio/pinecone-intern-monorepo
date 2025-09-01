import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { ProfilePictureUpload } from '@/features/update-user-profile/ProfilePictureUpload';
import { uploadCloudinaryPicture } from '@/utils/ProfilePicCloudinary';
import '@testing-library/jest-dom';
jest.mock('@/utils/ProfilePicCloudinary', () => ({
  uploadCloudinaryPicture: jest.fn(),
}));

describe('ProfilePictureUpload', () => {
  const mockOnImageUpdate = jest.fn();
  const mockOnError = jest.fn();
  const mockOnSuccess = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders avatar and upload button', () => {
    render(<ProfilePictureUpload currentImage="https://example.com/avatar.jpg" onImageUpdate={mockOnImageUpdate} />);
    expect(screen.getByTestId('profile-avatar')).toBeInTheDocument();
    expect(screen.getByTestId('profile-edit-btn')).toBeInTheDocument();
  });

  it('successfully uploads image and calls callbacks', async () => {
    const mockImageUrl = 'https://cloudinary.com/fake-image.jpg';
    (uploadCloudinaryPicture as jest.Mock).mockResolvedValueOnce(mockImageUrl);

    render(<ProfilePictureUpload onImageUpdate={mockOnImageUpdate} onSucces={mockOnSuccess} onError={mockOnError} />);

    const input = screen.getByTestId('profile-upload-input') as HTMLInputElement;
    const file = new File(['dummy'], 'avatar.png', { type: 'image/png' });

    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(mockOnImageUpdate).toHaveBeenCalledWith(mockImageUrl);
      expect(mockOnSuccess).toHaveBeenCalledWith('Профайл зураг шинэчлэгдлээ');
      expect(mockOnError).not.toHaveBeenCalled();
    });
  });

  it('calls onError when non-image file is selected', () => {
    render(<ProfilePictureUpload onImageUpdate={mockOnImageUpdate} onError={mockOnError} />);
    const input = screen.getByTestId('profile-upload-input') as HTMLInputElement;
    const file = new File(['dummy'], 'doc.txt', { type: 'text/plain' });

    fireEvent.change(input, { target: { files: [file] } });

    expect(mockOnError).toHaveBeenCalledWith('Зөвхөн зураг файл сонгоно уу');
    expect(mockOnImageUpdate).not.toHaveBeenCalled();
  });

  it('disables input when isLoading is true', () => {
    render(<ProfilePictureUpload onImageUpdate={mockOnImageUpdate} isLoading={true} />);
    const input = screen.getByTestId('profile-upload-input') as HTMLInputElement;
    expect(input).toBeDisabled();
  });
  it('handles upload failure gracefully', async () => {
    (uploadCloudinaryPicture as jest.Mock).mockRejectedValueOnce(new Error('Upload failed'));

    render(<ProfilePictureUpload onImageUpdate={mockOnImageUpdate} onSucces={mockOnSuccess} onError={mockOnError} />);

    const input = screen.getByTestId('profile-upload-input') as HTMLInputElement;
    const file = new File(['dummy'], 'avatar.png', { type: 'image/png' });

    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(mockOnError).toHaveBeenCalledWith('Зураг байршуулахад алдаа гарлаа');
      expect(mockOnImageUpdate).not.toHaveBeenCalled();
      expect(mockOnSuccess).not.toHaveBeenCalled();
    });
  });
});
