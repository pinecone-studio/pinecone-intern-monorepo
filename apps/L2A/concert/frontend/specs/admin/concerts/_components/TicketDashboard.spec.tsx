import React from 'react';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import TicketDashboard from '@/app/admin/concerts/_components/TicketDashboard';
import '@testing-library/jest-dom';
import { MockedProvider } from '@apollo/client/testing';
import { ConcertsDocument, DeleteEventDocument, FeatureAnEventDocument } from '@/generated';
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
  {
    request: {
      query: FeatureAnEventDocument,
      variables: {
        concertId: 'mock-2',
      },
    },
    result: {
      data: {
        featureAnEvent: {
          id: 'mock-2',
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
  
  it('should click on delete button', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={true}>
        <TicketDashboard searchTerm="" />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('delete-btn-1')).toBeInTheDocument();
    });

    const deleteButton = screen.getByTestId('delete-btn-1');
    fireEvent.click(deleteButton);
  });

  it('should click on feature button', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={true}>
        <TicketDashboard searchTerm="" />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('favorite-btn-1')).toBeInTheDocument();
    });

    const featureButton = screen.getByTestId('favorite-btn-1');
    fireEvent.click(featureButton);
  });

  it('should display error message on query failure', async () => {
    render(
      <MockedProvider mocks={mockError} addTypename={false}>
        <TicketDashboard searchTerm="" />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/failed/i)).toBeInTheDocument();
    });
  });
  it('should filter concerts by title', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={true}>
        <TicketDashboard searchTerm="Concert 1" />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('row-0')).toBeInTheDocument();
      expect(screen.queryByTestId('row-1')).not.toBeInTheDocument();
    });
  });
});
