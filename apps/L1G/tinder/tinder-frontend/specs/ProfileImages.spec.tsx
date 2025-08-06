import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { ProfileImages } from '@/components/ProfileImages';
import '@testing-library/jest-dom';
import axios from 'axios';

jest.mock('next/image', () => (props: any) => {
  const { fill, ...imgProps } = props;
  return <img {...imgProps} alt={props.alt || 'mocked image'} />;
});

jest.mock('axios');

describe('ProfileImages Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders 6 image slots', () => {
    render(<ProfileImages />);
    const slots = screen.getAllByTestId(/image-slot-/);
    expect(slots.length).toBe(6);
  });

  test('handles missing secure_url in upload response', async () => {
    jest.spyOn(axios, 'post').mockResolvedValueOnce({
      data: { public_id: '123' },
    });

    render(<ProfileImages />);
    const fileInput = screen.getByRole('button', { name: /upload image/i }).querySelector('input[type="file"]')!;
    const file = new File(['dummy'], 'photo.jpg', { type: 'image/jpeg' });

    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });

    expect(screen.queryByAltText(/uploaded image/i)).not.toBeInTheDocument();
  });

  test('uploads image and updates slot', async () => {
    const mockUrl = 'https://cloudinary.com/test-image.jpg';

    (axios.post as jest.Mock).mockResolvedValueOnce({
      data: { secure_url: mockUrl },
    });

    render(<ProfileImages />);
    const fileInput = screen.getByTestId('upload-input') as HTMLInputElement;
    const file = new File(['dummy'], 'photo.jpg', { type: 'image/jpeg' });

    fireEvent.change(fileInput, { target: { files: [file] } });

    const uploadedImage = await screen.findByTestId('uploaded-image-0');
    expect(uploadedImage).toBeInTheDocument();
  });

  test('handles error during image upload', async () => {
    jest.spyOn(axios, 'post').mockRejectedValueOnce(new Error('Upload failed'));

    render(<ProfileImages />);
    const fileInput = screen.getByRole('button', { name: /upload image/i }).querySelector('input[type="file"]')!;
    const file = new File(['dummy'], 'photo.jpg', { type: 'image/jpeg' });

    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });

    expect(screen.queryByAltText(/uploaded image/i)).not.toBeInTheDocument();
  });

  test('removes an uploaded image', async () => {
    const mockUrl = 'https://cloudinary.com/test-image.jpg';

    (axios.post as jest.Mock).mockResolvedValueOnce({
      data: { secure_url: mockUrl },
    });

    render(<ProfileImages />);
    const fileInput = screen.getByTestId('upload-input') as HTMLInputElement;
    const file = new File(['dummy'], 'photo.jpg', { type: 'image/jpeg' });

    fireEvent.change(fileInput, { target: { files: [file] } });

    const uploadedImage = await screen.findByTestId('uploaded-image-0');
    expect(uploadedImage).toBeInTheDocument();

    const removeButton = screen.getByTestId('remove-button-0');
    fireEvent.click(removeButton);

    await waitFor(() => {
      expect(screen.queryByTestId('uploaded-image-0')).not.toBeInTheDocument();
    });
  });

  test('clears file input after upload', async () => {
    const mockUrl = 'https://cloudinary.com/test-image.jpg';
    (axios.post as jest.Mock).mockResolvedValueOnce({
      data: { secure_url: mockUrl },
    });

    render(<ProfileImages />);
    const fileInput = screen.getByRole('button', { name: /upload image/i }).querySelector('input[type="file"]') as HTMLInputElement;
    const file = new File(['dummy'], 'photo.jpg', { type: 'image/jpeg' });

    // Set fake value to ensure it gets cleared
    Object.defineProperty(fileInput, 'value', {
      writable: true,
      value: 'C:\\fakepath\\photo.jpg',
    });

    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });

    expect(fileInput.value).toBe('');
  });

  test('does not upload if no file is selected', async () => {
    render(<ProfileImages />);
    const fileInput = screen.getByTestId('upload-input') as HTMLInputElement;

    await act(async () => {
      fireEvent.change(fileInput, { target: { files: undefined } });
    });

    expect(axios.post).not.toHaveBeenCalled();
  });

  test('does not upload if cloudName is false', async () => {
    jest.resetModules();
    jest.doMock('@/config/cloudinary', () => ({ cloudName: '' }));

    const { ProfileImages } = await import('@/components/ProfileImages');
    render(<ProfileImages />);
    const fileInput = screen.getByTestId('upload-input') as HTMLInputElement;
    const file = new File(['dummy'], 'photo.jpg', { type: 'image/jpeg' });

    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });

    expect(axios.post).not.toHaveBeenCalled();
  });

  test('does not upload if no empty image slot found', async () => {
    const mockUrl = 'https://cloudinary.com/test-image.jpg';

    (axios.post as jest.Mock).mockResolvedValue({
      data: { secure_url: mockUrl },
    });

    render(<ProfileImages />);
    const fileInput = screen.getByTestId('upload-input') as HTMLInputElement;
    const file = new File(['dummy'], 'photo.jpg', { type: 'image/jpeg' });

    // Fill all 6 slots
    for (let i = 0; i < 6; i++) {
      fireEvent.change(fileInput, { target: { files: [file] } });
      await screen.findByTestId(`uploaded-image-${i}`);
    }

    // Try uploading a 7th image
    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(axios.post).toHaveBeenCalledTimes(6);
  });
});
