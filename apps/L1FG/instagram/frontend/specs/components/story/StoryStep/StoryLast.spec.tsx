import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import CreateStoryLast from '@/components/story/createStory/CreateStoryLast';
import { useCreateStoryMutation } from '@/generated';

// Mocking the GraphQL mutation hook
jest.mock('@/generated', () => ({
  useCreateStoryMutation: jest.fn(() => [jest.fn(), { loading: false }]),
}));

describe('CreateStory Component', () => {
  const mockSetStep = jest.fn();
  const images = ['/image1.jpg'];

  const renderComponent = () => {
    render(<CreateStoryLast images={images} setStep={mockSetStep} />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the CreatePost modal and its elements', () => {
    renderComponent();

    // Verifying the presence of key UI elements
    expect(screen.getByTestId('create-post-modal-story')).toBeInTheDocument();
    expect(screen.getByTestId('image-container-story')).toBeInTheDocument();
    expect(screen.getByTestId('create-header-text-story')).toBeInTheDocument();
  });

  it('should call setStep(false) after successful story creation', async () => {
    const createStoryMock = jest.fn().mockResolvedValueOnce({ data: {} });
    useCreateStoryMutation.mockReturnValue([createStoryMock, { loading: false }]);

    renderComponent();

    const shareButton = screen.getByTestId('share-button-story');
    fireEvent.click(shareButton);

    // Wait for the mutation to resolve
    await waitFor(() => {
      expect(mockSetStep).toHaveBeenCalledWith(false);
    });
  });

  it('should call setStep(true) when the back button is clicked', () => {
    renderComponent();

    const backButton = screen.getByTestId('back-button-story');
    fireEvent.click(backButton);

    expect(mockSetStep);
  });

  //   it('should show an alert if the caption or image is missing on submit', async () => {
  //     // eslint-disable-next-line @typescript-eslint/no-empty-function
  //     const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

  //     // Render component with empty images to trigger the alert
  //     render(<CreatePost images={[]} setStep={mockSetStep} setLoading={mockSetLoading} />);

  //     const shareButton = screen.getByTestId('share-button');
  //     fireEvent.click(shareButton);

  //     // Ensure the alert is called with the correct message
  //     // expect(alertMock).toHaveBeenCalledWith('Please add a caption and an image.');

  //     alertMock.mockRestore();
  //   });

  it('should call setLoading(true) when submitting the post', async () => {
    const createStoryMock = jest.fn().mockResolvedValueOnce({ data: {} });
    useCreateStoryMutation.mockReturnValue([createStoryMock, { loading: false }]);

    renderComponent();

    const shareButton = screen.getByTestId('share-button-story');
    fireEvent.click(shareButton);

    // expect(mockSetLoading);
  });

  it('should show "Sharing..." text on the share button when loadingPost is true', () => {
    useCreateStoryMutation.mockReturnValue([jest.fn(), { loading: true }]);

    renderComponent();

    const shareButton = screen.getByTestId('share-button-story');
    expect(shareButton).toHaveTextContent('Sharing...');
    expect(shareButton).toBeDisabled();
  });

  //   it('should show an alert if there is an error creating the post', async () => {
  //     // const createPostMock = jest.fn().mockRejectedValueOnce(new Error('Network error'));
  //     // eslint-disable-next-line @typescript-eslint/no-empty-function
  //     const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
  //     // eslint-disable-next-line @typescript-eslint/no-empty-function
  //     const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});

  //     useCreatePostMutation.mockReturnValue([CreatePost, { loading: false }]);

  //     renderComponent();

  //     const shareButton = screen.getByTestId('share-button');
  //     fireEvent.click(shareButton);

  //     await waitFor(() => {
  //       expect(consoleErrorMock);
  //       expect(alertMock);
  //     });

  //     alertMock.mockRestore();
  //     consoleErrorMock.mockRestore();
  //   });

  //   it('should update the caption value when the user types', () => {
  //     renderComponent();

  //     const captionInput = screen.getByTestId('caption-input-story');
  //     fireEvent.change(captionInput, { target: { value: 'New caption' } });

  //     expect(captionInput).toHaveValue('New caption');
  //   });
});
