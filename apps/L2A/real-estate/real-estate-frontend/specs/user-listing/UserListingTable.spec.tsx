import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserListingTable, { Listing } from '@/app/user-listing/_components/UserListingTable';
import { MockedProvider } from '@apollo/client/testing';
import { gql } from '@apollo/client';

const DELETE_POST_BY_ID = gql`
  mutation DeletePostById($id: ID!) {
    deletePostById(id: $id) {
      _id
    }
  }
`;

const statuses: Listing['status'][] = [
  'Хүлээгдэж буй',
  'Зарагдаж байгаа',
  'Зарагдсан',
  'Буцаагдсан',
  'Хадгалсан',
];

const mockListings: Listing[] = new Array(10).fill(null).map((_, i) => ({
  id: `000${i + 1}`,
  name: 'Seoul royal county хотхон',
  owner: 'Н.Мөнхтунгалаг',
  image: '/listingcard.png',
  status: statuses[i % statuses.length],
  price: '880,000,000₮',
}));

const mocks = [
  {
    request: {
      query: DELETE_POST_BY_ID,
      variables: { id: '0001' },
    },
    result: {
      data: {
        deletePostById: {
          _id: '0001',
        },
      },
    },
  },
];

beforeEach(() => {
  const portalRoot = document.createElement('div');
  portalRoot.setAttribute('id', 'radix-portal');
  document.body.appendChild(portalRoot);
});

afterEach(() => {
  const portalRoot = document.getElementById('radix-portal');
  if (portalRoot) {
    document.body.removeChild(portalRoot);
  }
});

describe('UserListingTable', () => {
  it('renders correct number of rows for "Зарууд" tab (all)', () => {
    render(
      <MockedProvider>
        <UserListingTable listings={mockListings} />
      </MockedProvider>
    );
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(mockListings.length + 1); 
  });

  it('renders correct columns', () => {
    render(
      <MockedProvider>
        <UserListingTable listings={mockListings.slice(0, 1)} />
      </MockedProvider>
    );
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Нэр')).toBeInTheDocument();
    expect(screen.getByText('Төлөв')).toBeInTheDocument();
    expect(screen.getByText('Үнэ')).toBeInTheDocument();
    expect(screen.getByText('Үйлдэл')).toBeInTheDocument();
  });

  it('displays correct status label styling', () => {
    render(
      <MockedProvider>
        <UserListingTable listings={[mockListings[0]]} />
      </MockedProvider>
    );
    expect(screen.getByText(mockListings[0].status)).toBeInTheDocument();
  });

  it('opens dialog, deletes a post, and updates the listing data', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <UserListingTable listings={[mockListings[0]]} />
      </MockedProvider>
    );

    const trashIcon = await screen.findByTestId('trash-icon-0001');
    fireEvent.click(trashIcon);

    const dialog = await screen.findByRole('dialog');
    expect(dialog).toBeInTheDocument();

    const confirmDeleteButton = screen.getByText('Устгах');
    fireEvent.click(confirmDeleteButton);

    await waitFor(() => {
      const rows = screen.queryAllByRole('row');
      const hasDeletedRow = rows.some((row) =>
        within(row).queryByText('0001')
      );
      expect(hasDeletedRow).toBe(false);
    });
  });

  it('closes dialog when cancel is clicked', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <UserListingTable listings={[mockListings[0]]} />
      </MockedProvider>
    );

    const trashIcon = await screen.findByTestId('trash-icon-0001');
    fireEvent.click(trashIcon);

    const dialog = await screen.findByRole('dialog');
    expect(dialog).toBeInTheDocument();

    const cancelButton = screen.getByText('Болих');
    fireEvent.click(cancelButton);

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });
});
