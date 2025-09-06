/* eslint-disable max-lines*/
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TinderCardContent } from '@/components/TinderCardContent';
import type { UserProfile } from '@/app/page';

jest.mock('@/components/TinderCardLayout', () => ({
  TinderCardLayout: (props: any) => (
    <div data-testid="tinder-card-layout">
      <span>{props.profile.name}</span>
    </div>
  ),
}));

const mockProfile: UserProfile = {
  id: '1',
  name: 'Jane Doe',
  age: 29,
  images: ['img.jpg'],
  bio: 'Bio text',
  interests: [],
};
const defaultProps = {
  profile: mockProfile,
  images: ['image1.jpg'],
  currentImageIndex: 0,
  imageError: false,
  handleImageError: jest.fn(),
  nextImage: jest.fn(),
  prevImage: jest.fn(),
  handleLike: jest.fn(),
  handleDislike: jest.fn(),
};

const setup = (overrides = {}) => {
  const props = {
    profile: mockProfile,
    images: mockProfile.images,
    currentImageIndex: 0,
    imageError: false,
    handleImageError: jest.fn(),
    nextImage: jest.fn(),
    prevImage: jest.fn(),
    handleLike: jest.fn(),
    handleDislike: jest.fn(),
    ...overrides,
  };

  render(<TinderCardContent {...props} />);
  return props;
};

describe('TinderCardContent (client version)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the TinderCardLayout', () => {
    setup();
    expect(screen.getByTestId('tinder-card-layout')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
  });

  it('shows Heart icon when dragging right (like)', () => {
    render(<TinderCardContent {...defaultProps} />);

    const card = screen.getByTestId('tinder-card-content');

    // Start drag
    fireEvent.mouseDown(card, { clientX: 0, clientY: 0 });

    // Move mouse less than threshold to stay visible
    fireEvent.mouseMove(document, { clientX: 50, clientY: 0 }); // 50 < 100 threshold

    // Assert the card is still visible
    expect(screen.getByTestId('tinder-card-layout')).toBeInTheDocument();

    // Assert the Heart icon is shown (you can select by SVG or by className)
    const heartIcon = card.querySelector('svg');
    expect(heartIcon).toBeInTheDocument();

    // Finish drag to reset
    fireEvent.mouseUp(document);
  });

  it('shows X icon when dragging left (dislike)', () => {
    setup();

    const card = screen.getByTestId('tinder-card-layout').parentElement!.parentElement!;
    fireEvent.mouseDown(card, { clientX: 100, clientY: 0 });
    fireEvent.mouseMove(document, { clientX: 0, clientY: 0 });

    expect(screen.getByTestId('tinder-card-layout')).toBeInTheDocument();
    expect(screen.getByTestId('tinder-card-layout').parentElement?.querySelector('svg')).toBeInTheDocument(); // X icon shows
  });

  it('triggers handleLike on swipe right (drag > threshold)', () => {
    const props = setup();

    const card = screen.getByTestId('tinder-card-layout').parentElement!.parentElement!;
    fireEvent.mouseDown(card, { clientX: 0, clientY: 0 });
    fireEvent.mouseMove(document, { clientX: 200, clientY: 0 });
    fireEvent.mouseUp(document);

    jest.advanceTimersByTime(200);
    expect(props.handleLike).toHaveBeenCalled();
    expect(props.handleDislike).not.toHaveBeenCalled();
  });

  it('triggers handleDislike on swipe left (drag > threshold)', () => {
    const props = setup();

    const card = screen.getByTestId('tinder-card-layout').parentElement!.parentElement!;
    fireEvent.mouseDown(card, { clientX: 200, clientY: 0 });
    fireEvent.mouseMove(document, { clientX: 0, clientY: 0 });
    fireEvent.mouseUp(document);

    jest.advanceTimersByTime(200);
    expect(props.handleDislike).toHaveBeenCalled();
    expect(props.handleLike).not.toHaveBeenCalled();
  });

  it('resets dragOffset on small drag', () => {
    const props = setup();

    const card = screen.getByTestId('tinder-card-layout').parentElement!.parentElement!;
    fireEvent.mouseDown(card, { clientX: 0, clientY: 0 });
    fireEvent.mouseMove(document, { clientX: 50, clientY: 0 }); // below threshold
    fireEvent.mouseUp(document);

    // Should not call any handler
    expect(props.handleLike).not.toHaveBeenCalled();
    expect(props.handleDislike).not.toHaveBeenCalled();

    // Card should still be visible
    expect(screen.getByTestId('tinder-card-layout')).toBeInTheDocument();
  });

  it('returns null when isHidden is true (big drag)', () => {
    const props = setup();

    const card = screen.getByTestId('tinder-card-layout').parentElement!.parentElement!;
    fireEvent.mouseDown(card, { clientX: 0, clientY: 0 });
    fireEvent.mouseMove(document, { clientX: 1000, clientY: 0 }); // way over threshold
    fireEvent.mouseUp(document);

    jest.advanceTimersByTime(200);

    // Since isHidden is set, component should disappear
    expect(screen.queryByTestId('tinder-card-layout')).not.toBeInTheDocument();
  });
});
