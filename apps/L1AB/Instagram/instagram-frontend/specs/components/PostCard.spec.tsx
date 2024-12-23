import PostCard from '@/components/PostCard';
import { UserContext } from '@/components/providers';

import { MockedProvider } from '@apollo/client/testing';
import { render, fireEvent } from '@testing-library/react';

export type PropsType = {
  src: string;
  alt: string;
};
jest.mock('date-fns', () => ({
  ...jest.requireActual('date-fns'),
  formatDistanceToNow: jest.fn(),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: PropsType) => <img src={src} alt={alt} />,
}));

const sampleProps = {
  userName: 'John Doe',
  likeCount: 123,
  images: ['/image1.jpg', '/image2.jpg'],
  profilePicture: 'profile.jpg',
  caption: 'This is a sample caption',
  postId: '2',
  postOwnerId: '123',
  deletePost: jest.fn(),
};
const mockUser = { _id: '123' };
describe('PostCard Component - prev/next functionality', () => {
  it('image slider', async () => {
    const { getByTestId } = render(
      <UserContext.Provider value={{ user: mockUser }}>
        <MockedProvider>
          <PostCard {...sampleProps} />
        </MockedProvider>
      </UserContext.Provider>
    );
    const NextButton = getByTestId('NextButton');

    fireEvent.click(NextButton);

    const PrevButton = getByTestId('PrevButton');

    fireEvent.click(PrevButton);

    const DeleteButton = getByTestId('deleteButton-2');
    fireEvent.click(DeleteButton);

    const Delete = getByTestId('delete-2');
    fireEvent.click(Delete);

    const DeletePost = getByTestId('deletePost-2');
    fireEvent.click(DeletePost);
  });

  it('image slider', async () => {
    render(
      <UserContext.Provider value={{ user: null }}>
        <MockedProvider>
          <PostCard {...sampleProps} />
        </MockedProvider>
      </UserContext.Provider>
    );
  });
});
