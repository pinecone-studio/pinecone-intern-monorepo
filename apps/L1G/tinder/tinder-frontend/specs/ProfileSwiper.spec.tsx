import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { UserProfile } from '@/app/page';
import ProfileSwiper from '@/components/ProfileSwiper';

jest.mock('@/components/TinderCard', () => {
  return ({ profile, onLike, onDislike }: any) => (
    <div>
      <div data-testid="profile-name">{profile.name}</div>
      <button data-testid="like-button" onClick={onLike}>
        Like
      </button>
      <button data-testid="dislike-button" onClick={onDislike}>
        Dislike
      </button>
    </div>
  );
});

describe('ProfileSwiper', () => {
  const mockProfiles: UserProfile[] = [
    { id: '1', name: 'Alice', images: [] },
    { id: '2', name: 'Bob', images: [] },
  ];

  it('renders the current profile with TinderCard', () => {
    render(<ProfileSwiper profiles={mockProfiles} currentIndex={0} onLike={() => {}} onDislike={() => {}} />);

    expect(screen.getByTestId('profile-name'));
  });

  it('shows "No more profiles" message when currentIndex is out of bounds', () => {
    render(<ProfileSwiper profiles={mockProfiles} currentIndex={mockProfiles.length} onLike={() => {}} onDislike={() => {}} />);
    expect(screen.getByText('No more profiles'));
  });

  it('calls onLike with the correct profile id', () => {
    const onLike = jest.fn();
    render(<ProfileSwiper profiles={mockProfiles} currentIndex={0} onLike={onLike} onDislike={() => {}} />);

    fireEvent.click(screen.getByTestId('like-button'));
    expect(onLike).toHaveBeenCalledWith('1');
  });

  it('calls onDislike with the correct profile id', () => {
    const onDislike = jest.fn();
    render(<ProfileSwiper profiles={mockProfiles} currentIndex={1} onLike={() => {}} onDislike={onDislike} />);

    fireEvent.click(screen.getByTestId('dislike-button'));
    expect(onDislike).toHaveBeenCalledWith('2');
  });
});
