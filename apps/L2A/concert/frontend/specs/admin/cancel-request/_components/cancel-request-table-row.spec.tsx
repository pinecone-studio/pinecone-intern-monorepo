import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TableRow from '@/app/admin/cancel-request/_components/TableRow';
import CancelButton from '@/app/admin/cancel-request/_components/CancelButton';
import { MockedProvider } from '@apollo/client/testing';
import { ChangeStatusDocument } from '@/generated';
import { GraphQLError } from 'graphql';

const mocks = [
  {
    request: {
      query: ChangeStatusDocument,
      variables: {
        requestId: 'mock-2',
      },
    },
    result: {
      data: {
        changeStatus: {
          id: 'mock-2',
        },
      },
    },
  },
];
const mockError = [
  {
    request: { query: ChangeStatusDocument },
    error: new GraphQLError('failed'),
  },
];

describe('TableRow', () => {
  const mockRequest = {
    id: '1',
    concert: { title: 'Хайртай аав' },
    accountNumber: '123456789',
    bankOwnerName: 'Алтангэрэл',
    ticket: { totalPrice: 182000 },
    createdAt: String(Date.now()),
  };

  it('renders pending request with "Дуусгах" button', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={true}>
        <TableRow request={{ ...mockRequest, status: 'PENDING' }} />
      </MockedProvider>
    );
    const button = screen.getByRole('button', { name: 'Дуусгах' });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
  });

  it('renders pending request with "shiljuulsen" button', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <TableRow request={{ ...mockRequest, status: 'APPROVED' }} />
      </MockedProvider>
    );

    const string = screen.getByText('Шилжүүлсэн');
    expect(string).toBeInTheDocument();
  });

  it('renders pending request with "shiljuulsen" button', async () => {
    render(
      <MockedProvider mocks={mockError} addTypename={false}>
        <CancelButton request={{ ...mockRequest, status: 'PENDING' }} />
      </MockedProvider>
    );
    const button = screen.getByRole('button', { name: 'Дуусгах' });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    await waitFor(() => {
      expect(screen.getByText(/failed/i)).toBeInTheDocument();
    });
  });
});
