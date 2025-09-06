import { render, screen } from '@testing-library/react';
import { CardWithImageAndInfo, LikeDislikeButtons } from '@/components/TinderCardParts';
import '@testing-library/jest-dom';

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
  age: 25,
  bio: 'my bio',
  interests: [{ interestName: 'reading' }, { interestName: 'hiking' }],
  images: ['https://via.placeholder.com/400'],
};

const defaultProps = {
  profile: mockProfile,
  images: ['https://via.placeholder.com/400'],
  currentImageIndex: 0,
  imageError: false,
  handleImageError: jest.fn(),
  nextImage: jest.fn(),
  prevImage: jest.fn(),
};

describe('CardWithImageAndInfo Component - ProfileInfo', () => {
  it('shows name, age, and interests when user has only one image', () => {
    render(<CardWithImageAndInfo {...defaultProps} />);

    expect(screen.getByText('Test User, 25')).toBeInTheDocument();
    expect(screen.getAllByTestId('interest')).toHaveLength(2);
    expect(screen.queryByText('my bio')).not.toBeInTheDocument();
    expect(screen.queryByTestId('left-arrow')).not.toBeInTheDocument();
    expect(screen.queryByTestId('right-arrow')).not.toBeInTheDocument();
  });

  it('shows name, age, and bio when user has multiple images and currentImageIndex is 0', () => {
    render(<CardWithImageAndInfo {...defaultProps} images={['https://via.placeholder.com/400', 'https://via.placeholder.com/400']} currentImageIndex={0} />);

    expect(screen.getByText('Test User, 25')).toBeInTheDocument();
    expect(screen.getByText('my bio')).toBeInTheDocument();
    expect(screen.queryByTestId('interest')).not.toBeInTheDocument();
    expect(screen.getByTestId('left-arrow')).toBeInTheDocument();
    expect(screen.getByTestId('right-arrow')).toBeInTheDocument();
  });

  it('shows name, age, and interests when user has multiple images and currentImageIndex is not 0', () => {
    render(<CardWithImageAndInfo {...defaultProps} images={['https://via.placeholder.com/400', 'https://via.placeholder.com/400']} currentImageIndex={1} />);

    expect(screen.getByText('Test User, 25')).toBeInTheDocument();
    expect(screen.getAllByTestId('interest')).toHaveLength(2);
    expect(screen.queryByText('my bio')).not.toBeInTheDocument();
    expect(screen.getByTestId('left-arrow')).toBeInTheDocument();
    expect(screen.getByTestId('right-arrow')).toBeInTheDocument();

    expect(screen.getByText('reading')).toBeInTheDocument();
    expect(screen.getByText('hiking')).toBeInTheDocument();
  });

  it('shows name, age, and interests when viewing third image', () => {
    const threeImages = ['https://via.placeholder.com/400', 'https://via.placeholder.com/400', 'https://via.placeholder.com/400'];

    render(<CardWithImageAndInfo {...defaultProps} images={threeImages} currentImageIndex={2} />);

    expect(screen.getByText('Test User, 25')).toBeInTheDocument();
    expect(screen.getAllByTestId('interest')).toHaveLength(2);
    expect(screen.queryByText('my bio')).not.toBeInTheDocument();
  });

  it('handles missing name and age with fallbacks', () => {
    const profileWithMissingData = {
      ...mockProfile,
      name: undefined,
      age: undefined,
    };

    render(<CardWithImageAndInfo {...defaultProps} profile={profileWithMissingData} />);

    expect(screen.getByText('Unknown,')).toBeInTheDocument();
    expect(screen.getAllByTestId('interest')).toHaveLength(2);
    expect(screen.queryByText('my bio')).not.toBeInTheDocument();
  });

  it('handles undefined or empty interests with fallback', () => {
    const profileWithNoInterests = {
      ...mockProfile,
      interests: undefined,
    };

    render(<CardWithImageAndInfo {...defaultProps} profile={profileWithNoInterests} />);

    expect(screen.getByText('Test User, 25')).toBeInTheDocument();
    expect(screen.queryByTestId('interest')).not.toBeInTheDocument();
    expect(screen.queryByText('my bio')).not.toBeInTheDocument();
  });

  it('handles empty interests array', () => {
    const profileWithEmptyInterests = {
      ...mockProfile,
      interests: [],
    };

    render(<CardWithImageAndInfo {...defaultProps} profile={profileWithEmptyInterests} />);

    expect(screen.getByText('Test User, 25')).toBeInTheDocument();
    expect(screen.queryByTestId('interest')).not.toBeInTheDocument();
    expect(screen.queryByText('my bio')).not.toBeInTheDocument();
  });

  it('renders ProfileImageDisplay with imageError true', () => {
    render(<CardWithImageAndInfo {...defaultProps} imageError={true} />);

    expect(screen.getByText('Test User, 25')).toBeInTheDocument();
    expect(screen.getByAltText('Test User - Photo 1')).toBeInTheDocument();
  });

  it('renders ProfileImageDisplay with imageError false', () => {
    render(<CardWithImageAndInfo {...defaultProps} imageError={false} />);

    expect(screen.getByText('Test User, 25')).toBeInTheDocument();
    expect(screen.getByAltText('Test User - Photo 1')).toBeInTheDocument();
  });
  it('renders default image when imageSrc is empty', () => {
    const profileWithNoImage = {
      ...mockProfile,
      images: [''], // empty image string
    };

    render(<CardWithImageAndInfo {...defaultProps} profile={profileWithNoImage} images={['']} />);

    const image = screen.getByRole('img'); // from mocked next/image
    expect(image).toHaveAttribute('src', '/profile.jpg');
  });
});

describe('LikeDislikeButtons Component', () => {
  it('renders like and dislike buttons', () => {
    const mockOnLike = jest.fn();
    const mockOnDislike = jest.fn();

    render(<LikeDislikeButtons onLike={mockOnLike} onDislike={mockOnDislike} />);

    expect(screen.getByTestId('like')).toBeInTheDocument();
    expect(screen.getByTestId('dislike')).toBeInTheDocument();
  });
  it('calls onLike and onDislike handlers when buttons are clicked', () => {
    const mockOnLike = jest.fn();
    const mockOnDislike = jest.fn();

    render(<LikeDislikeButtons onLike={mockOnLike} onDislike={mockOnDislike} />);

    const likeButton = screen.getByTestId('like');
    const dislikeButton = screen.getByTestId('dislike');

    likeButton.click();
    dislikeButton.click();

    expect(mockOnLike).toHaveBeenCalledTimes(1);
    expect(mockOnDislike).toHaveBeenCalledTimes(1);
  });
});
