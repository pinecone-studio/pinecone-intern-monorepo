import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import StoryHighlightModal from '@/components/profile/story/StoryHighlightModal';
import { Button } from '@/components/ui/button';

describe('StoryHighlightModal', () => {
  it('should render correctly', () => {
    render(
      <StoryHighlightModal>
        <Button data-testid="open-modal">Open Modal</Button>
      </StoryHighlightModal>
    );

    // Ensure the trigger button exists
    expect(screen.getByTestId('open-modal')).toBeInTheDocument();
  });

  it('should open modal when trigger is clicked', () => {
    render(
      <StoryHighlightModal>
        <Button data-testid="open-modal">Open Modal</Button>
      </StoryHighlightModal>
    );
    fireEvent.click(screen.getByTestId('open-modal'));

    expect(screen.getByText('New highlight')).toBeInTheDocument();
  });

  it('should allow typing in the input field', () => {
    render(
      <StoryHighlightModal>
        <Button data-testid="open-modal">Open Modal</Button>
      </StoryHighlightModal>
    );

    fireEvent.click(screen.getByTestId('open-modal'));

    const input = screen.getByPlaceholderText('Highlight name');
    fireEvent.change(input, { target: { value: 'My Highlight' } });

    expect(input).toHaveValue('My Highlight');
  });

  it('should close the modal when clicking outside or on close button', () => {
    render(
      <StoryHighlightModal>
        <Button data-testid="open-modal">Open Modal</Button>
      </StoryHighlightModal>
    );
  });
});
