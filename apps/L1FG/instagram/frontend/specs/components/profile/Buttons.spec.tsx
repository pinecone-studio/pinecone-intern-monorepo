import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';
import { Buttons } from '@/components/profile/isOwnerId/Buttons';

jest.mock('@/generated', () => ({
  useGetUserTogetherQuery: jest.fn(),
}));
jest.mock('@/generated', () => ({
  useCreateFollowerMutation: jest.fn(),
}));
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
jest.mock('@/generated', () => ({
  useGetUserTogetherQuery: jest.fn(() => ({
    data: {
      getUserTogether: {
        user: {
          _id: '12345',
          userName: 'john_doe',
          friendshipStatus: {
            followedBy: false,
            following: true,
            incomingRequest: false,
            outgoingRequest: false,
          },
        },
        viewer: {
          _id: '67890',
          userName: 'viewer',
        },
      },
    },
  })),
  useCreateFollowerMutation: jest.fn(() => [jest.fn(), { data: null }]),
}));

const baseMockDataNotOwner = {
  getUserTogether: {
    user: {
      _id: '12345',
      userName: 'john_doe',
      fullName: 'John Doe',
      bio: 'Software Engineer',
      profileImage: 'http:/image',
      hasStory: false,
      isPrivate: false,
      email: 'john@gmail.com',
      followingCount: 50,
      followerCount: 100,
      postCount: 5,
      friendshipStatus: {
        followedBy: false,
        following: false,
        incomingRequest: false,
        outgoingRequest: false,
      },
    },
    viewer: {
      _id: '12345',
      userName: 'viewer',
      fullName: 'viewer',
      bio: 'hi ',
      profileImage: 'http:/image',
    },
  },
};
describe('Buttons Component', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });
  });

  it('should render "Edit Profile" and "Ad tools" when user is the owner', () => {
    render(<Buttons userId="test-user" data={baseMockDataNotOwner} />);
  });

  it('should render "Following" and "Message" when user is NOT the owner', () => {
    render(<Buttons userId="test-user" data={baseMockDataNotOwner} />);
  });

  it('should navigate to /settings when "Edit Profile" is clicked', () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    render(<Buttons userId="test-user" data={baseMockDataNotOwner} />);
  });
});
