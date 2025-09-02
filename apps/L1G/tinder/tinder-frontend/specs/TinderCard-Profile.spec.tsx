import TinderCard from '@/components/TinderCard';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

const mockProfile = {
  id: '1',
  name: 'Test User',
  age: 25,
  images: ['https://via.placeholder.com/400', 'https://via.placeholder.com/401'],
};
jest.mock('react-tinder-card', () => {
  const MockTinderCard = ({ children, onSwipe, ...rest }: any) => (
    <div data-testid="tinder-card" {...rest}>
      <button data-testid="swipe-left" onClick={() => onSwipe('left')}>
        Swipe Left
      </button>
      <button data-testid="swipe-right" onClick={() => onSwipe('right')}>
        Swipe Right
      </button>
      {children}
    </div>
  );
  MockTinderCard.displayName = 'MockTinderCard';
  return MockTinderCard;
});

describe('TinderCard profile info and button behavior', () => {
  it('renders profile name and age if age is present', () => {
    render(<TinderCard profile={mockProfile} onLike={jest.fn()} onDislike={jest.fn()} />);
    expect(screen.getByText(/Test User/));
    expect(screen.getByText(/25/));
  });

  it('renders profile name without age if age is undefined', () => {
    const profileWithoutAge = { ...mockProfile, age: undefined };
    render(<TinderCard profile={profileWithoutAge} onLike={jest.fn()} onDislike={jest.fn()} />);
    expect(screen.getByText(/Test User/));
    expect(screen.queryByText(/25/)).toBeNull();
  });

  it('calls onLike when like button is clicked', async () => {
    const onLike = jest.fn();
    render(<TinderCard profile={mockProfile} onLike={onLike} onDislike={jest.fn()} />);
    fireEvent.click(screen.getByTestId('like'));
    await waitFor(() => expect(onLike).toHaveBeenCalledTimes(1));
  });

  it('calls onDislike when dislike button is clicked', async () => {
    const onDislike = jest.fn();
    render(<TinderCard profile={mockProfile} onLike={jest.fn()} onDislike={onDislike} />);
    fireEvent.click(screen.getByTestId('dislike'));
    await waitFor(() => expect(onDislike).toHaveBeenCalledTimes(1));
  });

  it('renders nothing if profile is undefined', () => {
    render(<TinderCard profile={undefined} onLike={jest.fn()} onDislike={jest.fn()} />);
    expect(screen.queryByRole('img')).toBeNull();
    expect(screen.queryByText(/Test User/)).toBeNull();
  });

  it('wraps to first image after last in nextImage', () => {
    render(<TinderCard profile={mockProfile} onLike={jest.fn()} onDislike={jest.fn()} />);
    fireEvent.click(screen.getByTestId('right-arrow'));
    fireEvent.click(screen.getByTestId('right-arrow'));
    const image = screen.getByRole('img') as HTMLImageElement;
    expect(image.src.includes('400')).toBe(true);
  });

  it('wraps to last image before first in prevImage', () => {
    render(<TinderCard profile={mockProfile} onLike={jest.fn()} onDislike={jest.fn()} />);
    fireEvent.click(screen.getByTestId('left-arrow'));
    const image = screen.getByRole('img') as HTMLImageElement;
    expect(image.src.includes('401')).toBe(true);
  });

  it('renders fallback name and age if missing', () => {
    const profileNoName = { ...mockProfile, name: undefined, age: undefined };
    render(<TinderCard profile={profileNoName} onLike={jest.fn()} onDislike={jest.fn()} />);
    expect(screen.getByText(/Unknown/));
  });

  it('swipes right triggers onLike', async () => {
    const onLike = jest.fn();
    render(<TinderCard profile={mockProfile} onLike={onLike} onDislike={jest.fn()} />);
    fireEvent.click(screen.getByTestId('swipe-right'));
    await waitFor(() => expect(onLike).toHaveBeenCalledWith('1'));
  });

  it('swipes left triggers onDislike', async () => {
    const onDislike = jest.fn();
    render(<TinderCard profile={mockProfile} onLike={jest.fn()} onDislike={onDislike} />);
    fireEvent.click(screen.getByTestId('swipe-left'));
    await waitFor(() => expect(onDislike).toHaveBeenCalledWith('1'));
  });

  it('enables pointer events on touch start and disables on touch end', () => {
    render(<TinderCard profile={mockProfile} onLike={jest.fn()} onDislike={jest.fn()} />);
    const wrapper = screen.getByTestId('tinder-card-wrapper');

    // Initially disabled
    expect(wrapper).toHaveStyle({ pointerEvents: 'none' });

    // Touch start → enables
    fireEvent.touchStart(wrapper);
    expect(wrapper).toHaveStyle({ pointerEvents: 'auto' });

    // Touch end → disables again
    fireEvent.touchEnd(wrapper);
    expect(wrapper).toHaveStyle({ pointerEvents: 'none' });
  });
});
