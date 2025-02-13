import { IconPostSavedTag } from '@/features/profile/comment/IconPostSavedTag';
import { GetUserTogetherDocument } from '@/generated';
import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, render, screen } from '@testing-library/react';

jest.mock('', () => ({
  useParams: jest.fn(),
}));

describe('IconPostSavedTag Component :Post count 0 ', () => {
  const case1 = {
    request: {
      query: GetUserTogetherDocument,
      variables: { searchingUserId: '1234' },
    },

    result: {
      data: {
        getUserTogether: {
          user: {
            _id: 'idf',
            userName: 'john_doe',
            fullName: 'John Doe',
            bio: 'Software Engineer',
            profileImage: 'http:/image',
            hasStory: false,
            gender: 'male',
            isPrivate: false,
            email: 'john@gmail.com',
            followingCount: 50,
            followerCount: 100,
            postCount: 0,
            friendshipStatus: {
              followedBy: false,
              following: false,
              incomingRequest: false,
              outgoingRequest: false,
            },
          },
          viewer: {
            _id: 'viewer',
            userName: 'viewer',
            fullName: 'viewer',
            bio: 'hi ',
            profileImage: 'http:/image',
          },
        },
      },
    },
  };

  it('Should render empty post', async () => {
    render(
      <MockedProvider mocks={[case1]} addTypename={false}>
        <IconPostSavedTag userId={'1234'} />
      </MockedProvider>
    );

    const button = screen.getAllByTestId('nav-item')[0];
    const button1 = screen.getAllByTestId('nav-item')[1];

    fireEvent.click(button);
    fireEvent.click(button1);
  });
});
