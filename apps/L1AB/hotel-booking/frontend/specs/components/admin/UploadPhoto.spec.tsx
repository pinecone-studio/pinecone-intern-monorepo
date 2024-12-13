import { UploadPhoto } from '@/components/admin';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useAdmin } from '@/components/providers/AdminProvider';

jest.mock('@/components/ui/dialog', () => ({
  Dialog: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DialogTrigger: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DialogContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DialogHeader: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DialogTitle: ({ children }: { children: React.ReactNode }) => <h2>{children}</h2>,
  DialogFooter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DialogClose: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

jest.mock('@/components/providers/AdminProvider', () => ({
  useAdmin: jest.fn(),
}));

jest.mock('next-cloudinary', () => ({
  CldUploadButton: ({ onSuccess }: any) => <button onClick={() => onSuccess({ info: { url: 'mocked-url' } })}>Upload</button>,
  CldImage: ({ src, alt }: any) => <img src={src} alt={alt} />,
}));

describe('UploadPhoto component', () => {
  it('opens dialog, uploads multiple images, and remains open after each upload', async () => {
    (useAdmin as jest.Mock).mockReturnValue({
      addHotelForm: {
        values: { images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'] },
        setFieldValue: jest.fn(),
        handleChange: jest.fn(),
        handleBlur: jest.fn(),
        errors: {},
        touched: {},
      },
      showError: jest.fn().mockReturnValue(false),
    });

    render(<UploadPhoto />);

    const uploadButton = screen.getByText('Edit');
    fireEvent.click(uploadButton);

    const uploadButtonInDialog = screen.getByText('Upload');
    fireEvent.click(uploadButtonInDialog);

    const uploadedImage1 = screen.getByAltText('Uploaded image 1');
    expect(uploadedImage1);

    const uploadedImage2 = screen.getByAltText('Uploaded image 2');
    expect(uploadedImage2);
  });
});
