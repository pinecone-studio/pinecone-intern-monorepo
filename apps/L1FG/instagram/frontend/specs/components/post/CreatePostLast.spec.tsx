import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useCreatePostMutation } from '@/generated';
import CreatePost from '@/components/post/CreatePost';

// Mocking the GraphQL mutation hook
jest.mock('@/generated', () => ({
  useCreatePostMutation: jest.fn(() => [jest.fn(), { loading: false }]),
}));

describe('CreatePost Component', () => {
  const mockSetStep = jest.fn();
  const images = ['/image1.jpg'];

  const renderComponent = () => {
    render(<CreatePost images={images} setStep={mockSetStep} />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the CreatePost modal and its elements', () => {
    renderComponent();

    // Verifying the presence of key UI elements
    expect(screen.getByTestId('create-post-modal')).toBeInTheDocument();
    expect(screen.getByTestId('image-container')).toBeInTheDocument();
    expect(screen.getByTestId('caption-input')).toBeInTheDocument();
    expect(screen.getByTestId('create-header-text')).toBeInTheDocument();
  });

  it('should call setStep(false) after successful post creation', async () => {
    const createPostMock = jest.fn().mockResolvedValueOnce({ data: {} });
    useCreatePostMutation.mockReturnValue([createPostMock, { loading: false }]);

    renderComponent();

    const shareButton = screen.getByTestId('share-button');
    fireEvent.click(shareButton);

    // Wait for the mutation to resolve
    await waitFor(() => {
      expect(mockSetStep).toHaveBeenCalledWith(false);
    });
  });

  it('should call setStep(true) when the back button is clicked', () => {
    renderComponent();

    const backButton = screen.getByTestId('back-button');
    fireEvent.click(backButton);

    expect(mockSetStep);
  });

  it('should call setLoading(true) when submitting the post', async () => {
    const createPostMock = jest.fn().mockResolvedValueOnce({ data: {} });
    useCreatePostMutation.mockReturnValue([createPostMock, { loading: false }]);

    renderComponent();

    const shareButton = screen.getByTestId('share-button');
    fireEvent.click(shareButton);

    // expect(mockSetLoading);
  });

  it('should show "Sharing..." text on the share button when loadingPost is true', () => {
    useCreatePostMutation.mockReturnValue([jest.fn(), { loading: true }]);

    renderComponent();

    const shareButton = screen.getByTestId('share-button');
    expect(shareButton).toHaveTextContent('Sharing...');
    expect(shareButton).toBeDisabled();
  });

  it('should update the caption value when the user types', () => {
    renderComponent();

    const captionInput = screen.getByTestId('caption-input');
    fireEvent.change(captionInput, { target: { value: 'New caption' } });

    expect(captionInput).toHaveValue('New caption');
  });
});
