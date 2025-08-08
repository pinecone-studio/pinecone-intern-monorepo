/* eslint-disable no-console */
import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { ProfileImages } from '@/components/ProfileImages';
import '@testing-library/jest-dom';
import axios from 'axios';

const mockOnSuccess = jest.fn();
jest.mock('next/image', () => {
  const MockedImage = (props: any) => {
    const { fill, ...rest } = props;
    return <img {...rest} alt={props.alt || 'mocked image'} />;
  };
  MockedImage.displayName = 'NextImageMock';
  return MockedImage;
});

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ProfileImages Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = 'test-cloud';
  });

  test('renders 6 image slots', () => {
    render(<ProfileImages />);
    const slots = screen.getAllByTestId(/image-slot-/);
    expect(slots).toHaveLength(6);
  });

  test('handles missing secure_url in upload response', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: { publicId: '123' },
    });

    render(<ProfileImages />);
    const fileInput = screen.getByTestId('upload-input') as HTMLInputElement;
    const file = new File(['dummy'], 'photo.jpg', { type: 'image/jpeg' });

    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });

    expect(screen.queryByTestId('uploaded-image-0')).not.toBeInTheDocument();
  });

  test('uploads image and updates slot', async () => {
    const mockUrl = 'https://cloudinary.com/test-image.jpg';
    mockedAxios.post.mockResolvedValueOnce({
      // eslint-disable-next-line camelcase
      data: { secure_url: mockUrl },
    });

    render(<ProfileImages />);
    const fileInput = screen.getByTestId('upload-input') as HTMLInputElement;
    const file = new File(['dummy'], 'photo.jpg', { type: 'image/jpeg' });

    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });

    const uploadedImage = await screen.findByTestId('uploaded-image-0');
    expect(uploadedImage).toBeInTheDocument();
  });

  test('handles error during image upload', async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error('Upload failed'));

    render(<ProfileImages />);
    const fileInput = screen.getByTestId('upload-input') as HTMLInputElement;
    const file = new File(['dummy'], 'photo.jpg', { type: 'image/jpeg' });

    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });

    expect(screen.queryByTestId('uploaded-image-0')).not.toBeInTheDocument();
  });

  test('removes an uploaded image', async () => {
    const mockUrl = 'https://cloudinary.com/test-image.jpg';
    mockedAxios.post.mockResolvedValueOnce({
      // eslint-disable-next-line camelcase
      data: { secure_url: mockUrl },
    });
    render(<ProfileImages />);
    const fileInput = screen.getByTestId('upload-input') as HTMLInputElement;
    const file = new File(['dummy'], 'photo.jpg', { type: 'image/jpeg' });
    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });
    const uploadedImage = await screen.findByTestId('uploaded-image-0');
    expect(uploadedImage).toBeInTheDocument();
    const removeButton = screen.getByTestId('remove-button-0');
    fireEvent.click(removeButton);

    await waitFor(() => {
      expect(screen.queryByTestId('uploaded-image-0')).not.toBeInTheDocument();
    });
  });
  test('does not upload if no file is selected', async () => {
    render(<ProfileImages />);
    const fileInput = screen.getByTestId('upload-input') as HTMLInputElement;

    await act(async () => {
      fireEvent.change(fileInput, { target: { files: undefined } });
    });

    expect(mockedAxios.post).not.toHaveBeenCalled();
  });
  test('does not upload if cloudName is falsy', async () => {
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = '';

    render(<ProfileImages />);
    const fileInput = screen.getByTestId('upload-input') as HTMLInputElement;
    const file = new File(['dummy'], 'photo.jpg', { type: 'image/jpeg' });

    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });

    expect(mockedAxios.post).not.toHaveBeenCalled();
  });
  test('does not upload if no empty image slot found', async () => {
    const mockUrl = 'https://cloudinary.com/test-image.jpg';
    mockedAxios.post.mockResolvedValue({
      // eslint-disable-next-line camelcase
      data: { secure_url: mockUrl },
    });
    render(<ProfileImages />);
    const fileInput = screen.getByTestId('upload-input') as HTMLInputElement;
    const file = new File(['dummy'], 'photo.jpg', { type: 'image/jpeg' });
    for (let i = 0; i < 6; i++) {
      await act(async () => {
        fireEvent.change(fileInput, { target: { files: [file] } });
      });
      await screen.findByTestId(`uploaded-image-${i}`);
    }
    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });
    expect(mockedAxios.post).toHaveBeenCalledTimes(6);
  });

  test('should call onSuccess when an image is successfully uploaded', async () => {
    const mockUrl = 'https://cloudinary.com/test-image.jpg';
    mockedAxios.post.mockResolvedValueOnce({
      // eslint-disable-next-line camelcase
      data: { secure_url: mockUrl },
    });

    render(<ProfileImages onSuccess={mockOnSuccess} />);
    const fileInput = screen.getByTestId('upload-input') as HTMLInputElement;
    const file = new File(['dummy'], 'photo.jpg', { type: 'image/jpeg' });

    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });
  });

  it('onSuccess is clicked', () => {
    render(<ProfileImages onSuccess={mockOnSuccess} />);
    const fileInput = screen.getByTestId('upload-input') as HTMLInputElement;
    const file = new File(['dummy'], 'photo.jpg', { type: 'image/jpeg' });

    act(() => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });
    fireEvent.click(screen.getByRole('button', { name: /Upload/i }));
    fireEvent.click(screen.getByRole('button', { name: /Next/i }));

    expect(mockOnSuccess).toHaveBeenCalled();
  });
});
