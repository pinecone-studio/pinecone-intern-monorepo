/* eslint-disable max-lines*/
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TinderCardContent } from '@/components/TinderCardContent';
import type { UserProfile } from '@/app/page';
import TinderCard from '@/components/TinderCard';

const mockMotionDiv = jest.fn();
jest.mock('framer-motion', () => ({
  motion: {
    div: (props: any) => {
      mockMotionDiv(props);
      return (
        <div data-testid="motion-div" {...props}>
          {props.children}
        </div>
      );
    },
  },
}));

// Mock react-tinder-card
let mockOnSwipe: ((_direction: string) => void) | undefined;
jest.mock('react-tinder-card', () => {
  const MockTinderCard = ({ children, onSwipe, ...props }: any) => {
    // Store the onSwipe callback so we can call it in tests
    mockOnSwipe = onSwipe;
    // Filter out non-DOM props to avoid warnings
    const { preventSwipe, swipeRequirementType, swipeThreshold, ...domProps } = props;
    return (
      <div data-testid="tinder-card" {...domProps}>
        {children}
      </div>
    );
  };
  return MockTinderCard;
});

// Mock TinderCardLayout
jest.mock('@/components/TinderCardLayout', () => ({
  TinderCardLayout: ({ profile }: any) => (
    <div data-testid="tinder-card-layout">
      <span>{profile.name}</span>
    </div>
  ),
}));

const mockProfile: UserProfile = {
  id: '1',
  name: 'John Doe',
  age: 25,
  images: ['image1.jpg'],
  bio: 'Test bio',
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
  direction: null as 'left' | 'right' | null,
};

describe('TinderCardContent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render with left direction exit animation - covers lines 35-37', () => {
    render(<TinderCardContent {...defaultProps} direction="left" />);

    expect(mockMotionDiv).toHaveBeenCalledWith(
      expect.objectContaining({
        exit: expect.objectContaining({
          x: -500,
          opacity: 0,
          rotate: -15,
          transition: { duration: 0.3 },
        }),
      })
    );

    expect(screen.getByTestId('motion-div')).toBeInTheDocument();
    expect(screen.getByTestId('tinder-card-layout')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('should render with right direction exit animation - covers lines 35-37', () => {
    render(<TinderCardContent {...defaultProps} direction="right" />);

    expect(mockMotionDiv).toHaveBeenCalledWith(
      expect.objectContaining({
        exit: expect.objectContaining({
          x: 500,
          opacity: 0,
          rotate: 15,
          transition: { duration: 0.3 },
        }),
      })
    );

    expect(screen.getByTestId('motion-div')).toBeInTheDocument();
    expect(screen.getByTestId('tinder-card-layout')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('should render with null direction - covers lines 35-37', () => {
    render(<TinderCardContent {...defaultProps} direction={null} />);

    // When direction is null, exit defaults to right direction (x: 500, rotate: 15)
    expect(mockMotionDiv).toHaveBeenCalledWith(
      expect.objectContaining({
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        exit: expect.objectContaining({
          x: 500,
          opacity: 0,
          rotate: 15,
          transition: { duration: 0.3 },
        }),
      })
    );

    expect(screen.getByTestId('motion-div')).toBeInTheDocument();
    expect(screen.getByTestId('tinder-card-layout')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('should render with initial and animate properties', () => {
    render(<TinderCardContent {...defaultProps} direction="right" />);

    expect(mockMotionDiv).toHaveBeenCalledWith(
      expect.objectContaining({
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
      })
    );
  });
});

describe('TinderCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockOnSwipe = undefined;
  });

  it('should return null when profile is null - covers line 44', () => {
    const props = {
      profile: null,
      onLike: jest.fn(),
      onDislike: jest.fn(),
    };
    const { container } = render(<TinderCard {...props} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('should call onLike when swiping right', () => {
    const mockOnLike = jest.fn();
    const mockOnDislike = jest.fn();

    render(<TinderCard profile={mockProfile} onLike={mockOnLike} onDislike={mockOnDislike} />);

    // Simulate right swipe
    if (mockOnSwipe) {
      mockOnSwipe('right');
    }

    expect(mockOnLike).toHaveBeenCalledWith('1');
    expect(mockOnDislike).not.toHaveBeenCalled();
  });

  it('should call onDislike when swiping left - covers the missing line', () => {
    const mockOnLike = jest.fn();
    const mockOnDislike = jest.fn();

    render(<TinderCard profile={mockProfile} onLike={mockOnLike} onDislike={mockOnDislike} />);

    // Simulate left swipe
    if (mockOnSwipe) {
      mockOnSwipe('left');
    }

    expect(mockOnDislike).toHaveBeenCalledWith('1');
    expect(mockOnLike).not.toHaveBeenCalled();
  });

  it('should not call any callback for unsupported swipe directions', () => {
    const mockOnLike = jest.fn();
    const mockOnDislike = jest.fn();

    render(<TinderCard profile={mockProfile} onLike={mockOnLike} onDislike={mockOnDislike} />);

    // Simulate up swipe (unsupported)
    if (mockOnSwipe) {
      mockOnSwipe('up');
    }

    expect(mockOnLike).not.toHaveBeenCalled();
    expect(mockOnDislike).not.toHaveBeenCalled();
  });

  it('should render TinderCardContent with correct props', () => {
    render(<TinderCard profile={mockProfile} onLike={jest.fn()} onDislike={jest.fn()} />);

    expect(screen.getByTestId('tinder-card-layout')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});
