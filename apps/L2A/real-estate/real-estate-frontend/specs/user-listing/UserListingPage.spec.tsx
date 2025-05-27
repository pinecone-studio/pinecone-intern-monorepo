import '@testing-library/jest-dom';
import { render, screen, fireEvent, within, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import UserListingPage from '@/app/user-listing/page';
import { gql } from '@apollo/client';

const mockUserId = '1234567890abcdef12345678';

const ME_QUERY = gql`
  query Me {
    me {
      id
      email
      isAdmin
    }
  }
`;

const GET_POSTS_BY_USER_ID = gql`
  query GetPostsByUserId($propertyOwnerId: ID!) {
    getPostsByUserId(propertyOwnerId: $propertyOwnerId) {
      _id
      title
      images
      status
      price
      propertyOwnerId
    }
  }
`;

const mocks = [
  {
    request: {
      query: ME_QUERY,
    },
    result: {
      data: {
        me: {
          id: mockUserId,
          email: 'test@example.com',
          isAdmin: false,
          __typename: 'User',
        },
      },
    },
  },
  {
    request: {
      query: GET_POSTS_BY_USER_ID,
      variables: { propertyOwnerId: mockUserId },
    },
    result: {
      data: {
        getPostsByUserId: [
          {
            _id: '1',
            title: 'Test Apartment 1',
            status: 'PENDING',
            price: 123456789,
            images: ['https://via.placeholder.com/150'],
            propertyOwnerId: mockUserId,
            __typename: 'Post',
          },
          {
            _id: '2',
            title: 'Saved Listing',
            status: 'SAVED',
            price: 99999999,
            images: ['https://via.placeholder.com/150'],
            propertyOwnerId: mockUserId,
            __typename: 'Post',
          },
        ],
      },
    },
  },
];

describe('UserListingPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders title', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <UserListingPage />
      </MockedProvider>
    );

    expect(await screen.findByText('Миний зарууд')).toBeInTheDocument();
  });

  it('shows all listings by default', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <UserListingPage />
      </MockedProvider>
    );

    await waitFor(() => {
      const rowgroups = screen.getAllByRole('rowgroup');
      const tbody = rowgroups[1];
      expect(within(tbody).getAllByRole('row')).toHaveLength(2);
    });
  });

  it('filters listings by status when tab is clicked', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <UserListingPage />
      </MockedProvider>
    );

    await waitFor(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Хадгалсан' }));
      const rowgroups = await screen.findAllByRole('rowgroup');
      const tbody = rowgroups[1];
      expect(within(tbody).getAllByRole('row')).toHaveLength(1);
    });
  });

  it('filters listings by all statuses to cover branches', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <UserListingPage />
      </MockedProvider>
    );

    const statuses = ['Хүлээгдэж буй', 'Зарагдаж байгаа', 'Зарагдсан', 'Буцаагдсан', 'Хадгалсан'];

    for (const status of statuses) {
      const tab = await screen.findByRole('button', { name: status });
      fireEvent.click(tab);
    }

    const rowgroups = await screen.findAllByRole('rowgroup');
    const tbody = rowgroups[1];
    expect(within(tbody).getAllByRole('row').length).toBeGreaterThan(0);
  });

  it('shows all listings again after returning to "Зарууд" tab', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <UserListingPage />
      </MockedProvider>
    );

    const savedTab = await screen.findByRole('button', { name: 'Хадгалсан' });
    fireEvent.click(savedTab);

    const allTab = await screen.findByRole('button', { name: 'Зарууд' });
    fireEvent.click(allTab);

    const rowgroups = await screen.findAllByRole('rowgroup');
    const tbody = rowgroups[1];
    expect(within(tbody).getAllByRole('row')).toHaveLength(2);
  });
});
