import { TinderCard } from '@/components/TinderCard';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';

describe('TinderCard profile and button behavior', () => {
  const mockProfile = {
    id: '1',
    name: 'Test User',
    age: 25,
    images: ['https://via.placeholder.com/400'],
  };

  it('renders Unknown when name is empty', () => {
    const profileWithEmptyName = { ...mockProfile, name: '' };
    render(<TinderCard profile={profileWithEmptyName} onLike={jest.fn()} onDislike={jest.fn()} />);
    expect(screen.getByText(/Unknown\s*,?/)).toBeTruthy();
  });

  it('renders name when age is null', () => {
    const profileWithNullAge = { ...mockProfile, age: null };
    render(<TinderCard profile={profileWithNullAge} onLike={jest.fn()} onDislike={jest.fn()} />);
    expect(screen.getByText(/Test User\s*,?/)).toBeTruthy();
  });

  it('renders name when age is undefined', () => {
    const profileWithUndefinedAge = { ...mockProfile, age: undefined };
    render(<TinderCard profile={profileWithUndefinedAge} onLike={jest.fn()} onDislike={jest.fn()} />);
    expect(screen.getByText(/Test User\s*,?/)).toBeTruthy();
  });

  it('calls onLike when clicking like button (goes right)', async () => {
    const onLike = jest.fn();
    render(<TinderCard profile={mockProfile} onLike={onLike} onDislike={jest.fn()} />);

    const likeButton = screen.getByTestId('like');
    fireEvent.click(likeButton);

    await waitFor(() => {
      expect(onLike.mock.calls.some((call) => call[0] === mockProfile.id)).toBe(true);
    });
  });

  it('handles direction state and resets correctly after animation', async () => {
    const onLike = jest.fn();
    const onDislike = jest.fn();

    render(<TinderCard profile={mockProfile} onLike={onLike} onDislike={onDislike} />);

    const likeButton = screen.getByTestId('like');
    fireEvent.click(likeButton);

    await waitFor(() => {
      expect(onLike.mock.calls.some((call) => call[0] === mockProfile.id)).toBe(true);
    });

    await waitFor(() => {
      expect(screen.queryByTestId('like') !== null).toBe(true);
    });
  });

  it('resets direction to null after animation timeout', async () => {
    const onLike = jest.fn();
    render(<TinderCard profile={mockProfile} onLike={onLike} onDislike={jest.fn()} />);

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

  it('calls onDislike when clicking dislike button (goes left)', async () => {
    const onLike = jest.fn();
    const onDislike = jest.fn();
    render(<TinderCard profile={mockProfile} onLike={onLike} onDislike={onDislike} />);

    const dislikeButton = screen.getByTestId('dislike');
    fireEvent.click(dislikeButton);

    await waitFor(() => {
      expect(onDislike.mock.calls.some((call) => call[0] === mockProfile.id)).toBe(true);
    });
  });

  it('renders both name and age when both are present', () => {
    const profile = { ...mockProfile, name: 'Alice', age: 30 };
    render(<TinderCard profile={profile} onLike={jest.fn()} onDislike={jest.fn()} />);
    expect(screen.getByText(/Alice\s*,\s*30/)).toBeTruthy();
  });
});
