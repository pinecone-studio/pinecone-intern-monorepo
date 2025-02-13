import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useGetUserTogetherQuery } from '@/generated';
import { useRouter } from 'next/navigation';
import { Buttons } from '@/components/profile/isOwnerId/Buttons';

jest.mock('@/generated', () => ({
  useGetUserTogetherQuery: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Buttons Component', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });
  });

  it('should render "Edit Profile" and "Ad tools" when user is the owner', () => {
    (useGetUserTogetherQuery as jest.Mock).mockReturnValue({
      data: { getUserTogether: { viewer: { _id: 'test-user' } } },
    });

    render(<Buttons userId="test-user" />);

    expect(screen.getByText('Edit Profile')).toBeInTheDocument();
    expect(screen.getByText('Ad tools')).toBeInTheDocument();
  });

  it('should render "Following" and "Message" when user is NOT the owner', () => {
    (useGetUserTogetherQuery as jest.Mock).mockReturnValue({
      data: { getUserTogether: { viewer: { _id: 'another-user' } } },
    });

    render(<Buttons userId="test-user" />);

    expect(screen.getByText('Following')).toBeInTheDocument();
    expect(screen.getByText('Message')).toBeInTheDocument();
  });

  it('should navigate to /settings when "Edit Profile" is clicked', () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    (useGetUserTogetherQuery as jest.Mock).mockReturnValue({
      data: { getUserTogether: { viewer: { _id: 'test-user' } } },
    });

    render(<Buttons userId="test-user" />);

    fireEvent.click(screen.getByText('Edit Profile'));

    expect(mockPush).toHaveBeenCalledWith('/settings');
  });
});
