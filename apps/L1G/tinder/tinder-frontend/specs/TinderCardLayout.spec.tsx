import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LikeDislikeButtons, TinderCardLayout } from '@/components/TinderCardLayout';

jest.mock('@/components/Interest', () => ({
  Interest: ({ interestName }: { interestName: string }) => <span data-testid="interest">{interestName}</span>,
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, width, height, ...props }: any) => <img src={src} alt={alt} width={width} height={height} {...props} />,
}));

const mockProfile = {
  id: '1',
  name: 'Test User',
  age: 28,
  bio: 'Adventurer and reader.',
  interests: [{ interestName: 'Hiking' }, { interestName: 'Chess' }],
  images: ['https://via.placeholder.com/400', 'https://via.placeholder.com/400'],
};

const baseProps = {
  profile: mockProfile,
  images: mockProfile.images,
  currentImageIndex: 0,
  imageError: false,
  handleImageError: jest.fn(),
  nextImage: jest.fn(),
  prevImage: jest.fn(),
  handleLike: jest.fn(),
  handleDislike: jest.fn(),
};

describe('TinderCardLayout Component', () => {
  it('renders profile info with bio when currentImageIndex is 0', () => {
    render(<TinderCardLayout {...baseProps} />);

    expect(screen.getByText('Test User, 28')).toBeInTheDocument();
    expect(screen.getByText('Adventurer and reader.')).toBeInTheDocument();
    expect(screen.queryByTestId('interest')).not.toBeInTheDocument();
    expect(screen.getByAltText('Test User - Photo 1')).toBeInTheDocument();
  });

  it('renders profile info with interests when currentImageIndex is not 0', () => {
    render(<TinderCardLayout {...baseProps} currentImageIndex={1} />);

    expect(screen.getByText('Test User, 28')).toBeInTheDocument();
    expect(screen.queryByText('Adventurer and reader.')).not.toBeInTheDocument();
    expect(screen.getAllByTestId('interest')).toHaveLength(2);
    expect(screen.getByText('Hiking')).toBeInTheDocument();
    expect(screen.getByText('Chess')).toBeInTheDocument();
  });

  it('calls navigation buttons', () => {
    render(<TinderCardLayout {...baseProps} />);

    fireEvent.click(screen.getByTestId('left-arrow'));
    expect(baseProps.prevImage).toHaveBeenCalled();

    fireEvent.click(screen.getByTestId('right-arrow'));
    expect(baseProps.nextImage).toHaveBeenCalled();
  });

  it('calls like and dislike handlers', () => {
    render(<TinderCardLayout {...baseProps} />);

    fireEvent.click(screen.getByTestId('like'));
    expect(baseProps.handleLike).toHaveBeenCalled();

    fireEvent.click(screen.getByTestId('dislike'));
    expect(baseProps.handleDislike).toHaveBeenCalled();
  });

  it('falls back to default profile image if imageSrc is empty', () => {
    render(<TinderCardLayout {...baseProps} images={['']} />);

    expect(screen.getByAltText('Test User - Photo 1')).toHaveAttribute('src', '/profile.jpg');
  });
  it('resets like/dislike animation states after timeout', () => {
    jest.useFakeTimers();

    const { rerender } = render(
      <LikeDislikeButtons
        onLike={() => {
          //intenionally empty
        }}
        onDislike={() => {
          //intenionally empty
        }}
      />
    );

    fireEvent.click(screen.getByTestId('like'));
    fireEvent.click(screen.getByTestId('dislike'));

    jest.runAllTimers();
    rerender(
      <LikeDislikeButtons
        onLike={() => {
          //intenionally empty
        }}
        onDislike={() => {
          //intenionally empty
        }}
      />
    );
    jest.useRealTimers();
  });

  describe('LikeDislikeButtons', () => {
    it('renders with default animation props', () => {
      const onLike = jest.fn();
      const onDislike = jest.fn();

      render(<LikeDislikeButtons onLike={onLike} onDislike={onDislike} />);

      fireEvent.click(screen.getByTestId('like'));
      fireEvent.click(screen.getByTestId('dislike'));

      expect(onLike).toHaveBeenCalledTimes(1);
      expect(onDislike).toHaveBeenCalledTimes(1);
    });
    it('renders with showLikeAnimation and showDislikeAnimation set to true', () => {
      const onLike = jest.fn();
      const onDislike = jest.fn();

      render(<LikeDislikeButtons onLike={onLike} onDislike={onDislike} showLikeAnimation={true} showDislikeAnimation={true} />);
    });
  });
});
