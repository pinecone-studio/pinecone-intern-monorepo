import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CreatePostStep2 } from '@/components/create-post/CreatePostStep2';
import '@testing-library/jest-dom';

// Mock the next/image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));

// Mock the CreatePost component
jest.mock('@/components/create-post/CreatePost', () => {
  return {
    CreatePost: jest.fn(() => <div data-testid="create-post">Create Post Component</div>),
  };
});

describe('CreatePostStep2', () => {
  const mockSetStep = jest.fn();
  const mockSetOpenCreatePostModal = jest.fn();
  const defaultProps = {
    step: true,
    setStep: mockSetStep,
    images: ['test-image.jpg'],
    setOpenCreatePostModal: mockSetOpenCreatePostModal,
    loading: false,
  };

  let mockCreatePost: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    // Get the mock function from the mocked module
    mockCreatePost = jest.requireMock('@/components/create-post/CreatePost').CreatePost;
  });

  it('renders nothing when there are no images', () => {
    render(<CreatePostStep2 {...defaultProps} images={[]} />);

    expect(screen.queryByTestId('create-post-step2-modal')).not.toBeInTheDocument();
  });

  it('renders nothing when step is false', () => {
    render(<CreatePostStep2 {...defaultProps} step={false} />);

    expect(screen.queryByTestId('create-post-step2-modal')).not.toBeInTheDocument();
  });

  it('renders the modal with correct content when step is true and images exist', () => {
    render(<CreatePostStep2 {...defaultProps} />);

    expect(screen.getByTestId('create-post-step2-modal')).toBeInTheDocument();
    expect(screen.getByTestId('modal-header')).toBeInTheDocument();
    expect(screen.getByTestId('crop-text')).toHaveTextContent('Crop');
    expect(screen.getByTestId('back-button')).toBeInTheDocument();
    expect(screen.getByTestId('next-button')).toBeInTheDocument();
    expect(screen.getByTestId('selected-image')).toHaveAttribute('src', 'test-image.jpg');
  });

  it('shows loading overlay when loading is true', () => {
    render(<CreatePostStep2 {...defaultProps} loading={true} />);

    expect(screen.getByTestId('loading-overlay')).toBeInTheDocument();
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('handles back button click correctly', () => {
    render(<CreatePostStep2 {...defaultProps} />);

    fireEvent.click(screen.getByTestId('back-button'));

    expect(mockSetOpenCreatePostModal).toHaveBeenCalledWith(false);
    expect(mockSetStep).toHaveBeenCalledWith(false);
  });

  it('handles next button click correctly', () => {
    render(<CreatePostStep2 {...defaultProps} />);

    // Click next button
    fireEvent.click(screen.getByTestId('next-button'));

    // Verify CreatePost component is rendered
    expect(screen.getByTestId('create-post')).toBeInTheDocument();
    expect(mockCreatePost).toHaveBeenCalledWith(
      {
        images: ['test-image.jpg'],
        setStep: mockSetStep,
      },
      {}
    );
  });

  it('maintains correct modal state through component lifecycle', () => {
    const { rerender } = render(<CreatePostStep2 {...defaultProps} />);

    // Initial state
    expect(screen.getByTestId('create-post-step2-modal')).toBeInTheDocument();
    expect(screen.queryByTestId('create-post')).not.toBeInTheDocument();

    // Click next
    fireEvent.click(screen.getByTestId('next-button'));
    expect(screen.getByTestId('create-post')).toBeInTheDocument();

    // Update props
    rerender(<CreatePostStep2 {...defaultProps} step={false} />);
    expect(screen.queryByTestId('create-post-step2-modal')).not.toBeInTheDocument();
  });
});
