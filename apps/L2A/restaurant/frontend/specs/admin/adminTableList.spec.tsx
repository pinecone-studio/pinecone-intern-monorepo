
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AdminTableList from '@/app/admin/table/_features/AdminTableList';
import '@testing-library/jest-dom';
import { MockedProvider } from '@apollo/client/testing';
import { gql } from '@apollo/client';

jest.mock('react-qrcode-logo', () => ({
  QRCode: () => <div>Mock QR Code</div>, 
}));

const GET_ALL_TABLES = gql`
  query GetAllTables {
    getAllTables {
      _id
      name
      qrCodeUrl
    }
  }
`;

const mocks = [
  {
    request: {
      query: GET_ALL_TABLES,
    },
    result: {
      data: {
        getAllTables: [
          { _id: '1', name: '1A', qrCodeUrl: '' },
          { _id: '2', name: '1B', qrCodeUrl: '' },
        ],
      },
    },
  },
];

describe('AdminTableList', () => {
  it('renders all tables', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AdminTableList />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('classroom-row-1')).toBeInTheDocument();
      expect(screen.getByTestId('classroom-row-2')).toBeInTheDocument();
    });
  });

  it('renders table names', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AdminTableList />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('classroom-name-1')).toHaveTextContent('1A');
      expect(screen.getByTestId('classroom-name-2')).toHaveTextContent('1B');
    });
  });

  it('clicks QR, edit, and delete buttons', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AdminTableList />
      </MockedProvider>
    );

    await waitFor(() => {
      const qrBtn = screen.getByTestId('classroom-1-qr-button');
      const editBtn = screen.getByTestId('classroom-1-edit-button');
      const deleteBtn = screen.getByTestId('classroom-1-delete-button');

      fireEvent.click(qrBtn);
      fireEvent.click(editBtn);
      fireEvent.click(deleteBtn);

      expect(qrBtn).toBeInTheDocument();
      expect(editBtn).toBeInTheDocument();
      expect(deleteBtn).toBeInTheDocument();
    });
  });

  it('opens update dialog and updates input value', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AdminTableList />
      </MockedProvider>
    );

    await waitFor(() => {
      const editBtn = screen.getByTestId('classroom-1-edit-button');
      fireEvent.click(editBtn);

      const dialog = screen.getByTestId('classroom-1-dialog');
      expect(dialog).toBeInTheDocument();

      const input = screen.getByTestId('classroom-1-input');
      fireEvent.change(input, { target: { value: 'Updated Name' } });
      expect(input).toHaveValue('Updated Name');

      const updateBtn = screen.getByTestId('classroom-1-update-button');
      fireEvent.click(updateBtn);

      expect(updateBtn).toBeInTheDocument();
    });
  });
});
