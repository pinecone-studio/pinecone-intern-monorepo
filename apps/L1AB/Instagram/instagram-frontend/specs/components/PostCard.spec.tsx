import PostCard from '@/components/PostCard';
import { UserContext } from '@/components/providers';

import { MockedProvider } from '@apollo/client/testing';
import { render, fireEvent } from '@testing-library/react';

export type PropsType = {
  src: string;
  alt: string;
};

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
  keyy: 1,
  postId: '2',
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
  });
});
