'use client';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LikeStyle } from '@/components/profile/comment/LikeStyle';

describe('LikeStyle Component', () => {
  it('renders the HeartIcon component', () => {
    render(<LikeStyle liked={false} />);

    const heartIcon = screen.getByTestId('like-icon');
    expect(heartIcon).toBeInTheDocument();
  });

  it('triggers handleClickLike when clicked', () => {
    const handleClickLike = jest.fn();
    render(<LikeStyle handleClickLike={handleClickLike} liked={false} />);

    const heartIcon = screen.getByTestId('like-icon');
    fireEvent.click(heartIcon);

    expect(handleClickLike).toHaveBeenCalledTimes(1);
  });

  it('applies correct class when liked is true', () => {
    render(<LikeStyle liked={true} />);

    const heartIcon = screen.getByTestId('like-icon');
    expect(heartIcon).toHaveClass('fill-red-500 text-red-500 border-none cursor-pointer');
  });

  it('applies correct class when liked is false', () => {
    render(<LikeStyle liked={false} />);

    const heartIcon = screen.getByTestId('like-icon');
    expect(heartIcon).toHaveClass('cursor-pointer fill-none');
    expect(heartIcon).not.toHaveClass('fill-red-500');
  });
});
