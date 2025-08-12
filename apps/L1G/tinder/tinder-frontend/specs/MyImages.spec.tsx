import { MyImages } from '@/components/MyImages';
import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
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

describe('MyImages', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = 'test-cloud';
  });

  it('renders 6 image slots', () => {
    render(
      <MockedProvider mocks={apolloMocks} addTypename={false}>
        <MyImages />
      </MockedProvider>
    );

    const imageSlots = screen.getAllByTestId(/image-slot-/);
    expect(imageSlots).toHaveLength(6);
  });

  it('should render correctly', () => {
    render(<MyImages />);
    expect(screen.getByText('Your Images')).toBeInTheDocument();
    expect(screen.getByText('Please choose an image that represents you.')).toBeInTheDocument();
  });

  it('uploads image and updates slot', async () => {
    const mockUrl = 'https://cloudinary.com/test-image.jpg';
    mockedAxios.post.mockResolvedValueOnce({
      data: { secure_url: mockUrl },
    });

    render(
      <MockedProvider mocks={apolloMocks} addTypename={false}>
        <MyImages />
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
});
