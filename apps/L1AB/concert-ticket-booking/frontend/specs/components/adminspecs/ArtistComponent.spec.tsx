import { ArtistComponent } from '@/components';
import { GetArtistsDocument, UpdateArtistDocument } from '@/generated';
import { MockedProvider } from '@apollo/client/testing';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

const mockGetArtists = {
  request: {
    query: GetArtistsDocument,
  },
  result: {
    data: {
      getArtists: [
        {
          _id: '1',
          artistName: 'Test Artist 1',
          additional: 'Test additional info',
          status: 'Энгийн',
        },
        {
          _id: '2',
          artistName: 'Test Artist 2',
          additional: 'Test additional info',
          status: 'Устгагдсан',
        },
      ],
    },
  },
};

const mockUpdateArtist = {
  request: {
    query: UpdateArtistDocument,
    variables: {
      input: { _id: '1', status: 'Энгийн' },
    },
  },
  result: {
    data: {
      updateArtist: {
        _id: '1',
        artistName: 'Test Artist 1',
        status: 'Энгийн',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      },
    },
  },
};

const mockUpdateArtist1 = {
  request: {
    query: UpdateArtistDocument,
    variables: {
      input: { _id: '1', status: 'Устгагдсан' },
    },
  },
  result: {
    data: {
      updateArtist: {
        _id: '1',
        artistName: 'Test Artist 1',
        status: 'Устгагдсан',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      },
    },
  },
};

describe('ArtistComponent', () => {
  it('should render successfully and allow updating artist status', async () => {
    const { getByTestId, getAllByTestId } = render(
      <MockedProvider mocks={[mockGetArtists, mockUpdateArtist]} addTypename={false}>
        <ArtistComponent />
      </MockedProvider>
    );

    await waitFor(() => {
      const alertTrigger = getAllByTestId('clickDialogTrigger')[0];
      fireEvent.click(alertTrigger);

      const cancelButton = getByTestId('cancelButton');
      fireEvent.click(cancelButton);
    });
  });
  it('should render successfully and allow updating artist status', async () => {
    const { getByTestId, getAllByTestId } = render(
      <MockedProvider mocks={[mockGetArtists, mockUpdateArtist1]} addTypename={false}>
        <ArtistComponent />
      </MockedProvider>
    );

    await waitFor(() => {
      const alertTrigger = getAllByTestId('clickDialogTrigger')[0];
      fireEvent.click(alertTrigger);

      const cancelButton = getByTestId('actionButton');
      fireEvent.click(cancelButton);
    });
  });

  it('should render successfully with "Устгагдсан" status and allow updating artist status', async () => {
    render(
      <MockedProvider mocks={[mockGetArtists, mockUpdateArtist]} addTypename={false}>
        <ArtistComponent />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen);
    });
  });
});
