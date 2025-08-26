/* eslint-disable camelcase, max-lines */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProfileImages } from '@/components/ProfileImages';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
let mockLoading = false;

const mockUploadImagesMutation = jest.fn();
jest.mock('@/generated', () => ({
  useUploadImagesMutation: () => [mockUploadImagesMutation, { loading: mockLoading }],
}));

jest.mock('next/image', () => {
  const MockImage = (props: any) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img {...props} alt={props.alt || 'mocked image'} />
  );
  MockImage.displayName = 'MockImage';
  return MockImage;
});

global.alert = jest.fn();
global.console.error = jest.fn();

const mockOnSuccess = jest.fn();
const mockOnBack = jest.fn();
const mockUpdateUserData = jest.fn();

const renderComponent = () => render(<ProfileImages onSuccess={mockOnSuccess} onBack={mockOnBack} updateUserData={mockUpdateUserData} />);

describe('ProfileImages Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = 'demo-cloud';
  });

  it('renders title and description', () => {
    renderComponent();
    expect(screen.getByText('Upload your image')).toBeInTheDocument();
    expect(screen.getByText('Please choose an image that represents you.')).toBeInTheDocument();
  });

  it('renders 6 empty slots initially', () => {
    renderComponent();
    for (let i = 0; i < 6; i++) {
      expect(screen.getByTestId(`image-slot-${i}`)).toBeInTheDocument();
    }
  });

  it('handles image upload successfully', async () => {
    renderComponent();
    const file = new File(['dummy'], 'test.png', { type: 'image/png' });

    mockedAxios.post.mockResolvedValueOnce({
      data: { secure_url: 'http://test.com/test.png' },
    });

    const input = screen.getByTestId('upload-input') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => expect(screen.getByTestId('uploaded-image-0')).toBeInTheDocument());
  });

  it('removes an uploaded image', async () => {
    renderComponent();
    const file = new File(['dummy'], 'test.png', { type: 'image/png' });
    mockedAxios.post.mockResolvedValueOnce({
      data: { secure_url: 'http://test.com/test.png' },
    });

    fireEvent.change(screen.getByTestId('upload-input'), {
      target: { files: [file] },
    });

    await waitFor(() => expect(screen.getByTestId('uploaded-image-0')).toBeInTheDocument());

    fireEvent.click(screen.getByTestId('remove-button-0'));

    await waitFor(() => expect(screen.queryByTestId('uploaded-image-0')).not.toBeInTheDocument());
  });

  it('alerts when trying to go next without images', async () => {
    renderComponent();
    fireEvent.click(screen.getByRole('button', { name: /next/i }));
    await waitFor(() => expect(global.alert).toHaveBeenCalledWith('Please upload at least one image.'));
  });

  it('calls updateUserData and onSuccess when Next is clicked with images', async () => {
    renderComponent();
    const file = new File(['dummy'], 'test.png', { type: 'image/png' });
    mockedAxios.post.mockResolvedValueOnce({
      data: { secure_url: 'http://test.com/test.png' },
    });

    fireEvent.change(screen.getByTestId('upload-input'), {
      target: { files: [file] },
    });

    await waitFor(() => expect(screen.getByTestId('uploaded-image-0')).toBeInTheDocument());

    mockUploadImagesMutation.mockResolvedValueOnce({});

    fireEvent.click(screen.getByRole('button', { name: /next/i }));

    await waitFor(() => {
      expect(mockUpdateUserData).toHaveBeenCalledWith({
        images: ['http://test.com/test.png'],
      });
      expect(mockUploadImagesMutation).toHaveBeenCalledWith({
        variables: { images: ['http://test.com/test.png'] },
      });
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });

  it('shows alert when mutation fails', async () => {
    renderComponent();
    const file = new File(['dummy'], 'test.png', { type: 'image/png' });
    mockedAxios.post.mockResolvedValueOnce({
      data: { secure_url: 'http://test.com/test.png' },
    });

    fireEvent.change(screen.getByTestId('upload-input'), {
      target: { files: [file] },
    });

    await waitFor(() => expect(screen.getByTestId('uploaded-image-0')).toBeInTheDocument());

    mockUploadImagesMutation.mockRejectedValueOnce(new Error('fail'));

    fireEvent.click(screen.getByRole('button', { name: /next/i }));

    await waitFor(() => expect(global.alert).toHaveBeenCalledWith('Something went wrong while saving your images.'));
  });

  it('calls onBack when Back is clicked', () => {
    renderComponent();
    fireEvent.click(screen.getByRole('button', { name: /back/i }));
    expect(mockOnBack).toHaveBeenCalled();
  });

  it('logs error when cloudName is missing', async () => {
    delete process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

    renderComponent();
    const file = new File(['dummy'], 'test.png', { type: 'image/png' });

    const input = screen.getByTestId('upload-input') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => expect(console.error).toHaveBeenCalledWith('Cloudinary cloud name is missing!'));
  });

  it('displays loading spinner during image upload', async () => {
    renderComponent();
    const file = new File(['dummy'], 'test.png', { type: 'image/png' });

    mockedAxios.post.mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                data: { secure_url: 'http://test.com/test.png' },
              }),
            1000
          )
        )
    );

    const input = screen.getByTestId('upload-input') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => expect(screen.getByTestId('loader-0')).toBeInTheDocument());
  });
  it('logs upload error when image upload fails', async () => {
    renderComponent();
    const file = new File(['dummy'], 'test.png', { type: 'image/png' });

    // Simulate axios post failure
    mockedAxios.post.mockRejectedValueOnce(new Error('Upload failed'));

    const input = screen.getByTestId('upload-input') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [file] } });

    // Wait for upload attempt and error logging
    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith('Upload error:', expect.any(Error));
    });
  });
  it('displays loading spinner during mutation loading', () => {
    mockLoading = true;

    renderComponent();

    expect(screen.getByTestId('next-loader')).toBeInTheDocument();

    mockLoading = false;
  });
  it('returns null if secure_url is missing in Cloudinary response', async () => {
    renderComponent();

    const file = new File(['dummy'], 'test.png', { type: 'image/png' });

    // Cloudinary responds successfully, but without secure_url
    mockedAxios.post.mockResolvedValueOnce({
      data: {}, // no secure_url
    });

    const input = screen.getByTestId('upload-input') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [file] } });

    // Wait for the upload attempt and check that no image was added
    await waitFor(() => {
      expect(screen.queryByTestId('uploaded-image-0')).not.toBeInTheDocument();
    });
  });
  it('does nothing when no file is selected', async () => {
    renderComponent();

    const input = screen.getByTestId('upload-input') as HTMLInputElement;

    // Fire event with empty file list
    fireEvent.change(input, { target: { files: [] } });

    // Nothing should happen — no upload, no console, no UI change
    await waitFor(() => {
      expect(mockedAxios.post).not.toHaveBeenCalled();
      expect(screen.queryByTestId('uploaded-image-0')).not.toBeInTheDocument();
    });
  });
  it('does nothing when all image slots are full', async () => {
    renderComponent();

    const input = screen.getByTestId('upload-input') as HTMLInputElement;
    const file = new File(['dummy'], 'test.png', { type: 'image/png' });

    // Fill all 6 slots
    for (let i = 0; i < 6; i++) {
      mockedAxios.post.mockResolvedValueOnce({
        data: { secure_url: `http://test.com/image${i}.png` },
      });

      fireEvent.change(input, { target: { files: [file] } });

      // Wait for each image to upload
      // eslint-disable-next-line no-await-in-loop
      await waitFor(() => expect(screen.getByTestId(`uploaded-image-${i}`)).toBeInTheDocument());
    }

    // Upload 7th image (should not be accepted)
    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledTimes(6); // still only 6 calls
    });
  });
});
