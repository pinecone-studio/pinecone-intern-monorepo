import { UploadPhoto } from '@/components/admin';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('@/components/ui/dialog', () => ({
  Dialog: ({ children }: any) => <div>{children}</div>,
  DialogTrigger: ({ children }: any) => <div>{children}</div>,
  DialogContent: ({ children, onInteractOutside }: any) => <div onClick={onInteractOutside}>{children}</div>,
  DialogFooter: ({ children }: any) => <div>{children}</div>,
  DialogHeader: ({ children }: any) => <div>{children}</div>,
  DialogTitle: ({ children }: any) => <div>{children}</div>,
}));

jest.mock('next-cloudinary', () => ({
  CldUploadButton: ({ onSuccess }: any) => <button onClick={() => onSuccess({ info: { url: 'mocked-url' } })}>Upload</button>,
  CldImage: ({ src, alt }: any) => <img src={src} alt={alt} />,
}));

describe('UploadPhoto component', () => {
  it('opens dialog, uploads multiple images, and remains open after each upload', async () => {
    render(<UploadPhoto />);

    const uploadButton = screen.getByText('Upload photo');
    fireEvent.click(uploadButton);

    const uploadButtonInDialog = screen.getByText('Upload');
    fireEvent.click(uploadButtonInDialog);

    const uploadedImage1 = screen.getByAltText('Uploaded image 1');
    expect(uploadedImage1).toHaveAttribute('src', 'mocked-url');

    fireEvent.click(uploadButtonInDialog);

    const uploadedImage2 = screen.getByAltText('Uploaded image 2');
    expect(uploadedImage2).toHaveAttribute('src', 'mocked-url');

    expect(screen.getByText('Images')).toBeInTheDocument();
  });

  it('prevents outside interaction', () => {
    render(<UploadPhoto />);

    const uploadButton = screen.getByText('Upload photo');
    fireEvent.click(uploadButton);

    const dialogContent = screen.getByText('Images');

    fireEvent.click(dialogContent);

    expect(dialogContent).toBeInTheDocument();
  });
});
