import React from 'react';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import TicketDashboard from '@/app/admin/concerts/_components/TicketDashboard';
import '@testing-library/jest-dom';
import { MockedProvider } from '@apollo/client/testing';
import { ConcertsDocument } from '@/generated';
import { mockConcerts } from 'specs/utils/mock-concert-info';
import { GraphqlMocks, mockDeleteEventError, mockErrorConcertsDocument, mockFeatureEventError, successMockFeatureEvent } from './utils/graphql-mocks';
import FeatureAnEvent from '@/app/admin/concerts/_components/FeatureAnEvent';

describe('TicketDashboard Component', () => {
  beforeEach(() => {
    jest.spyOn(window, 'prompt').mockImplementation(() => 'Шинэ нэр');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('deletes a concert and shows success snackbar', async () => {
    render(
      <MockedProvider mocks={GraphqlMocks} addTypename={true}>
        <TicketDashboard searchTerm="" />
      </MockedProvider>
    );

    const deleteButton = await screen.findByTestId('delete-btn-1');
    fireEvent.click(deleteButton);

    expect(await screen.findByText('Амжилттай устгалаа!')).toBeInTheDocument();

    await waitFor(
      () => {
        expect(screen.queryByText('Амжилттай устгалаа!')).not.toBeInTheDocument();
      },
      { timeout: 2500 }
    );
  });
  it('should show error snackbar on delete failure', async () => {
    const errorMocks = [
      {
        request: { query: ConcertsDocument },
        result: { data: { concerts: mockConcerts } },
      },
      mockDeleteEventError,
    ];

    render(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <TicketDashboard searchTerm="" />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('delete-btn-1')).toBeInTheDocument();
    });

    const deleteButton = screen.getByTestId('delete-btn-1');
    fireEvent.click(deleteButton);
    expect(await screen.findByText(/устгах үед алдаа гарлаа/i)).toBeInTheDocument();

    await waitFor(
      () => {
        expect(screen.queryByText(/устгах үед алдаа гарлаа/i)).not.toBeInTheDocument();
      },
      { timeout: 3500 }
    );
  });
  it('features a concert and shows confirmation snackbar', async () => {
    render(
      <MockedProvider mocks={GraphqlMocks} addTypename={true}>
        <TicketDashboard searchTerm="" />
      </MockedProvider>
    );

    const featureButton = await screen.findByTestId('favorite-btn-1');
    fireEvent.click(featureButton);

    expect(await screen.findByText('Онцолж байна...')).toBeInTheDocument();

    await waitFor(
      () => {
        expect(screen.queryByText('Онцолж байна...')).not.toBeInTheDocument();
      },
      { timeout: 1500 }
    );
  });
  it('shows error snackbar on feature failure', async () => {
    const errorMocks = [
      {
        request: { query: ConcertsDocument },
        result: { data: { concerts: mockConcerts } },
      },
      mockFeatureEventError,
    ];

    render(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <TicketDashboard searchTerm="" />
      </MockedProvider>
    );

    const featureButton = await screen.findByTestId('favorite-btn-1');
    fireEvent.click(featureButton);

    expect(await screen.findByText(/онцлох үед алдаа гарлаа/i)).toBeInTheDocument();

    await waitFor(
      () => {
        expect(screen.queryByText(/онцлох үед алдаа гарлаа/i)).not.toBeInTheDocument();
      },
      { timeout: 3500 }
    );
  });
  it('shows error message if concert query fails', async () => {
    render(
      <MockedProvider mocks={mockErrorConcertsDocument} addTypename={false}>
        <TicketDashboard searchTerm="" />
      </MockedProvider>
    );

    expect(await screen.findByText(/failed/i)).toBeInTheDocument();
  });

  it('filters concerts by searchTerm', async () => {
    render(
      <MockedProvider mocks={GraphqlMocks} addTypename={true}>
        <TicketDashboard searchTerm="Concert 1" />
      </MockedProvider>
    );

    expect(await screen.findByTestId('row-0')).toBeInTheDocument();
    expect(screen.queryByTestId('row-1')).not.toBeInTheDocument();
  });

  it('shows loading Snackbar with message "Онцолж байна..."', async () => {
    render(
      <MockedProvider mocks={[successMockFeatureEvent]} addTypename={false}>
        <FeatureAnEvent idx={0} id="mock-1" row={{ id: 'mock-1', featured: false }} />
      </MockedProvider>
    );

    const button = await screen.findByTestId('favorite-btn-0');
    fireEvent.click(button);
    expect(await screen.findByText('Онцолж байна...')).toBeInTheDocument();
    await waitFor(
      () => {
        expect(screen.queryByText('Онцолж байна...')).not.toBeInTheDocument();
      },
      { timeout: 1500 }
    );
  });
});
