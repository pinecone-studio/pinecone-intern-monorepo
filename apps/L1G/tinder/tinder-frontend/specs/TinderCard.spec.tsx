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

    fireEvent.click(screen.getByTestId('right-arrow'));
    expect(image.src.includes('401')).toBe(true);

    fireEvent.click(screen.getByTestId('left-arrow'));
    expect(image.src.includes('400')).toBe(true);
  });

  it('falls back to placeholder when image is missing', () => {
    const brokenProfile = {
      ...mockProfile,
      images: [undefined as unknown as string],
    };

    render(<TinderCard profile={brokenProfile} onLike={() => {}} onDislike={() => {}} />);

    const image = screen.queryByRole('img');
    expect(image !== null).toBe(true);
    expect(image && image.src.includes('/gray.jpeg')).toBe(true);
  });

  it('displays fallback image when image fails to load', () => {
    render(<TinderCard profile={mockProfile} onLike={() => {}} onDislike={() => {}} />);
    const image = screen.getByRole('img') as HTMLImageElement;

    fireEvent.error(image);

    expect(image.src.includes('/gray.jpeg')).toBe(true);
  });

  it('calls onLike when clicking like button (goes right)', async () => {
    const onLike = jest.fn();
    render(<TinderCard profile={mockProfile} onLike={onLike} onDislike={() => {}} />);

    const likeButton = screen.getByTestId('like');
    fireEvent.click(likeButton);

    await waitFor(() => {
      expect(onLike.mock.calls.some(call => call[0] === mockProfile.id)).toBe(true);
    });
  });
  it('handles direction state and resets correctly after animation', async () => {
    const onLike = jest.fn();
    const onDislike = jest.fn();

    render(<TinderCard profile={mockProfile} onLike={onLike} onDislike={onDislike} />);

    const likeButton = screen.getByTestId('like');
    fireEvent.click(likeButton);

    await waitFor(() => {
      expect(onLike.mock.calls.some(call => call[0] === mockProfile.id)).toBe(true);
    });

    await waitFor(() => {
      expect(screen.queryByTestId('like') !== null).toBe(true);
    });
  });

  it('resets direction to null after animation timeout', async () => {
    const onLike = jest.fn();
    render(<TinderCard profile={mockProfile} onLike={onLike} onDislike={() => {}} />);

    const likeButton = screen.getByTestId('like');
    fireEvent.click(likeButton);

    await waitFor(() => {
      expect(onLike.mock.calls.length > 0).toBe(true);
    });

    fireEvent.click(likeButton);
    await waitFor(() => {
      expect(onLike.mock.calls.length).toBe(2);
    });
  });

  it('falls back to placeholder when images array is empty or undefined', () => {
    const brokenProfileEmpty = { ...mockProfile, images: [] };
    render(<TinderCard profile={brokenProfileEmpty} onLike={() => {}} onDislike={() => {}} />);

    const images1 = screen.getAllByRole('img');
    expect(images1[0] !== null).toBe(true);
    expect(images1[0].src.includes('/gray.jpeg')).toBe(true);

    const brokenProfileUndefined = { ...mockProfile, images: undefined };
    render(<TinderCard profile={brokenProfileUndefined} onLike={() => {}} onDislike={() => {}} />);

    const images2 = screen.getAllByRole('img');
    expect(images2[0] !== null).toBe(true);
    expect(images2[0].src.includes('/gray.jpeg')).toBe(true);
  });

  it('renders Unknown when name is empty', () => {
    const profileWithEmptyName = { ...mockProfile, name: '' };
    render(<TinderCard profile={profileWithEmptyName} onLike={() => {}} onDislike={() => {}} />);
    expect(screen.getByText(/Unknown\s*,?/)).toBeTruthy();
  });

  it('renders name when age is null', () => {
    const profileWithNullAge = { ...mockProfile, age: null };
    render(<TinderCard profile={profileWithNullAge} onLike={() => {}} onDislike={() => {}} />);
    expect(screen.getByText(/Test User\s*,?/)).toBeTruthy();
  });

  it('renders name when age is undefined', () => {
    const profileWithUndefinedAge = { ...mockProfile, age: undefined };
    render(<TinderCard profile={profileWithUndefinedAge} onLike={() => {}} onDislike={() => {}} />);
    expect(screen.getByText(/Test User\s*,?/)).toBeTruthy();
  });

  it('calls onDislike when clicking dislike button (goes left)', async () => {
    const onLike = jest.fn();
    const onDislike = jest.fn();
    render(<TinderCard profile={mockProfile} onLike={onLike} onDislike={onDislike} />);

    const dislikeButton = screen.getByTestId('dislike');
    fireEvent.click(dislikeButton);

    await waitFor(() => {
      expect(onDislike.mock.calls.some(call => call[0] === mockProfile.id)).toBe(true);
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
    expect(screen.getByRole('img').src.includes('401')).toBe(true);

    fireEvent.click(rightButton);
    expect(screen.getByRole('img').src.includes('400')).toBe(true);

    fireEvent.click(leftButton);
    expect(screen.getByRole('img').src.includes('401')).toBe(true);
  });

  it('does not render navigation buttons when only one image exists', () => {
    render(<TinderCard profile={mockProfile} onLike={() => {}} onDislike={() => {}} />);

    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(2);
    expect(screen.queryByTestId('left-arrow')).toBeNull();
    expect(screen.queryByTestId('right-arrow')).toBeNull();
  });

  it('does not render navigation buttons when images array is empty', () => {
    const profileWithEmptyImages = { ...mockProfile, images: [] };
    render(<TinderCard profile={profileWithEmptyImages} onLike={() => {}} onDislike={() => {}} />);
    expect(screen.queryByTestId('left-arrow')).toBeNull();
    expect(screen.queryByTestId('right-arrow')).toBeNull();
  });

  it('does not render navigation buttons when images is undefined', () => {
    const profileWithUndefinedImages = { ...mockProfile, images: undefined };
    render(<TinderCard profile={profileWithUndefinedImages} onLike={() => {}} onDislike={() => {}} />);
    expect(screen.queryByTestId('left-arrow')).toBeNull();
    expect(screen.queryByTestId('right-arrow')).toBeNull();
  });

  it('does not render navigation buttons when there is exactly one real image', () => {
    const profileWithOneImage = { ...mockProfile, images: ['https://via.placeholder.com/400'] };
    render(<TinderCard profile={profileWithOneImage} onLike={() => {}} onDislike={() => {}} />);
    expect(screen.queryByTestId('left-arrow')).toBeNull();
    expect(screen.queryByTestId('right-arrow')).toBeNull();
  });

  it('renders both name and age when both are present', () => {
    const profile = { ...mockProfile, name: 'Alice', age: 30 };
    render(<TinderCard profile={profile} onLike={() => {}} onDislike={() => {}} />);
    expect(screen.getByText(/Alice\s*,\s*30/)).toBeTruthy();
  });

  it('renders Unknown and empty string when both name and age are missing', () => {
    const profile = { ...mockProfile, name: '', age: undefined };
    render(<TinderCard profile={profile} onLike={() => {}} onDislike={() => {}} />);
    expect(screen.getByText(/Unknown\s*,?/)).toBeTruthy();
  });

  it('renders Unknown and age when name is missing', () => {
    const profile = { ...mockProfile, name: '', age: 22 };
    render(<TinderCard profile={profile} onLike={() => {}} onDislike={() => {}} />);
    expect(screen.getByText(/Unknown\s*,\s*22/)).toBeTruthy();
  });

  it('renders name and empty string when age is missing', () => {
    const profile = { ...mockProfile, name: 'Bob', age: undefined };
    render(<TinderCard profile={profile} onLike={() => {}} onDislike={() => {}} />);
    expect(screen.getByText(/Bob\s*,?/)).toBeTruthy();
  });
});
