import { render, screen, fireEvent } from '@testing-library/react';
import { ProfilePagePosts } from '@/components/ProfilePagePosts';
import { useRouter, useSearchParams } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ alt, src }: { alt: string; src: string }) => <img alt={alt} src={src} />,
}));

import '@testing-library/jest-dom';

describe('ProfilePagePosts', () => {
  const mockPush = jest.fn();
  const mockSearchParams = new URLSearchParams();

  const userPosts = [{ images: ['/image1.jpg', '/image2.jpg'] }, { images: ['/image3.jpg', '/image4.jpg'] }, { images: ['/image5.jpg', '/image6.jpg'] }];

  beforeEach(() => {
    mockPush.mockClear();
    useRouter.mockReturnValue({ push: mockPush } as unknown as ReturnType<typeof useRouter>);
    useSearchParams.mockReturnValue(mockSearchParams as unknown as ReturnType<typeof useSearchParams>);
  });

  test('renders posts correctly when type is "posts"', () => {
    mockSearchParams.get = jest.fn().mockReturnValue('posts');

    render(<ProfilePagePosts userPosts={userPosts} />);

    const postsTab = screen.getByText(/posts/i);
    expect(postsTab).toHaveClass('text-[#09090B]');
    expect(postsTab).not.toHaveClass('text-[#71717A]');

    const savedTab = screen.getByText(/saved/i);
    expect(savedTab).toHaveClass('text-[#71717A]');
    expect(savedTab).not.toHaveClass('text-[#09090B]');

    userPosts.forEach((post) => {
      post.images.forEach((image) => {
        console.log(image);
      });
    });
  });

  test('renders saved posts when type is "saved"', () => {
    mockSearchParams.get = jest.fn().mockReturnValue('saved');

    render(<ProfilePagePosts userPosts={userPosts} />);

    const savedTab = screen.getByText(/saved/i);
    expect(savedTab).toHaveClass('text-[#09090B]');
    expect(savedTab).not.toHaveClass('text-[#71717A]');

    const postsTab = screen.getByText(/posts/i);
    expect(postsTab).toHaveClass('text-[#71717A]');
    expect(postsTab).not.toHaveClass('text-[#09090B]');

    userPosts.forEach((post) => {
      post.images.forEach((image) => {
        console.log(image);
      });
    });
  });

  test('renders ProfilePageFirstPost when there is no userPosts', () => {
    render(<ProfilePagePosts userPosts={[]} />);
  });

  test('navigates to the correct URL when tabs are clicked', () => {
    mockSearchParams.get = jest.fn().mockReturnValue('posts');

    render(<ProfilePagePosts userPosts={userPosts} />);

    const savedTab = screen.getByText(/saved/i);
    fireEvent.click(savedTab);

    expect(mockPush).toHaveBeenCalledWith('/profile?username=posts&type=saved');

    const postsTab = screen.getByText(/posts/i);
    fireEvent.click(postsTab);

    expect(mockPush).toHaveBeenCalledWith('/profile?username=posts&type=posts');
  });
});
