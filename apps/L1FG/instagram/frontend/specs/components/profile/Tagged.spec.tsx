import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MockedProvider } from '@apollo/client/testing';
import { useGetUserTogetherQuery } from '@/generated';
import Tagged from '@/components/profile/profilePost/Tagged';

jest.mock('@/generated', () => ({
  useGetUserTogetherQuery: jest.fn(),
}));

describe('Tagged Component', () => {
  it('should render correctly for the owner', () => {
    (useGetUserTogetherQuery as jest.Mock).mockReturnValue({
      data: {
        getUserTogether: {
          viewer: { _id: '123' },
        },
      },
    });

    render(
      <MockedProvider>
        <Tagged userId="123" />
      </MockedProvider>
    );

    expect(screen.getByText('Photos of you')).toBeInTheDocument();

    expect(screen.getByText('When people tag you in photos, they ll appear here..')).toBeInTheDocument();
  });

  it('should render correctly for a non-owner', () => {
    (useGetUserTogetherQuery as jest.Mock).mockReturnValue({
      data: {
        getUserTogether: {
          viewer: { _id: '456' },
        },
      },
    });

    render(
      <MockedProvider>
        <Tagged userId="123" />
      </MockedProvider>
    );

    expect(screen.getByText('Photos of you')).toBeInTheDocument();

    expect(screen.queryByText('When people tag you in photos, they ll appear here..')).not.toBeInTheDocument();
  });

  it('should handle loading state', () => {
    (useGetUserTogetherQuery as jest.Mock).mockReturnValue({
      loading: true,
    });

    render(
      <MockedProvider>
        <Tagged userId="123" />
      </MockedProvider>
    );
  });

  it('should handle error state', () => {
    (useGetUserTogetherQuery as jest.Mock).mockReturnValue({
      error: new Error('Failed to fetch'),
    });

    render(
      <MockedProvider>
        <Tagged userId="123" />
      </MockedProvider>
    );

    expect(screen.getByText('Photos of you')).toBeInTheDocument();
  });
});
