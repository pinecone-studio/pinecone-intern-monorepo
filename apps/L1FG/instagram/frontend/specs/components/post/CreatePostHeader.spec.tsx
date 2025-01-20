import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '@/components/create-post/lastCreatePost/Header';

describe('Header Component', () => {
  const mockHandleCreatePost = jest.fn();

  const renderComponent = (loadingPost = false) => {
    render(<Header handleCreatePost={mockHandleCreatePost} loadingPost={loadingPost} />);
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the header with all elements', () => {
    renderComponent();

    expect(screen.getByTestId('modal-header')).toBeInTheDocument();
    expect(screen.getByTestId('back-button')).toBeInTheDocument();
    expect(screen.getByTestId('create-header-text')).toHaveTextContent('Create');
    expect(screen.getByTestId('share-button')).toBeInTheDocument();
  });

  //   it('should call handleBack when the back button is clicked', () => {
  //     renderComponent();

  //     const backButton = screen.getByTestId('back-button');
  //     fireEvent.click(backButton);

  //     expect(mockHandleBack).toHaveBeenCalled();
  //   });

  it('should call handleCreatePost when the share button is clicked', () => {
    renderComponent();

    const shareButton = screen.getByTestId('share-button');
    fireEvent.click(shareButton);

    expect(mockHandleCreatePost).toHaveBeenCalled();
  });

  it('should display "Sharing..." and disable the share button when loadingPost is true', () => {
    renderComponent(true);

    const shareButton = screen.getByTestId('share-button');
    expect(shareButton).toHaveTextContent('Sharing...');
    expect(shareButton).toBeDisabled();
  });

  it('should display "Share" and enable the share button when loadingPost is false', () => {
    renderComponent(false);

    const shareButton = screen.getByTestId('share-button');
    expect(shareButton).toHaveTextContent('Share');
    expect(shareButton).not.toBeDisabled();
  });
});
