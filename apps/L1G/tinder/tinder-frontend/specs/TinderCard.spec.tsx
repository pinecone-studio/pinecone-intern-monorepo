import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import TinderCard from '@/components/Tinder-card';

describe('TinderCard animation behavior', () => {
  const mockProfile = {
    id: '1',
    name: 'Test User',
    age: 25,
    images: ['https://via.placeholder.com/400'],
  };

  it('navigates through images using next and previous buttons', () => {
    const multiImageProfile = {
      ...mockProfile,
      images: ['https://via.placeholder.com/400', 'https://via.placeholder.com/401'],
    };

    render(<TinderCard profile={multiImageProfile} onLike={() => {}} onDislike={() => {}} />);

    const image = screen.getByRole('img') as HTMLImageElement;

    // Test next button (goes to the next image)
    fireEvent.click(screen.getByTestId('right-arrow'));
    expect(image.src).toContain('401');

    // Test previous button (goes back to the first image)
    fireEvent.click(screen.getByTestId('left-arrow'));
    expect(image.src).toContain('400');
  });

  it('falls back to placeholder when image is missing', () => {
    const brokenProfile = {
      ...mockProfile,
      images: [undefined as unknown as string],
    };

    render(<TinderCard profile={brokenProfile} onLike={() => {}} onDislike={() => {}} />);

    const image = screen.queryByRole('img');
    expect(image).not.toBeNull();
    expect(image?.src).toContain('/gray.jpeg'); // Fallback to placeholder
  });

  it('displays fallback image when image fails to load', () => {
    render(<TinderCard profile={mockProfile} onLike={() => {}} onDislike={() => {}} />);
    const image = screen.getByRole('img') as HTMLImageElement;

    fireEvent.error(image); // Simulate error event on image

    expect(image.src).toContain('/gray.jpeg'); // Fallback to placeholder
  });

  it('calls onLike when clicking like button (goes right)', async () => {
    const onLike = jest.fn();
    render(<TinderCard profile={mockProfile} onLike={onLike} onDislike={() => {}} />);

    const likeButton = screen.getByTestId('like');
    fireEvent.click(likeButton);

    await waitFor(() => {
      expect(onLike).toHaveBeenCalledWith(mockProfile.id);
    });
  });
  it('handles direction state and resets correctly after animation', async () => {
    const onLike = jest.fn();
    const onDislike = jest.fn();

    render(<TinderCard profile={mockProfile} onLike={onLike} onDislike={onDislike} />);

    const likeButton = screen.getByTestId('like');
    fireEvent.click(likeButton);

    await waitFor(() => {
      expect(onLike).toHaveBeenCalledWith(mockProfile.id);
    });

    // Wait for animation to reset
    await waitFor(() => {
      expect(screen.queryByTestId('like')).toBeInTheDocument(); // Button should still be there after animation
    });
  });

  it('resets direction to null after animation timeout', async () => {
    const onLike = jest.fn();
    render(<TinderCard profile={mockProfile} onLike={onLike} onDislike={() => {}} />);

    const likeButton = screen.getByTestId('like');
    fireEvent.click(likeButton);

    await waitFor(() => {
      expect(onLike).toHaveBeenCalled();
    });

    fireEvent.click(likeButton);
    await waitFor(() => {
      expect(onLike).toHaveBeenCalledTimes(2);
    });
  });

  it('falls back to placeholder when images array is empty or undefined', () => {
    const brokenProfileEmpty = { ...mockProfile, images: [] };
    render(<TinderCard profile={brokenProfileEmpty} onLike={() => {}} onDislike={() => {}} />);

    const image = screen.queryByRole('img');
    expect(image).not.toBeNull();
    expect(image?.src).toContain('/gray.jpeg'); // Fallback to placeholder

    const brokenProfileUndefined = { ...mockProfile, images: undefined };
    render(<TinderCard profile={brokenProfileUndefined} onLike={() => {}} onDislike={() => {}} />);

    const image2 = screen.queryByRole('img');
    expect(image2).not.toBeNull();
    expect(image2?.src).toContain('/gray.jpeg'); // Fallback to placeholder
  });

  it('renders profile with empty name and age', () => {
    const profileWithEmptyName = { ...mockProfile, name: '' };
    render(<TinderCard profile={profileWithEmptyName} onLike={() => {}} onDislike={() => {}} />);

    // Ensure fallback text "Unknown" appears when name is empty
    expect(screen.getByText('Unknown')).toBeInTheDocument();

    const profileWithNullAge = { ...mockProfile, age: null };
    render(<TinderCard profile={profileWithNullAge} onLike={() => {}} onDislike={() => {}} />);
    expect(screen.queryByText('25')).not.toBeInTheDocument(); // Age should not appear
    expect(screen.getByText('')).toBeInTheDocument(); // Empty fallback string should be rendered

    const profileWithUndefinedAge = { ...mockProfile, age: undefined };
    render(<TinderCard profile={profileWithUndefinedAge} onLike={() => {}} onDislike={() => {}} />);
    expect(screen.queryByText('25')).not.toBeInTheDocument(); // Age should not appear
    expect(screen.getByText('')).toBeInTheDocument(); // Empty fallback string should be rendered
  });

  it('calls onDislike when clicking dislike button (goes left)', async () => {
    const onLike = jest.fn();
    const onDislike = jest.fn();
    render(<TinderCard profile={mockProfile} onLike={onLike} onDislike={onDislike} />);

    const dislikeButton = screen.getByTestId('dislike');
    fireEvent.click(dislikeButton);

    await waitFor(() => {
      expect(onDislike).toHaveBeenCalledWith(mockProfile.id);
    });
  });

  it('wraps to first image after last in nextImage and to last image before first in prevImage', () => {
    const multiImageProfile = {
      ...mockProfile,
      images: ['https://via.placeholder.com/400', 'https://via.placeholder.com/401'],
    };

    render(<TinderCard profile={multiImageProfile} onLike={() => {}} onDislike={() => {}} />);

    const rightButton = screen.getByTestId('right-arrow');
    const leftButton = screen.getByTestId('left-arrow');

    fireEvent.click(rightButton);
    expect(screen.getByRole('img').src).toContain('401');

    fireEvent.click(rightButton);
    expect(screen.getByRole('img').src).toContain('400');

    fireEvent.click(leftButton);
    expect(screen.getByRole('img').src).toContain('401');
  });

  it('does not render navigation buttons when only one image exists', () => {
    render(<TinderCard profile={mockProfile} onLike={() => {}} onDislike={() => {}} />);

    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(2); // Should only have two buttons (like and dislike)
    expect(screen.queryByTestId('left-arrow')).toBeNull(); // No left arrow button
    expect(screen.queryByTestId('right-arrow')).toBeNull(); // No right arrow button
  });
});
