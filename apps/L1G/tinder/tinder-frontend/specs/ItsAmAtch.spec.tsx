import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import Match from '@/components/ItsAmAtch';
import { GetUserDocument, GetUserQuery, GetUserQueryVariables } from '@/generated';

interface User {
  id: string;
  name: string;
  images: string[];
}

const mockUser1: User = {
  id: 'user1',
  name: 'User One',
  images: ['/path/to/image1.jpg'],
};

const mockUser2: User = {
  id: 'user2',
  name: 'User Two',
  images: ['/path/to/image2.jpg'],
};

const mocks: ReadonlyArray<MockedResponse<GetUserQuery>> = [
  {
    request: {
      query: GetUserDocument,
      variables: { id: 'user1' } as GetUserQueryVariables,
    },
    result: {
      data: {
        getUser: mockUser1,
      },
    },
  },
  {
    request: {
      query: GetUserDocument,
      variables: { id: 'user2' } as GetUserQueryVariables,
    },
    result: {
      data: {
        getUser: mockUser2,
      },
    },
  },
];

const errorMocks: ReadonlyArray<MockedResponse<GetUserQuery>> = [
  {
    request: {
      query: GetUserDocument,
      variables: { id: 'user1' } as GetUserQueryVariables,
    },
    error: new Error('An error occurred'),
  },
  {
    request: {
      query: GetUserDocument,
      variables: { id: 'user2' } as GetUserQueryVariables,
    },
    result: {
      data: {
        getUser: mockUser2,
      },
    },
  },
];

describe('Match Component', () => {
  const onCloseMock = jest.fn<() => void, []>();

  beforeEach(() => {
    onCloseMock.mockClear();
  });

  it('renders loading state initially', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Match matchedusersid={['user1', 'user2']} onClose={onCloseMock} />
      </MockedProvider>
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
    });
  });

  it('renders error state when there is an error', async () => {
    render(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <Match matchedusersid={['user1', 'user2']} onClose={onCloseMock} />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Error loading match/i)).toBeInTheDocument();
    });
  });

  it('renders match content when data is loaded', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Match matchedusersid={['user1', 'user2']} onClose={onCloseMock} />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Its a Match/i)).toBeInTheDocument();
      expect(screen.getByText(`You matched with ${mockUser2.name}`)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Say something nice/i)).toBeInTheDocument();
      expect(screen.getByTestId('Send')).toBeInTheDocument();
    });

    const images = screen.getAllByAltText(/profile/i);
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute('src', mockUser1.images[0]);
    expect(images[0]).toHaveAttribute('alt', 'Your profile');
    expect(images[1]).toHaveAttribute('src', mockUser2.images[0]);
    expect(images[1]).toHaveAttribute('alt', `Baatarvan's profile`);
  });

  it('calls onClose when close button is clicked', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Match matchedusersid={['user1', 'user2']} onClose={onCloseMock} />
      </MockedProvider>
    );

    await waitFor(() => {
      const closeButton = screen.getByRole('button', { name: /close/i });
      fireEvent.click(closeButton);
      expect(onCloseMock).toHaveBeenCalledTimes(1);
    });
  });

  it('does not render queries if matchedusersid is empty', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Match matchedusersid={[]} onClose={onCloseMock} />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.queryByText(/It's a Match/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Error loading match/i)).not.toBeInTheDocument();
    });
  });
});
