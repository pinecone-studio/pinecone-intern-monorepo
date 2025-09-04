/* eslint-disable max-lines */
import { MyImages } from '@/components/MyImages';
import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import axios from 'axios';
import { UploadImagesDocument } from '@/generated';
import { MockedProvider } from '@apollo/client/testing';

jest.mock('next/image', () => {
  const MockedImage = (props: any) => <img {...props} alt={props.alt || 'mocked image'} />;
  MockedImage.displayName = 'NextImageMock';
  return MockedImage;
});
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const apolloMocks = [{ request: { query: UploadImagesDocument, variables: { images: expect.any(Array) } }, result: { data: { uploadImages: { id: 'user123', images: [], __typename: 'User' } } } }];

// Mock user data
const mockUser = {
  images: [],
};

describe('MyImages', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = 'test-cloud';
  });

  it('renders 6 image slots', () => {
    render(
      <MockedProvider mocks={apolloMocks}>
        <MyImages user={mockUser} onImagesChange={jest.fn()} />
      </MockedProvider>
    );
    const slots = screen.getAllByTestId(/image-slot-/);
    expect(slots).toHaveLength(6);
  });

  it('renders default text', () => {
    render(<MyImages user={mockUser} onImagesChange={jest.fn()} />);
    expect(screen.getByText('Your Images')).toBeInTheDocument();
    expect(screen.getByText('Please choose an image that represents you.')).toBeInTheDocument();
  });

  it('uploads an image and shows uploaded image', async () => {
    const mockUrl = 'https://cloudinary.com/test-image.jpg';
    mockedAxios.post.mockResolvedValueOnce({
      data: { secure_url: mockUrl }, // eslint-disable-line camelcase
    });

    const onImagesChange = jest.fn();

    render(
      <MockedProvider mocks={apolloMocks}>
        <MyImages user={mockUser} onImagesChange={onImagesChange} />
      </MockedProvider>
    );

    const fileInput = screen.getByTestId('upload-input');
    const file = new File(['dummy'], 'photo.jpg', { type: 'image/jpeg' });
    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });

    const image = await screen.findByTestId('uploaded-image-0');
    expect(image).toBeInTheDocument();
    expect(onImagesChange).toHaveBeenCalledWith([mockUrl]);
  });

  it('removes an uploaded image', async () => {
    const mockUrl = 'https://cloudinary.com/test-image.jpg';
    mockedAxios.post.mockResolvedValueOnce({
      data: { secure_url: mockUrl }, // eslint-disable-line camelcase
    });

    const onImagesChange = jest.fn();

    render(
      <MockedProvider mocks={apolloMocks}>
        <MyImages user={mockUser} onImagesChange={onImagesChange} />
      </MockedProvider>
    );

    const fileInput = screen.getByTestId('upload-input');
    const file = new File(['dummy'], 'photo.jpg', { type: 'image/jpeg' });
    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });

    const image = await screen.findByTestId('uploaded-image-0');
    expect(image).toBeInTheDocument();

    const removeButton = screen.getByTestId('remove-button-0');
    fireEvent.click(removeButton);

    await waitFor(() => {
      expect(screen.queryByTestId('uploaded-image-0')).not.toBeInTheDocument();
    });

    expect(onImagesChange).toHaveBeenCalledWith([]);
  });

  it('handles missing cloud name', async () => {
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = '';

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {
      //intentionally empty
    });
    render(<MyImages user={mockUser} onImagesChange={jest.fn()} />);

    const fileInput = screen.getByTestId('upload-input');
    const file = new File(['dummy'], 'photo.jpg', { type: 'image/jpeg' });
    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });

    expect(consoleSpy).toHaveBeenCalledWith('Cloudinary cloud name is missing!');
    consoleSpy.mockRestore();
  });

  it('handles upload failure', async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error('Upload failed'));
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {
      //intentionally empty
    });

    render(
      <MockedProvider mocks={apolloMocks}>
        <MyImages user={mockUser} onImagesChange={jest.fn()} />
      </MockedProvider>
    );

    const fileInput = screen.getByTestId('upload-input');
    const file = new File(['dummy'], 'photo.jpg', { type: 'image/jpeg' });
    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Upload error:', expect.any(Error));
    });
    consoleSpy.mockRestore();
  });

  it('does nothing if no file is selected', async () => {
    render(<MyImages user={mockUser} onImagesChange={jest.fn()} />);
    const fileInput = screen.getByTestId('upload-input');
    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [] } });
    });
    expect(mockedAxios.post).not.toHaveBeenCalled();
  });

  it('does nothing if all slots are full', async () => {
    const mockUrl = 'https://cloudinary.com/test-image.jpg';
    mockedAxios.post.mockResolvedValue({ data: { secure_url: mockUrl } }); // eslint-disable-line camelcase
    const onImagesChange = jest.fn();

    render(<MyImages user={mockUser} onImagesChange={onImagesChange} />);

    const fileInput = screen.getByTestId('upload-input');
    const file = new File(['dummy'], 'photo.jpg', { type: 'image/jpeg' });

    for (let i = 0; i < 6; i++) {
      await act(async () => {
        fireEvent.change(fileInput, { target: { files: [file] } });
      });
    }

    const initialImages = await screen.findAllByTestId(/uploaded-image-/);
    expect(initialImages).toHaveLength(6);
    expect(onImagesChange).toHaveBeenLastCalledWith(Array(6).fill(mockUrl));

    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });

    const images = await screen.findAllByTestId(/uploaded-image-/);
    expect(images).toHaveLength(6);
    // Should not call onImagesChange again since no new image was added
    expect(onImagesChange).toHaveBeenCalledTimes(6);
  });

  it('handles missing secure_url in Cloudinary response', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        //intentionally empty
      },
    });

    render(
      <MockedProvider mocks={apolloMocks}>
        <MyImages user={mockUser} onImagesChange={jest.fn()} />
      </MockedProvider>
    );

    const fileInput = screen.getByTestId('upload-input');
    const file = new File(['dummy'], 'photo.jpg', { type: 'image/jpeg' });
    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });

    await waitFor(() => {
      expect(screen.queryByTestId('uploaded-image-0')).not.toBeInTheDocument();
    });
  });
  it('fills empty slots when user has existing images', () => {
    const partialImages = ['https://cloudinary.com/image1.jpg', 'https://cloudinary.com/image2.jpg'];

    render(
      <MockedProvider mocks={apolloMocks}>
        <MyImages user={{ images: partialImages }} onImagesChange={jest.fn()} />
      </MockedProvider>
    );
    expect(screen.getByTestId('uploaded-image-0')).toBeInTheDocument();
    expect(screen.getByTestId('uploaded-image-1')).toBeInTheDocument();
    const slots = screen.getAllByTestId(/image-slot-/);
    expect(slots).toHaveLength(6);
  });
  it('runs useEffect and sets uploaded images when user.images is updated', async () => {
    const initialUser = { images: [] };
    const updatedUser = { images: ['https://example.com/image1.jpg'] };
    const onImagesChange = jest.fn();

    const { rerender } = render(
      <MockedProvider mocks={apolloMocks}>
        <MyImages user={initialUser} onImagesChange={onImagesChange} />
      </MockedProvider>
    );
    expect(screen.queryByTestId('uploaded-image-0')).not.toBeInTheDocument();
    rerender(
      <MockedProvider mocks={apolloMocks}>
        <MyImages user={updatedUser} onImagesChange={onImagesChange} />
      </MockedProvider>
    );
    const uploaded = await screen.findByTestId('uploaded-image-0');
    expect(uploaded).toBeInTheDocument();
  });
  it('does not update state if user.images is undefined', () => {
    const userWithNoImages = {};
    render(
      <MockedProvider mocks={apolloMocks}>
        <MyImages user={userWithNoImages as any} onImagesChange={jest.fn()} />
      </MockedProvider>
    );
    const slots = screen.getAllByTestId(/image-slot-/);
    expect(slots).toHaveLength(6);
    expect(screen.queryByTestId('uploaded-image-0')).not.toBeInTheDocument();
  });
});
