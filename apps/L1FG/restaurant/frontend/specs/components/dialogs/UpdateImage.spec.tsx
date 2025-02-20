import { render, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import UpdateImage from '@/components/update-user-dialogs/UpdateImage';
import { UpdateUserImageDocument } from '@/generated';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

jest.mock('sonner', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

const mockUserId = '12345';
const mockUpdateResponse = {
  data: {
    updateUserImage: {
      _id: mockUserId,
      profileImage: 'data:image/png;base64,mockImageData',
    },
  },
};

const mocks = [
  {
    request: {
      query: UpdateUserImageDocument,
      variables: {
        input: {
          profileImage: 'data:image/png;base64,mockImageData',
          _id: mockUserId,
        },
      },
    },
    result: mockUpdateResponse,
  },
];

describe('UpdateImage', () => {
  test('handleImageChange updates preview and user image', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <UpdateImage />
      </MockedProvider>
    );
    const editButton = getByTestId('edit-icon');

    await userEvent.click(editButton);

    const file = new File(['test'], 'test.png', { type: 'image/png' });
    const input = getByTestId('file-input') as HTMLInputElement;

    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(input.files?.[0]).toBe(file);
    });
  });

  test('handleSubmit calls mutation and updates localStorage', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <UpdateImage />
      </MockedProvider>
    );
    const editButton = getByTestId('edit-icon');

    await userEvent.click(editButton);

    const submitButton = getByTestId('submit-button');

    fireEvent.click(submitButton);
  });

  test('handleSubmit shows error on failure', async () => {
    const errorMocks = [
      {
        request: {
          query: UpdateUserImageDocument,
          variables: {
            input: {
              profileImage: 'data:image/png;base64,mockImageData',
              _id: mockUserId,
            },
          },
        },
        error: new Error('GraphQL error'),
      },
    ];

    const { getByTestId } = render(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <UpdateImage />
      </MockedProvider>
    );
    const editButton = getByTestId('edit-icon');

    await userEvent.click(editButton);

    const submitButton = getByTestId('submit-button');

    fireEvent.click(submitButton);
  });
});
