/* eslint-disable */
import type React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TinderCardContent } from '@/components/TinderCardContent';
import type { UserProfile } from '@/app/page';

jest.useFakeTimers();

jest.mock('@/components/TinderCardLayout', () => ({
  TinderCardLayout: (props: any) => (
    <div data-testid="tinder-card-layout">
      <span>{props.profile.name}</span>
    </div>
  ),
}));

jest.mock('utils/tinder-card-handlers', () => ({
  handleStart: (clientX: number, clientY: number, setIsDragging: React.Dispatch<React.SetStateAction<boolean>>, setStartPos: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>) => {
    setIsDragging(true);
    setStartPos({ x: clientX, y: clientY });
  },
  handleMove: (
    clientX: number,
    clientY: number,
    isDragging: boolean,
    startPos: { x: number; y: number },
    setDragOffset: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>,
    cardRef: React.RefObject<HTMLElement>,
    setIsHidden: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (!isDragging) return;
    const deltaX = clientX - startPos.x;
    const deltaY = clientY - startPos.y;
    setDragOffset({ x: deltaX, y: deltaY });

    if (cardRef.current) {
      const cardWidth = cardRef.current.offsetWidth || 300;
      const threshold = cardWidth * 3;
      if (Math.abs(deltaX) > threshold) {
        setIsHidden(true);
      }
    }
  },
  handleEnd: (
    isDragging: boolean,
    dragOffset: { x: number; y: number },
    setIsDragging: React.Dispatch<React.SetStateAction<boolean>>,
    setDragOffset: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>,
    setIsHidden: React.Dispatch<React.SetStateAction<boolean>>,
    handleLike: () => void,
    handleDislike: () => void
  ) => {
    if (!isDragging) return;
    setIsDragging(false);

    const threshold = 100;
    if (Math.abs(dragOffset.x) > threshold) {
      const direction = dragOffset.x > 0 ? 'right' : 'left';
      const finalX = direction === 'right' ? 1000 : -1000;

      setDragOffset({ x: finalX, y: dragOffset.y });
      setIsHidden(true);

      setTimeout(() => {
        if (direction === 'right') {
          handleLike();
        } else {
          handleDislike();
        }
      }, 200);
    } else {
      setIsHidden(false);
      setDragOffset({ x: 0, y: 0 });
    }
  },
  handleMouseMove: (e: MouseEvent, memoizedHandleMove: (x: number, y: number) => void) => {
    memoizedHandleMove(e.clientX, e.clientY);
  },
  handleMouseUp: (memoizedHandleEnd: () => void) => {
    memoizedHandleEnd();
  },
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
    ...defaultProps,
    ...overrides,
  };

  render(<TinderCardContent {...props} />);
  return props;
};

describe('TinderCardContent (client version)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.useFakeTimers();
  });

  it('renders the TinderCardLayout', () => {
    setup();
    expect(screen.getByTestId('tinder-card-layout')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
  });

  it('shows Heart overlay when dragging right', () => {
    setup();
    const card = screen.getByTestId('tinder-card-content');

    // Start drag
    fireEvent.mouseDown(card, { clientX: 0, clientY: 0 });
    // Move right to show heart (> 30px)
    fireEvent.mouseMove(document, { clientX: 50, clientY: 0 });

    expect(screen.getByTestId('heart-overlay')).toBeInTheDocument();
    expect(screen.queryByTestId('x-overlay')).not.toBeInTheDocument();
  });

  it('shows X overlay when dragging left', () => {
    setup();
    const card = screen.getByTestId('tinder-card-content');

    // Start drag
    fireEvent.mouseDown(card, { clientX: 100, clientY: 0 });
    // Move left to show X (< -30px)
    fireEvent.mouseMove(document, { clientX: 50, clientY: 0 });

    expect(screen.getByTestId('x-overlay')).toBeInTheDocument();
    expect(screen.queryByTestId('heart-overlay')).not.toBeInTheDocument();
  });

  it('triggers handleLike on swipe right past threshold', () => {
    const props = setup();
    const card = screen.getByTestId('tinder-card-content');

    fireEvent.mouseDown(card, { clientX: 0, clientY: 0 });
    fireEvent.mouseMove(document, { clientX: 150, clientY: 0 }); // > 100 threshold
    fireEvent.mouseUp(document);

    jest.advanceTimersByTime(200);
    expect(props.handleLike).toHaveBeenCalledTimes(1);
    expect(props.handleDislike).not.toHaveBeenCalled();
  });

  it('triggers handleDislike on swipe left past threshold', () => {
    const props = setup();
    const card = screen.getByTestId('tinder-card-content');

    fireEvent.mouseDown(card, { clientX: 200, clientY: 0 });
    fireEvent.mouseMove(document, { clientX: 50, clientY: 0 }); // deltaX = -150, > 100 threshold
    fireEvent.mouseUp(document);

    jest.advanceTimersByTime(200);
    expect(props.handleDislike).toHaveBeenCalledTimes(1);
    expect(props.handleLike).not.toHaveBeenCalled();
  });
  it('handles touchStart correctly - covers touch extraction and handleStart call', () => {
    setup();
    const card = screen.getByTestId('tinder-card-content');

    // Test the touchStart handler - covers: const touch = e.touches[0]; handleStart(touch.clientX, touch.clientY, ...)
    fireEvent.touchStart(card, {
      touches: [{ clientX: 100, clientY: 200 }],
    });

    // Verify we can then move and see the overlay (indicating touchStart worked)
    fireEvent.touchMove(card, {
      touches: [{ clientX: 150, clientY: 200 }],
    });

    expect(screen.getByTestId('heart-overlay')).toBeInTheDocument();
  });

  it('handles touchMove correctly - covers touch extraction and memoizedHandleMove call', () => {
    setup();
    const card = screen.getByTestId('tinder-card-content');

    // Start touch
    fireEvent.touchStart(card, {
      touches: [{ clientX: 0, clientY: 0 }],
    });

    // Test touchMove handler - covers: const touch = e.touches[0]; memoizedHandleMove(touch.clientX, touch.clientY);
    fireEvent.touchMove(card, {
      touches: [{ clientX: 80, clientY: 10 }],
    });

    // Should show heart overlay for right swipe
    expect(screen.getByTestId('heart-overlay')).toBeInTheDocument();

    // Test left swipe
    fireEvent.touchMove(card, {
      touches: [{ clientX: -50, clientY: 10 }],
    });

    // Should show X overlay for left swipe
    expect(screen.getByTestId('x-overlay')).toBeInTheDocument();
  });

  it('handles touchEnd correctly - covers memoizedHandleEnd call', () => {
    const props = setup();
    const card = screen.getByTestId('tinder-card-content');

    // Start touch drag
    fireEvent.touchStart(card, {
      touches: [{ clientX: 0, clientY: 0 }],
    });

    // Move past threshold
    fireEvent.touchMove(card, {
      touches: [{ clientX: 150, clientY: 0 }],
    });

    // Test touchEnd handler - covers: memoizedHandleEnd();
    fireEvent.touchEnd(card);

    // Should trigger like after timeout
    jest.advanceTimersByTime(200);
    expect(props.handleLike).toHaveBeenCalledTimes(1);
  });

  it('handles touchEnd for left swipe', () => {
    const props = setup();
    const card = screen.getByTestId('tinder-card-content');

    // Touch swipe left
    fireEvent.touchStart(card, {
      touches: [{ clientX: 200, clientY: 0 }],
    });

    fireEvent.touchMove(card, {
      touches: [{ clientX: 50, clientY: 0 }],
    });

    fireEvent.touchEnd(card);

    jest.advanceTimersByTime(200);
    expect(props.handleDislike).toHaveBeenCalledTimes(1);
  });

  it('resets position on small touch drag', () => {
    const props = setup();
    const card = screen.getByTestId('tinder-card-content');

    // Small touch drag
    fireEvent.touchStart(card, {
      touches: [{ clientX: 0, clientY: 0 }],
    });

    fireEvent.touchMove(card, {
      touches: [{ clientX: 50, clientY: 0 }], // below 100px threshold
    });

    fireEvent.touchEnd(card);

    // Should not trigger any actions
    jest.advanceTimersByTime(200);
    expect(props.handleLike).not.toHaveBeenCalled();
    expect(props.handleDislike).not.toHaveBeenCalled();

    // Card should still be visible
    expect(screen.getByTestId('tinder-card-layout')).toBeInTheDocument();
  });

  it('component returns null when isHidden is true', () => {
    const props = setup();
    const card = screen.getByTestId('tinder-card-content');
    fireEvent.mouseDown(card, { clientX: 0, clientY: 0 });
    fireEvent.mouseMove(document, { clientX: 1000, clientY: 0 });
    fireEvent.mouseUp(document);
    jest.advanceTimersByTime(200);
    expect(screen.queryByTestId('tinder-card-content')).not.toBeInTheDocument();
  });
});
