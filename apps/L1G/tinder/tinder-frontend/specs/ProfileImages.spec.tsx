/* eslint-disable no-console, max-lines */
/* eslint-disable camelcase */

import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { ProfileImages } from '@/components/ProfileImages';
import '@testing-library/jest-dom';
import axios from 'axios';
import { UploadImagesDocument } from '@/generated';
import { MockedProvider } from '@apollo/client/testing';

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

const apolloMocks = [
  {
    request: {
      query: UploadImagesDocument,
      variables: { images: expect.any(Array) },
    },
    result: {
      data: {
        uploadImages: {
          id: 'user123',
          images: [],
          __typename: 'User',
        },
      },
    },
  },
];

describe('ProfileImages Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = 'test-cloud';
  });

  it('renders 6 image slots', () => {
    render(
      <MockedProvider mocks={apolloMocks} addTypename={false}>
        <ProfileImages onSuccess={jest.fn()} />
      </MockedProvider>
    );

    const imageSlots = screen.getAllByTestId(/image-slot-/);
    expect(imageSlots).toHaveLength(6);
  });

  it('handles missing secure_url in upload response', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: { publicId: '123' },
    });

    render(
      <MockedProvider mocks={apolloMocks} addTypename={false}>
        <ProfileImages onSuccess={mockOnSuccess} />
      </MockedProvider>
    );

    const fileInput = screen.getByTestId('upload-input');
    const file = new File(['dummy'], 'photo.jpg', { type: 'image/jpeg' });

    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });

    expect(screen.queryByTestId('uploaded-image-0')).not.toBeInTheDocument();
  });

  it('uploads image and updates slot', async () => {
    const mockUrl = 'https://cloudinary.com/test-image.jpg';
    mockedAxios.post.mockResolvedValueOnce({
      data: { secure_url: mockUrl },
    });

    render(
      <MockedProvider mocks={apolloMocks} addTypename={false}>
        <ProfileImages onSuccess={mockOnSuccess} />
      </MockedProvider>
    );

    const fileInput = screen.getByTestId('upload-input');
    const file = new File(['dummy'], 'photo.jpg', { type: 'image/jpeg' });

    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });

    const uploadedImage = await screen.findByTestId('uploaded-image-0');
    expect(uploadedImage).toBeInTheDocument();
  });

  it('handles error during image upload', async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error('Upload failed'));

    render(
      <MockedProvider mocks={apolloMocks} addTypename={false}>
        <ProfileImages onSuccess={mockOnSuccess} />
      </MockedProvider>
    );

    const fileInput = screen.getByTestId('upload-input');
    const file = new File(['dummy'], 'photo.jpg', { type: 'image/jpeg' });

    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });

    expect(screen.queryByTestId('uploaded-image-0')).not.toBeInTheDocument();
  });

  it('removes an uploaded image', async () => {
    const mockUrl = 'https://cloudinary.com/test-image.jpg';
    mockedAxios.post.mockResolvedValueOnce({ data: { secure_url: mockUrl } });

    render(
      <MockedProvider mocks={apolloMocks} addTypename={false}>
        <ProfileImages onSuccess={mockOnSuccess} />
      </MockedProvider>
    );

    const fileInput = screen.getByTestId('upload-input');
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

  it('does not upload if no file is selected', async () => {
    render(
      <MockedProvider mocks={apolloMocks} addTypename={false}>
        <ProfileImages onSuccess={mockOnSuccess} />
      </MockedProvider>
    );

    const fileInput = screen.getByTestId('upload-input');

    await act(async () => {
      fireEvent.change(fileInput, { target: { files: undefined } });
    });

    expect(mockedAxios.post).not.toHaveBeenCalled();
  });

  it('does not upload if cloudName is falsy', async () => {
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = '';

    render(
      <MockedProvider mocks={apolloMocks} addTypename={false}>
        <ProfileImages onSuccess={mockOnSuccess} />
      </MockedProvider>
    );

    const fileInput = screen.getByTestId('upload-input');
    const file = new File(['dummy'], 'photo.jpg', { type: 'image/jpeg' });

    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });

    expect(mockedAxios.post).not.toHaveBeenCalled();
  });

  it('does not upload if no empty image slot found', async () => {
    const mockUrl = 'https://cloudinary.com/test-image.jpg';
    mockedAxios.post.mockResolvedValue({ data: { secure_url: mockUrl } });

    render(
      <MockedProvider mocks={apolloMocks} addTypename={false}>
        <ProfileImages onSuccess={mockOnSuccess} />
      </MockedProvider>
    );

    const fileInput = screen.getByTestId('upload-input');
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

  it('should call onSuccess when an image is successfully uploaded and saved', async () => {
    const mockUrl = 'https://cloudinary.com/test-image.jpg';
    mockedAxios.post.mockResolvedValueOnce({
      data: { secure_url: mockUrl },
    });

    const uploadImagesMock = {
      request: {
        query: UploadImagesDocument,
        variables: {
          images: [mockUrl],
        },
      },
      result: {
        data: {
          uploadImages: {
            id: 'user123',
            images: [mockUrl],
            __typename: 'User',
          },
        },
      },
    };

    render(
      <MockedProvider mocks={[uploadImagesMock]} addTypename={false}>
        <ProfileImages onSuccess={mockOnSuccess} />
      </MockedProvider>
    );

    const fileInput = screen.getByTestId('upload-input');
    const file = new File(['dummy'], 'photo.jpg', { type: 'image/jpeg' });

    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });

    await screen.findByTestId('uploaded-image-0');

    const nextButton = screen.getByRole('button', { name: /Next/i });

    await act(async () => {
      fireEvent.click(nextButton);
    });

    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });

  test('onSuccess is clicked manually', async () => {
    const mockUrl = 'https://cloudinary.com/test-image.jpg';
    mockedAxios.post.mockResolvedValueOnce({
      data: { secure_url: mockUrl },
    });

    const apolloMock = {
      request: {
        query: UploadImagesDocument,
        variables: {
          images: [mockUrl],
        },
      },
      result: {
        data: {
          uploadImages: {
            id: 'user123',
            images: [mockUrl],
            __typename: 'User',
          },
        },
      },
    };

    render(
      <MockedProvider mocks={[apolloMock]} addTypename={false}>
        <ProfileImages onSuccess={mockOnSuccess} />
      </MockedProvider>
    );

    const fileInput = screen.getByTestId('upload-input') as HTMLInputElement;
    const file = new File(['dummy'], 'photo.jpg', { type: 'image/jpeg' });

    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });

    await screen.findByTestId('uploaded-image-0');

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Next/i }));
    });

    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });
  test('shows alert and logs error when saving images to backend fails', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {
      // intentionally empty
    });
    jest.spyOn(window, 'alert').mockImplementation(() => {
      // intentionally empty
    });

    const mockUrl = 'https://cloudinary.com/test-image.jpg';
    mockedAxios.post.mockResolvedValueOnce({
      data: { secure_url: mockUrl },
    });

    const apolloErrorMock = {
      request: {
        query: UploadImagesDocument,
        variables: {
          images: [mockUrl],
        },
      },
      error: new Error('Backend save failed'),
    };

    render(
      <MockedProvider mocks={[apolloErrorMock]} addTypename={false}>
        <ProfileImages onSuccess={mockOnSuccess} />
      </MockedProvider>
    );

    const fileInput = screen.getByTestId('upload-input') as HTMLInputElement;
    const file = new File(['dummy'], 'photo.jpg', { type: 'image/jpeg' });

    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });

    await screen.findByTestId('uploaded-image-0');

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Next/i }));
    });

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith('Failed to upload images to backend:', expect.any(Error));
      expect(window.alert).toHaveBeenCalledWith('Something went wrong while saving your images.');
    });

    (console.error as jest.Mock).mockRestore();
    (window.alert as jest.Mock).mockRestore();
  });
  test('alerts if no images are uploaded when clicking Next', async () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {
      // intentionally empty
    });

    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <ProfileImages onSuccess={mockOnSuccess} />
      </MockedProvider>
    );

    const nextButton = screen.getByRole('button', { name: /Next/i });
    fireEvent.click(nextButton);

    expect(window.alert).toHaveBeenCalledWith('Please upload at least one image.');

    (window.alert as jest.Mock).mockRestore();
  });
});
