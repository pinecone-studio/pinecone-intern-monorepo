import React from 'react';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import TicketDashboard from '@/app/admin/concerts/_components/TicketDashboard';
import '@testing-library/jest-dom';
import { MockedProvider } from '@apollo/client/testing';
import { ConcertsDocument, DeleteEventDocument } from '@/generated';
import { GraphQLError } from 'graphql';
import { mockConcerts } from 'specs/utils/mock-concert-info';

const mocks = [
  {
    request: {
      query: ConcertsDocument,
    },
    result: {
      data: { concerts: mockConcerts },
    },
  },
  {
    request: {
      query: DeleteEventDocument,
      variables: {
        deleteEventId: 'mock-2',
      },
    },
    result: {
      data: {
        deleteEvent: {
          id: 'mock-2',
          __typename: 'Event',
        },
      },
    },
  },
];

const mockError = [
  {
    request: { query: ConcertsDocument },
    error: new GraphQLError('failed'),
  },
];
describe('TicketDashboard Component', () => {
  beforeEach(() => {
    jest.spyOn(window, 'prompt').mockImplementation(() => 'Шинэ нэр');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render all initial rows', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={true}>
        <TicketDashboard />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('row-0')).toBeInTheDocument();
      expect(screen.getByTestId('row-1')).toBeInTheDocument();
    });
    const pagination = screen.getByTestId('page-btn-1');
    fireEvent.click(pagination);
  });

  it('should click on delete button', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={true}>
        <TicketDashboard />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('delete-btn-1')).toBeInTheDocument();
    });
    const deletebutton = screen.getByTestId('delete-btn-1');
    fireEvent.click(deletebutton);
  });

  it('should throw an eror', async () => {
    render(
      <MockedProvider mocks={mockError} addTypename={false}>
        <TicketDashboard />
      </MockedProvider>
    );
    await waitFor(() => {
      expect(screen.getByText(/failed/i)).toBeInTheDocument();
    });
  });
});
