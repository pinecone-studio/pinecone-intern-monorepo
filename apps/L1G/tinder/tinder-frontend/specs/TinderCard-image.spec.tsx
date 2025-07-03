import { TinderCard } from '@/components/TinderCard';
import { render, fireEvent, screen } from '@testing-library/react';

describe('TinderCard image navigation and fallback behavior', () => {
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
    expect(image && image.src.includes('/gray.jpeg')).toBe(true);
  });

  it('displays fallback image when image fails to load', () => {
    render(<TinderCard profile={mockProfile} onLike={jest.fn()} onDislike={jest.fn()} />);
    const image = screen.getByRole('img') as HTMLImageElement;

    fireEvent.error(image);

    expect(image.src.includes('/gray.jpeg')).toBe(true);
  });

  it('falls back to placeholder when images array is empty or undefined', () => {
    const brokenProfileEmpty = { ...mockProfile, images: [] };
    render(<TinderCard profile={brokenProfileEmpty} onLike={jest.fn()} onDislike={jest.fn()} />);

    const images1 = screen.getAllByRole('img');
    expect(images1[0] !== null).toBe(true);
    expect(images1[0].src.includes('/gray.jpeg')).toBe(true);

    const brokenProfileUndefined = { ...mockProfile, images: undefined };
    render(<TinderCard profile={brokenProfileUndefined} onLike={jest.fn()} onDislike={jest.fn()} />);

    const images2 = screen.getAllByRole('img');
    expect(images2[0] !== null).toBe(true);
    expect(images2[0].src.includes('/gray.jpeg')).toBe(true);
  });

  it('wraps to first image after last in nextImage and to last image before first in prevImage', () => {
    const multiImageProfile = {
      ...mockProfile,
      images: ['https://via.placeholder.com/400', 'https://via.placeholder.com/401'],
    };

    render(<TinderCard profile={multiImageProfile} onLike={jest.fn()} onDislike={jest.fn()} />);

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
    render(<TinderCard profile={mockProfile} onLike={jest.fn()} onDislike={jest.fn()} />);

    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(2);
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

  it('does not render navigation buttons when there is exactly one real image', () => {
    const profileWithOneImage = { ...mockProfile, images: ['https://via.placeholder.com/400'] };
    render(<TinderCard profile={profileWithOneImage} onLike={jest.fn()} onDislike={jest.fn()} />);
    expect(screen.queryByTestId('left-arrow')).toBeNull();
    expect(screen.queryByTestId('right-arrow')).toBeNull();
  });
});
