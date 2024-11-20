import { render, screen, fireEvent } from '@testing-library/react';
import { ProfilePagePosts } from '@/components/ProfilePagePosts';
import { useRouter, useSearchParams } from 'next/navigation';
import { ProfilePageFirstPost } from '@/components/ProfilePageFirstPost';

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

  beforeEach(() => {
    mockPush.mockClear();
    useRouter.mockReturnValue({ push: mockPush } as unknown as ReturnType<typeof useRouter>);
    useSearchParams.mockReturnValue(mockSearchParams as unknown as ReturnType<typeof useSearchParams>);
  });

  test('renders posts correctly when type is "posts"', () => {
    mockSearchParams.get = jest.fn().mockReturnValue('posts');

    render(<ProfilePagePosts postImage="image-url.jpg" />);

    const postsTab = screen.getByText(/posts/i);
    expect(postsTab).toHaveClass('text-[#09090B]');
    expect(postsTab).not.toHaveClass('text-[#71717A]');

    const savedTab = screen.getByText(/saved/i);
    expect(savedTab).toHaveClass('text-[#71717A]');
    expect(savedTab).not.toHaveClass('text-[#09090B]');

    const postImage = screen.getByAltText('post');
    expect(postImage).toHaveAttribute('src', 'image-url.jpg');
  });

  test('renders saved posts when type is "saved"', () => {
    mockSearchParams.get = jest.fn().mockReturnValue('saved');

    render(<ProfilePagePosts postImage="image-url.jpg" />);

    const savedTab = screen.getByText(/saved/i);
    expect(savedTab).toHaveClass('text-[#09090B]');
    expect(savedTab).not.toHaveClass('text-[#71717A]');

    const postsTab = screen.getByText(/posts/i);
    expect(postsTab).toHaveClass('text-[#71717A]');
    expect(postsTab).not.toHaveClass('text-[#09090B]');
  });

  test('renders ProfilePageFirstPost when there is no postImage', () => {
    render(<ProfilePagePosts postImage={null} />);

    render(<ProfilePageFirstPost />);
  });

  test('navigates to the correct URL when tabs are clicked', () => {
    mockSearchParams.get = jest.fn().mockReturnValue('posts');

    render(<ProfilePagePosts postImage="image-url.jpg" />);

    const savedTab = screen.getByText(/saved/i);
    fireEvent.click(savedTab);

    expect(mockPush).toHaveBeenCalledWith('/profile?type=saved');

    const postsTab = screen.getByText(/posts/i);
    fireEvent.click(postsTab);

    expect(mockPush).toHaveBeenCalledWith('/profile?type=posts');
  });
});
