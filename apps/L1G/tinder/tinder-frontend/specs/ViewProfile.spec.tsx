/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable complexity */
import ViewProfile from '@/components/ViewProfile';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, className, ...props }) => (
    <button onClick={onClick} className={className} {...props}>
      {children}
    </button>
  ),
}));

jest.mock('@/components/ui/dialog', () => {
  const React = require('react');
  const { useState, useContext, createContext } = React;

  const DialogContext = createContext({
    open: false,
    setOpen: () => {
      // intentionally empty
    },
  });

  const Dialog = ({ children }) => {
    const [open, setOpen] = useState(false);
    return (
      <DialogContext.Provider value={{ open, setOpen }}>
        <div>{children}</div>
      </DialogContext.Provider>
    );
  };

  const DialogTrigger = ({ children, asChild }) => {
    const { setOpen } = useContext(DialogContext);
    
    if (asChild) {
      return React.cloneElement(children, {
        onClick: () => setOpen(true),
        'data-testid': 'dialog-trigger'
      });
    }
    
    return (
      <button onClick={() => setOpen(true)} data-testid="dialog-trigger">
        {children}
      </button>
    );
  };

  const DialogContent = ({ children, className }) => {
    const { open } = useContext(DialogContext);
    if (!open) return null;
    return <div className={className} data-testid="dialog-content">{children}</div>;
  };

  return {
    Dialog,
    DialogContent,
    DialogTrigger,
  };
});

jest.mock('@/components/TinderCardLayout', () => ({
  CardWithImageAndInfo: ({ profile, images, currentImageIndex, imageError, handleImageError, nextImage, prevImage }) => (
    <div data-testid="card-with-image-and-info">
      <img 
        src={images[currentImageIndex]} 
        alt={`${profile.name || 'User'} - profile image ${currentImageIndex + 1}`}
        data-testid="profile-image"
        onError={handleImageError}
      />
      <div>
        <h2>{profile.name}, {profile.age}</h2>
        <p>{profile.profession}</p>
        {profile.interests && profile.interests.length > 0 && (
          <div data-testid="interests">
            {profile.interests.map(interest => (
              <span key={interest._id} data-testid="interest-item">{interest.interestName}</span>
            ))}
          </div>
        )}
      </div>
      {images.length > 1 && (
        <>
          <button onClick={prevImage} data-testid="prev">←</button>
          <button onClick={nextImage} data-testid="next">→</button>
        </>
      )}
      {imageError && <div data-testid="image-error">Image failed to load</div>}
    </div>
  ),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, width, height, className }) => (
    <img src={src} alt={alt} width={width} height={height} className={className} data-testid="mocked-next-image" />
  ),
}));

jest.mock('lucide-react', () => ({
  User: () => <span data-testid="user-icon">👤</span>,
}));

