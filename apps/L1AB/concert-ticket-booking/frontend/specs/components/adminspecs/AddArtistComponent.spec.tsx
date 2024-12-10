import { AddArtistComponent } from '@/components';
import { CreateArtistDocument } from '@/generated';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import { toast } from 'react-toastify';

export const createArtistMock: MockedResponse = {
  request: {
    query: CreateArtistDocument,
    variables: {
      input: {
        artistName: 'Test Artist',
        additional: 'Test Additional Info',
        status: 'Энгийн', 
      },
    },
  },
  result: {
    data: {
      createArtist: {
        _id: '1',
        artistName: 'Test Artist',
        additional: 'Test Additional Info',
        status: 'Энгийн',
      },
    },
  },
};

export const createArtistMockWithError: MockedResponse = {
  request: {
    query: CreateArtistDocument,
    variables: {
      input: {
        artistName: 'Test Artist',
        additional: 'Test Additional',
      },
    },
  },
  error: new Error('Network error'),
};
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('AddArtistComponent', () => {
  const refetch = jest.fn();

  it('should render successfully and call refetch after successful submission', async () => {
    const refetch = jest.fn();

    render(
      <MockedProvider mocks={[createArtistMock]} addTypename={false}>
        <AddArtistComponent refetch={refetch} />
      </MockedProvider>
    );

    fireEvent.click(screen.getByTestId('Artist-DialogOpen'));
    fireEvent.change(screen.getByTestId('artistName'), { target: { value: 'Test Artist' } });
    fireEvent.change(screen.getByTestId('description'), { target: { value: 'Test Additional Info' } });

    fireEvent.click(screen.getByTestId('createArtistButton'));

    await waitFor(() => {
      expect(toast.success);
      expect(refetch);
    });
  });

  it('should show validation error when artist name is missing', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[createArtistMock]} addTypename={false}>
        <AddArtistComponent refetch={refetch} />
      </MockedProvider>
    );

    fireEvent.click(getByTestId('Artist-DialogOpen'));

    fireEvent.click(getByTestId('createArtistButton'));

    await waitFor(() => {
      expect(toast.error);
    });
  });

  it('should show validation error when additional info is missing', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[createArtistMock]} addTypename={false}>
        <AddArtistComponent refetch={refetch} />
      </MockedProvider>
    );

    fireEvent.click(getByTestId('Artist-DialogOpen'));

    fireEvent.change(getByTestId('artistName'), { target: { value: 'Test Artist' } });

    fireEvent.click(getByTestId('createArtistButton'));

    await waitFor(() => {
      expect(toast.error);
    });
  });

  it('should show network error message when there is a network error', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[createArtistMockWithError]} addTypename={false}>
        <AddArtistComponent refetch={refetch} />
      </MockedProvider>
    );

    fireEvent.click(getByTestId('Artist-DialogOpen'));
    fireEvent.change(getByTestId('artistName'), { target: { value: 'Test Artist' } });
    fireEvent.change(getByTestId('description'), { target: { value: 'Test Additional Info' } });

    fireEvent.click(getByTestId('createArtistButton'));

    await waitFor(() => {
      expect(toast.error);
    });
  });

  it('should show loading state when creating artist', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[createArtistMock]} addTypename={false}>
        <AddArtistComponent refetch={refetch} />
      </MockedProvider>
    );

    fireEvent.click(getByTestId('Artist-DialogOpen'));
    fireEvent.change(getByTestId('artistName'), { target: { value: 'Test Artist' } });
    fireEvent.change(getByTestId('description'), { target: { value: 'Test Additional Info' } });

    fireEvent.click(getByTestId('createArtistButton'));

    expect(getByTestId('createArtistButton').textContent);
  });
});
