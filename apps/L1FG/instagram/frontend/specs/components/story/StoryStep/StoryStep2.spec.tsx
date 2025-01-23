import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { MockedProvider } from '@apollo/client/testing';
import CreateStoryStep2 from '@/components/story/createStory/CreateStoryStep2';

describe('CreateStoryStep2 Component', () => {
  const mockSetOpenCreateStoryModal = jest.fn();
  const mockSetStep = jest.fn();
  const mockSetLoading = jest.fn();

  const renderComponent = (step: boolean, images: string[], loading: boolean) => {
    render(
      <MockedProvider>
        <CreateStoryStep2 step={step} setStep={mockSetStep} images={images} setOpenCreateStoryModal={mockSetOpenCreateStoryModal} loading={loading} setLoading={mockSetLoading} />
      </MockedProvider>
    );
  };

  it('should render modal when step and images are provided', () => {
    renderComponent(true, ['https://example.com/image.jpg'], false);

    expect(screen.getByTestId('create-post-step2-modal-story')).toBeInTheDocument();
  });

  it('should not render modal when step is false', () => {
    renderComponent(false, ['https://example.com/image.jpg'], false);

    expect(screen.queryByTestId('create-post-step2-modal-story')).not.toBeInTheDocument();
  });

  it('should show loading overlay when loading is true', () => {
    renderComponent(true, ['https://example.com/image.jpg'], true);

    expect(screen.getByTestId('loading-overlay-story')).toBeInTheDocument();
    expect(screen.getByTestId('loader-story')).toBeInTheDocument();
  });

  it('should render selected image correctly', () => {
    renderComponent(true, ['https://example.com/image.jpg'], false);

    const image = screen.getByTestId('selected-image-story');
    expect(image).toBeInTheDocument();
    expect(image);
  });

  it('should call handleBack when back button is clicked', () => {
    renderComponent(true, ['https://example.com/image.jpg'], false);

    const backButton = screen.getByTestId('back-button-story');
    fireEvent.click(backButton);

    expect(mockSetOpenCreateStoryModal).toHaveBeenCalledWith(false);
    expect(mockSetStep).toHaveBeenCalledWith(false);
  });

  it('should call handleNext when next button is clicked', () => {
    renderComponent(true, ['https://example.com/image.jpg'], false);

    const nextButton = screen.getByTestId('next-button-story');
    fireEvent.click(nextButton);

    expect(mockSetStep);
  });
});
