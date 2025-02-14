import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PostEmpty from '@/components/profile/profilePost/PostEmpty';
import { useGetUserTogetherQuery } from '@/generated';

jest.mock('@/generated', () => ({
  useGetUserTogetherQuery: jest.fn(),
}));

describe('PostEmpty Component', () => {
  it('should render and show "Share Photos" when user is the owner', () => {
    (useGetUserTogetherQuery as jest.Mock).mockReturnValue({
      data: { getUserTogether: { viewer: { _id: 'test-user' } } },
    });

    render(<PostEmpty userId="test-user" />);

    expect(screen.getByText('Share Photos')).toBeInTheDocument();
  });

  it('should render and show "No posts yet" when user is NOT the owner', () => {
    (useGetUserTogetherQuery as jest.Mock).mockReturnValue({
      data: { getUserTogether: { viewer: { _id: 'another-user' } } },
    });

    render(<PostEmpty userId="test-user" />);

    expect(screen.getByText('No posts yet')).toBeInTheDocument();
  });

  it('should open modal when "Share your first photo" button is clicked', () => {
    (useGetUserTogetherQuery as jest.Mock).mockReturnValue({
      data: { getUserTogether: { viewer: { _id: 'test-user' } } },
    });

    render(<PostEmpty userId="test-user" />);

    fireEvent.click(screen.getByTestId('post-empty-button'));

    expect(screen.getByTestId('create-post-modal')).toBeInTheDocument();
  });
});
