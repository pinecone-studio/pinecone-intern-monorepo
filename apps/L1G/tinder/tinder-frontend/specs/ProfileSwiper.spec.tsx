/* eslint-disable react/display-name */
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

  it('calls onDislike with the correct profile id', () => {
    const onDislike = jest.fn();

    render(
      <ProfileSwiper
        profiles={mockProfiles}
        currentIndex={1}
        onLike={() => {
          //intentionally empty
        }}
        onDislike={onDislike}
      />
    );

    fireEvent.click(screen.getByTestId('dislike-button'));
    expect(onDislike).toHaveBeenCalledWith('2');
  });

  it('calls onLike with correct profile id and profile data', () => {
    const onLike = jest.fn();

    render(
      <ProfileSwiper
        profiles={mockProfiles}
        currentIndex={0}
        onLike={onLike}
        onDislike={() => {
          //intentionally empty
        }}
      />
    );

    fireEvent.click(screen.getByTestId('like-button'));
    expect(onLike).toHaveBeenCalledWith('1', mockProfiles[0]);
  });

  it('renders fallback message if profiles array is empty', () => {
    render(
      <ProfileSwiper
        profiles={[]}
        currentIndex={0}
        onLike={() => {
          //intentionally empty
        }}
        onDislike={() => {
          //intentionally empty
        }}
      />
    );

    expect(screen.getByText('No more profiles'));
  });
});
