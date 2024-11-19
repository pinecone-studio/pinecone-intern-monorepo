import PostCard from '@/components/PostCard';
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
  images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
  profilePicture: 'profile.jpg',
  caption: 'This is a sample caption',
  keyy: 1,
};

describe('PostCard Component - prev/next functionality', () => {
  it('next image garna', () => {
    const { getByTestId } = render(<PostCard {...sampleProps} />);

    fireEvent.click(getByTestId('NextButton'));
    fireEvent.click(getByTestId('PrevButton'));
    fireEvent.click(getByTestId('PrevButton'));
    fireEvent.click(getByTestId('NextButton'));
    fireEvent.click(getByTestId('NextButton'));
    fireEvent.click(getByTestId('NextButton'));
  });
});
