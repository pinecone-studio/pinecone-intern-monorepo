import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MockedProvider } from '@apollo/client/testing';
import { CreatePostStep2 } from '@/components/post/CreatePostStep2';

describe('CreatePostStep2 Component', () => {
  const mockSetOpenCreatePostModal = jest.fn();
  const mockSetStep = jest.fn();
  const mockSetLoading = jest.fn();

  const renderComponent = (step: boolean, images: string[], loading: boolean) => {
    render(
      <MockedProvider>
        <CreatePostStep2 step={step} setStep={mockSetStep} images={images} setOpenCreatePostModal={mockSetOpenCreatePostModal} loading={loading} setLoading={mockSetLoading} />
      </MockedProvider>
    );
  };

  it('should render modal when step and images are provided', () => {
    renderComponent(true, ['https://example.com/image.jpg'], false);

    expect(screen.getByTestId('create-post-step2-modal')).toBeInTheDocument();
  });

  it('should not render modal when step is false', () => {
    renderComponent(false, ['https://example.com/image.jpg'], false);

    expect(screen.queryByTestId('create-post-step2-modal')).not.toBeInTheDocument();
  });

  it('should show loading overlay when loading is true', () => {
    renderComponent(true, ['https://example.com/image.jpg'], true);

    expect(screen.getByTestId('loading-overlay')).toBeInTheDocument();
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('should render selected image correctly', () => {
    renderComponent(true, ['https://example.com/image.jpg'], false);

    const image = screen.getByTestId('selected-image');
    expect(image).toBeInTheDocument();
    expect(image);
  });

  it('should call handleBack when back button is clicked', () => {
    renderComponent(true, ['https://example.com/image.jpg'], false);

    const backButton = screen.getByTestId('back-button');
    fireEvent.click(backButton);

    expect(mockSetOpenCreatePostModal).toHaveBeenCalledWith(false);
    expect(mockSetStep).toHaveBeenCalledWith(false);
  });

  it('should call handleNext when next button is clicked', () => {
    renderComponent(true, ['https://example.com/image.jpg'], false);

    const nextButton = screen.getByTestId('next-button');
    fireEvent.click(nextButton);

    expect(mockSetStep);
  });
});
