import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useGetArtistsQuery, useUpdateArtistMutation } from '@/generated';
import { MockedProvider } from '@apollo/client/testing';
import { ArtistComponent } from '@/components';
jest.mock('@/generated', () => ({
    useGetArtistsQuery: jest.fn(),
    useUpdateArtistMutation: jest.fn(),
}));
describe('ArtistComponent', () => {
    const mockArtistsData = {
        getArtists: [
            {
                _id: '1',
                artistName: 'Artist One',
                additional: 'Additional Info',
                status: 'Энгийн',
            },
            {
                _id: '2',
                artistName: 'Artist Two',
                additional: 'Additional Info',
                status: 'Устгагдсан',
            },
        ],
    };
    const mockUpdateArtist = jest.fn();
    beforeEach(() => {
        useGetArtistsQuery.mockReturnValue({
            data: mockArtistsData,
            loading: false,
            error: null,
        });
        useUpdateArtistMutation.mockReturnValue([mockUpdateArtist]);
    });
    test('renders the ArtistComponent correctly', () => {
        render(
            <MockedProvider>
                <ArtistComponent />
            </MockedProvider>
        );
        expect(screen.getByText('Artist One')).toBeInTheDocument();
        expect(screen.getByText('Artist Two')).toBeInTheDocument();
        expect(screen.getByText('Идэвхитэй Артистууд')).toBeInTheDocument();
    });
    test('opens alert dialog to change artist status', async () => {
        render(
            <MockedProvider>
                <ArtistComponent />
            </MockedProvider>
        );
        fireEvent.click(screen.getByTestId('click1-0'));
        await waitFor(() => screen.getByText('Төлөв өөрчлөх'));
        expect(screen.getByText('Төлөв өөрчлөх')).toBeInTheDocument();
        fireEvent.click(screen.getByText('Идэвхтэй'));
        expect(mockUpdateArtist).toHaveBeenCalledWith({
            variables: { input: { _id: '1', status: 'Энгийн' } },
        });
    });
    test('calls the update status mutation when status is changed', async () => {
        render(
            <MockedProvider>
                <ArtistComponent />
            </MockedProvider>
        );
        fireEvent.click(screen.getByTestId('click1-0'));
        await waitFor(() => screen.getByText('Төлөв өөрчлөх'));
        fireEvent.click(screen.getByText('Устгах'));
        expect(mockUpdateArtist).toHaveBeenCalledWith({
            variables: { input: { _id: '1', status: 'Устгагдсан' } },
        });
    });
});
