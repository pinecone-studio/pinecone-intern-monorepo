'use client';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CommentLike } from '@/components/profile/comment/CommentLike';

describe('LikeStyle Component', () => {
  it('renders the HeartIcon component', () => {
    const handleClickLike = jest.fn();
    render(<CommentLike liked={false} handleClickLike={handleClickLike} />);

    const heartIcon = screen.getByTestId('like-icon');
    expect(heartIcon).toBeInTheDocument();
  });

  it('triggers handleClickLike when clicked', () => {
    const handleClickLike = jest.fn();
    render(<CommentLike liked={false} handleClickLike={handleClickLike} />);

    const heartIcon = screen.getByTestId('like-icon');
    fireEvent.click(heartIcon);

    expect(handleClickLike).toHaveBeenCalledTimes(1);
  });

  it('applies correct class when liked is true', () => {
    const handleClickLike = jest.fn();

    render(<CommentLike liked={true} handleClickLike={handleClickLike} />);

    const heartIcon = screen.getByTestId('like-icon');
    expect(heartIcon).toHaveClass('fill-red-500 text-red-500 border-none cursor-pointer');
  });

  it('applies correct class when liked is false', () => {
    const handleClickLike = jest.fn();

    render(<CommentLike liked={false} handleClickLike={handleClickLike} />);

    const heartIcon = screen.getByTestId('like-icon');
    expect(heartIcon).toHaveClass('cursor-pointer fill-none');
    expect(heartIcon).not.toHaveClass('fill-red-500');
  });
});
