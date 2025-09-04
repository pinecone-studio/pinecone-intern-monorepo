import TinderCard from '@/components/TinderCard';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

const mockProfile = {
  id: '1',
  name: 'Test User',
  age: 25,
  images: ['https://via.placeholder.com/400'],
  interests: ['reading'],
};

describe('TinderCard image navigation and fallback behavior', () => {
  it('navigates through images using next and previous buttons', () => {
    const multiImageProfile = {
      ...mockProfile,
      images: ['https://via.placeholder.com/400', 'https://via.placeholder.com/401'],
    };
    render(<TinderCard profile={multiImageProfile} onLike={jest.fn()} onDislike={jest.fn()} />);
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
    render(<TinderCard profile={brokenProfile} onLike={jest.fn()} onDislike={jest.fn()} />);
    const image = screen.queryByRole('img');
    expect(image !== null).toBe(true);
    expect(image && image.src.includes('/profile.jpg')).toBe(true);
  });

  it('displays fallback image when image fails to load', () => {
    render(<TinderCard profile={mockProfile} onLike={jest.fn()} onDislike={jest.fn()} />);
    const image = screen.getByRole('img') as HTMLImageElement;
    fireEvent.error(image);
    expect(image.src.includes('/profile.jpg')).toBe(false);
  });

  it('does not render navigation buttons when only one image exists', () => {
    render(<TinderCard profile={mockProfile} onLike={jest.fn()} onDislike={jest.fn()} />);
    expect(screen.queryByTestId('left-arrow')).toBeNull();
    expect(screen.queryByTestId('right-arrow')).toBeNull();
  });

  it('does not render navigation buttons when images array is empty', () => {
    const profileWithEmptyImages = { ...mockProfile, images: [] };
    render(<TinderCard profile={profileWithEmptyImages} onLike={jest.fn()} onDislike={jest.fn()} />);
    expect(screen.queryByTestId('left-arrow')).toBeNull();
    expect(screen.queryByTestId('right-arrow')).toBeNull();
  });

  it('does not render navigation buttons when images is undefined', () => {
    const profileWithUndefinedImages = { ...mockProfile, images: undefined };
    render(<TinderCard profile={profileWithUndefinedImages} onLike={jest.fn()} onDislike={jest.fn()} />);
    expect(screen.queryByTestId('left-arrow')).toBeNull();
    expect(screen.queryByTestId('right-arrow')).toBeNull();
  });
});
