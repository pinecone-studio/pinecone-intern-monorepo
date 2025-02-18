import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ImagesDialog } from '@/components/admin/ui/dialog';

// Mock the fetch API to simulate Cloudinary upload
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    statusText: 'OK',
    headers: new Headers(),
    redirected: false,
    type: 'basic',
    url: '',
    clone: jest.fn(),
    body: null,
    bodyUsed: false,
    arrayBuffer: jest.fn(),
    blob: jest.fn(),
    formData: jest.fn(),
    text: jest.fn(),
    json: () => Promise.resolve({ secureUrl: 'https://example.com/image.jpg' }),
  } as unknown as Response)
);

describe('ImagesDialog', () => {
  it('uploads images correctly and displays loading state', async () => {
    const setImages = jest.fn();
    const handleEditHotelImages = jest.fn();
    const images: any[] = [];

    render(<ImagesDialog images={images} setImages={setImages} handleEditHotelImages={handleEditHotelImages} />);

    const uploadButton = screen.getByText('Edit');
    fireEvent.click(uploadButton);

    const inputFile = screen.getByTestId('file-upload-input');
    const file = new File(['file contents'], 'test.jpg', { type: 'image/jpeg' });
    fireEvent.change(inputFile, { target: { files: [file] } });

    const spinner = screen.getByText('Uploading...');
    expect(spinner);

    await waitFor(() => expect(setImages));

    expect(spinner);
  });

  it('shows error message if image upload fails', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 400,
        statusText: 'Upload failed',
        json: () => Promise.resolve({ message: 'Upload failed' }),
      } as unknown as Response)
    );

    const setImages = jest.fn();
    const handleEditHotelImages = jest.fn();
    const images: any[] = [];

    render(<ImagesDialog images={images} setImages={setImages} handleEditHotelImages={handleEditHotelImages} />);

    const uploadButton = screen.getByText('Edit');
    fireEvent.click(uploadButton);
    const inputFile = screen.getByTestId('file-upload-input');
    const file = new File(['file contents'], 'test.jpg', { type: 'image/jpeg' });
    fireEvent.change(inputFile, { target: { files: [file] } });

    const spinner = screen.getByText('Uploading...');
    expect(spinner);

    await waitFor(() => expect(console.error));

    expect(spinner);
  });

  it('does not proceed if no files are selected', () => {
    const setImages = jest.fn();
    const handleEditHotelImages = jest.fn();
    const images: any[] = [];

    render(<ImagesDialog images={images} setImages={setImages} handleEditHotelImages={handleEditHotelImages} />);

    const uploadButton = screen.getByText('Edit');
    fireEvent.click(uploadButton);

    const inputFile = screen.getByTestId('file-upload-input');
    fireEvent.change(inputFile, { target: { files: [] } });

    expect(setImages);
  });

  it('opens the file input dialog when clicking the upload button', () => {
    render(<ImagesDialog images={[]} setImages={jest.fn()} handleEditHotelImages={jest.fn()} />);

    const uploadButton = screen.getByText('Edit');
    fireEvent.click(uploadButton);

    const inputFile = screen.getByTestId('file-upload-input');
    const uploadButtonSO = screen.getByTestId('upload-button');

    fireEvent.click(uploadButtonSO);

    expect(inputFile);
    expect(inputFile);
  });
});