describe('ViewProfile', () => {
  const mockUser = {
    id: 1,
    name: 'John Doe',
    age: 25,
    profession: 'Engineer',
    images: ['/img1.jpg', '/img2.jpg', '/img3.jpg'],
    interests: [
      { _id: '1', interestName: 'Reading' },
      { _id: '2', interestName: 'Hiking' },
      { _id: '3', interestName: 'Photography' },
    ],
  };

  const userWithEmptyInterests = {
    ...mockUser,
    interests: [
      { _id: '1', interestName: 'Reading' },
      { _id: '2', interestName: '' }, // Empty interest name
      { _id: '3', interestName: 'Photography' },
    ],
  };

  const userWithMissingInterests = {
    ...mockUser,
    interests: undefined,
  };

  const singleUser = { ...mockUser, images: ['/single.jpg'] };
  const emptyUser = { ...mockUser, images: [] };

  it('renders View Profile button and user icon', () => {
    render(<ViewProfile user={mockUser} />);
    expect(screen.getByText('View Profile')).toBeInTheDocument();
    expect(screen.getByTestId('user-icon')).toBeInTheDocument();
  });

  it('opens dialog and displays first image and user info', () => {
    render(<ViewProfile user={mockUser} />);
    fireEvent.click(screen.getByTestId('dialog-trigger'));

    expect(screen.getByText('John Doe, 25')).toBeInTheDocument();
    expect(screen.getByText('Engineer')).toBeInTheDocument();
    
    // Check interests are displayed
    expect(screen.getByText('Reading')).toBeInTheDocument();
    expect(screen.getByText('Hiking')).toBeInTheDocument();
    expect(screen.getByText('Photography')).toBeInTheDocument();

    const img = screen.getByTestId('profile-image');
    expect(img).toHaveAttribute('src', '/img1.jpg');
    expect(img).toHaveAttribute('alt', 'John Doe - profile image 1');
  });

  it('filters out empty interest names', () => {
    render(<ViewProfile user={userWithEmptyInterests} />);
    fireEvent.click(screen.getByTestId('dialog-trigger'));

    // Should only display non-empty interests
    expect(screen.getByText('Reading')).toBeInTheDocument();
    expect(screen.getByText('Photography')).toBeInTheDocument();
    
    // Check that only 2 interest items are rendered (empty one filtered out)
    const interestItems = screen.getAllByTestId('interest-item');
    expect(interestItems).toHaveLength(2);
  });

  it('handles missing interests array', () => {
    render(<ViewProfile user={userWithMissingInterests} />);
    fireEvent.click(screen.getByTestId('dialog-trigger'));

    expect(screen.queryByTestId('interests')).not.toBeInTheDocument();
  });

  it('shows navigation buttons for multiple images', () => {
    render(<ViewProfile user={mockUser} />);
    fireEvent.click(screen.getByTestId('dialog-trigger'));

    expect(screen.getByTestId('prev')).toBeInTheDocument();
    expect(screen.getByTestId('next')).toBeInTheDocument();
  });

  it('hides navigation for single image', () => {
    render(<ViewProfile user={singleUser} />);
    fireEvent.click(screen.getByTestId('dialog-trigger'));

    expect(screen.queryByTestId('prev')).not.toBeInTheDocument();
    expect(screen.queryByTestId('next')).not.toBeInTheDocument();
  });

  it('navigates between images using next and prev', () => {
    render(<ViewProfile user={mockUser} />);
    fireEvent.click(screen.getByTestId('dialog-trigger'));

    const img = screen.getByTestId('profile-image');
    const nextBtn = screen.getByTestId('next');
    const prevBtn = screen.getByTestId('prev');

    // Initially should show first image
    expect(img).toHaveAttribute('src', '/img1.jpg');
    expect(img).toHaveAttribute('alt', 'John Doe - profile image 1');

    // Click next to go to second image
    fireEvent.click(nextBtn);
    expect(img).toHaveAttribute('src', '/img2.jpg');
    expect(img).toHaveAttribute('alt', 'John Doe - profile image 2');

    // Click prev to go back to first image
    fireEvent.click(prevBtn);
    expect(img).toHaveAttribute('src', '/img1.jpg');
    expect(img).toHaveAttribute('alt', 'John Doe - profile image 1');
  });

  it('cycles to first image after last', () => {
    render(<ViewProfile user={mockUser} />);
    fireEvent.click(screen.getByTestId('dialog-trigger'));

    const img = screen.getByTestId('profile-image');
    const nextBtn = screen.getByTestId('next');

    // Start at first image
    expect(img).toHaveAttribute('src', '/img1.jpg');

    // Navigate to second image
    fireEvent.click(nextBtn);
    expect(img).toHaveAttribute('src', '/img2.jpg');

    // Navigate to third image
    fireEvent.click(nextBtn);
    expect(img).toHaveAttribute('src', '/img3.jpg');

    // Navigate back to first image (cycling)
    fireEvent.click(nextBtn);
    expect(img).toHaveAttribute('src', '/img1.jpg');
  });

  it('cycles to last image when going backward from first', () => {
    render(<ViewProfile user={mockUser} />);
    fireEvent.click(screen.getByTestId('dialog-trigger'));

    const img = screen.getByTestId('profile-image');
    const prevBtn = screen.getByTestId('prev');

    // Start at first image, click prev should go to last image
    fireEvent.click(prevBtn);
    expect(img).toHaveAttribute('src', '/img3.jpg');
    expect(img).toHaveAttribute('alt', 'John Doe - profile image 3');
  });

  it('returns null for empty images array', () => {
    const { container } = render(<ViewProfile user={emptyUser} />);
    expect(container.firstChild).toBeNull();
  });

  it('fallbacks alt text if name is missing', () => {
    render(<ViewProfile user={{ ...mockUser, name: '' }} />);
    fireEvent.click(screen.getByTestId('dialog-trigger'));

    const img = screen.getByTestId('profile-image');
    expect(img).toHaveAttribute('alt', 'User - profile image 1');
  });

  it('dialog content is not rendered initially', () => {
    render(<ViewProfile user={mockUser} />);
    expect(screen.queryByTestId('dialog-content')).not.toBeInTheDocument();
    expect(screen.queryByTestId('profile-image')).not.toBeInTheDocument();
  });

  it('handles image error by calling handleImageError', () => {
    render(<ViewProfile user={mockUser} />);
    fireEvent.click(screen.getByTestId('dialog-trigger'));

    const img = screen.getByTestId('profile-image');
    
    // Initially no error should be displayed
    expect(screen.queryByTestId('image-error')).not.toBeInTheDocument();
    
    // Trigger the error event
    fireEvent.error(img);
    
    // After error, the error message should appear
    expect(screen.getByTestId('image-error')).toBeInTheDocument();
    expect(screen.getByText('Image failed to load')).toBeInTheDocument();
  });

  it('handles user with null interests gracefully', () => {
    const userWithNullInterests = { ...mockUser, interests: null };
    render(<ViewProfile user={userWithNullInterests} />);
    fireEvent.click(screen.getByTestId('dialog-trigger'));

    expect(screen.queryByTestId('interests')).not.toBeInTheDocument();
  });

  it('handles interests with missing _id', () => {
    const userWithMissingIds = {
      ...mockUser,
      interests: [
        { interestName: 'Reading' }, // No _id
        { _id: '2', interestName: 'Hiking' },
      ],
    };

    render(<ViewProfile user={userWithMissingIds} />);
    fireEvent.click(screen.getByTestId('dialog-trigger'));

    expect(screen.getByText('Reading')).toBeInTheDocument();
    expect(screen.getByText('Hiking')).toBeInTheDocument();
  });
});