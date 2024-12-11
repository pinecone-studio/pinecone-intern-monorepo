/* eslint-disable max-lines */
import Notifications from '@/components/Notifications';
import { useUser } from '@/components/providers';
import { GetNotificationsByUserIdDocument } from '@/generated';
import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react';
import { isToday, isYesterday } from 'date-fns';
jest.mock('@/components/providers', () => ({
  ...jest.requireActual('@/components/providers'),
  useUser: jest.fn(),
}));
jest.mock('date-fns', () => ({
  ...jest.requireActual('date-fns'),
  isToday: jest.fn(),
  isYesterday: jest.fn(),
}));
export const mockUser = {
  _id: '11',
  email: '123@gmail.com',
  username: 'Zorg',
  fullname: 'Enkhzorig',
  gender: 'blabla',
  password: 'blabla',
  profilePicture: 'blabla',
  bio: 'blabla',
  isPrivate: false,
  createdAt: 'blabla',
  updatedAt: 'blabla',
};

const getNotificationsByUserIdMock = {
  request: {
    query: GetNotificationsByUserIdDocument,
    variables: {
      userId: '11',
    },
  },
  result: {
    data: {
      getNotificationsByUserId: [
        {
          createdAt: '2024-12-06T09:38:54.327+00:00',
          notifiedUserId: '11',
          postId: {
            images: ['https://picsum.photos/800'],
            _id: '22',
          },
          type: 'like',
          userId: { profilePicture: 'https://picsum.photos/800', username: 'zorg' },
          _id: '1111',
        },
        {
          createdAt: '2024-12-06T09:38:54.327+00:00',
          notifiedUserId: '11',
          postId: {
            images: ['https://picsum.photos/800'],
            _id: '22',
          },
          type: 'comment',
          userId: { profilePicture: 'https://picsum.photos/800', username: 'zorg' },
          _id: '1111',
        },
        {
          createdAt: '2024-12-06T09:38:54.327+00:00',
          notifiedUserId: '11',
          postId: {
            images: ['https://picsum.photos/800'],
            _id: '22',
          },
          type: 'follow',
          userId: { profilePicture: 'https://picsum.photos/800', username: 'zorg' },
          _id: '1111',
        },
      ],
    },
  },
};

const getNotificationsByUserIdMockWithoutUserId = {
  request: {
    query: GetNotificationsByUserIdDocument,
    variables: {
      userId: undefined,
    },
  },
  result: {
    data: {
      getNotificationsByUserId: undefined,
    },
  },
};
describe('Notifications', () => {
  it('Should render successfully', async () => {
    (useUser as jest.Mock).mockReturnValue({
      user: mockUser,
    });
    (isToday as jest.Mock).mockReturnValue(true);
    (isYesterday as jest.Mock).mockReturnValue(true);

    render(
      <MockedProvider mocks={[getNotificationsByUserIdMock]}>
        <Notifications />
      </MockedProvider>
    );
    await new Promise((resolve) => setTimeout(resolve, 1000));
  });
  it('Should render successfully', async () => {
    (useUser as jest.Mock).mockReturnValue({
      user: undefined,
    });
    (isToday as jest.Mock).mockReturnValue(false);
    (isYesterday as jest.Mock).mockReturnValue(true);
    render(
      <MockedProvider mocks={[getNotificationsByUserIdMockWithoutUserId]}>
        <Notifications />
      </MockedProvider>
    );
    await new Promise((resolve) => setTimeout(resolve, 1000));
  });
  it('Should render successfully', async () => {
    (useUser as jest.Mock).mockReturnValue({
      user: undefined,
    });
    (isToday as jest.Mock).mockReturnValue(false);
    (isYesterday as jest.Mock).mockReturnValue(true);
    render(
      <MockedProvider mocks={[getNotificationsByUserIdMock]}>
        <Notifications />
      </MockedProvider>
    );
    await new Promise((resolve) => setTimeout(resolve, 1000));
  });
  it('Should render successfully', async () => {
    (useUser as jest.Mock).mockReturnValue({
      user: mockUser,
    });
    (isToday as jest.Mock).mockReturnValue(false);
    (isYesterday as jest.Mock).mockReturnValue(true);
    render(
      <MockedProvider mocks={[getNotificationsByUserIdMockWithoutUserId]}>
        <Notifications />
      </MockedProvider>
    );
    await new Promise((resolve) => setTimeout(resolve, 1000));
  });
  it('Should render successfully', async () => {
    (isToday as jest.Mock).mockReturnValue(true);
    (isYesterday as jest.Mock).mockReturnValue(true);
    render(
      <MockedProvider mocks={[getNotificationsByUserIdMock]}>
        <Notifications />
      </MockedProvider>
    );
    await new Promise((resolve) => setTimeout(resolve, 1000));
  });
  it('Should render successfully', async () => {
    (isToday as jest.Mock).mockReturnValue(false);
    (isYesterday as jest.Mock).mockReturnValue(false);
    render(
      <MockedProvider mocks={[getNotificationsByUserIdMock]}>
        <Notifications />
      </MockedProvider>
    );
    await new Promise((resolve) => setTimeout(resolve, 1000));
  });
});
