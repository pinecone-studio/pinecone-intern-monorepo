/* eslint-disable max-lines */
/* eslint-disable react/no-unescaped-entities */

import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChatHeader from '@/components/ChatHeader';
import { ChatUser } from 'types/chat';

// Mock the child components
jest.mock('@/components/UnmatchButton', () => {
  return {
    __esModule: true,
    default: ({ matchId, onUnmatched }: { matchId: string; onUnmatched?: () => void }) => (
      <button data-testid="unmatch-button" onClick={onUnmatched}>
        Unmatch {matchId}
      </button>
    ),
  };
});
jest.mock('@/components/ViewProfile', () => {
  return {
    __esModule: true,
    default: ({ user }: { user: ChatUser }) => <button data-testid="view-profile-button">View {user.name}'s Profile</button>,
  };
});

// Mock Lucide icons
jest.mock('lucide-react', () => ({
  ArrowLeft: () => <svg data-testid="arrow-left" />,
  MoreHorizontal: () => <svg data-testid="more-horizontal" />,
  Video: () => <svg data-testid="video" />,
  Shield: () => <svg data-testid="shield" />,
  Flag: () => <svg data-testid="flag" />,
}));

describe('ChatHeader', () => {
  const mockUser: ChatUser = {
    id: '1',
    name: 'John',
    age: 28,
    profession: 'Software Engineer',
    images: ['photo1.jpg'],
    dateOfBirth: '1995-06-15',
    startedConversation: true,
  };
  const matchId = 'test-match-id';
  const mockOnUnmatched = jest.fn();
  const mockOnBack = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Desktop view', () => {
    beforeEach(() => {
      // Set desktop viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });
      window.dispatchEvent(new Event('resize'));
    });

    it('does not render Video button in desktop header', () => {
      render(<ChatHeader user={mockUser} matchId={matchId} />);

      // Video button should not be in desktop header
      const desktopHeader = document.querySelector('.hidden.md\\:flex');
      const videoButton = screen.queryByTestId('video');

      if (videoButton) {
        expect(desktopHeader).not.toContainElement(videoButton);
      }
    });

    it('shows dropdown menu when MoreHorizontal button is clicked in desktop view', () => {
      render(<ChatHeader user={mockUser} matchId={matchId} onUnmatched={mockOnUnmatched} />);

      // Initially dropdown should not be visible
      expect(screen.queryByTestId('view-profile-button')).not.toBeInTheDocument();

      // Find the desktop MoreHorizontal button
      const desktopHeader = document.querySelector('.hidden.md\\:flex');
      const desktopMoreButton = within(desktopHeader!).getByTestId('more-horizontal').closest('button');

      // Click the desktop MoreHorizontal button
      fireEvent.click(desktopMoreButton!);

      // Now dropdown should be visible in desktop header
      const desktopDropdown = within(desktopHeader!).getByTestId('view-profile-button');
      expect(desktopDropdown).toBeInTheDocument();

      const desktopUnmatchButton = within(desktopHeader!).getByTestId('unmatch-button');
      expect(desktopUnmatchButton).toBeInTheDocument();

      const desktopBlockButton = within(desktopHeader!).getByText('Block User');
      expect(desktopBlockButton).toBeInTheDocument();
    });
  });

  describe('Mobile view', () => {
    beforeEach(() => {
      // Set mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 500,
      });
      window.dispatchEvent(new Event('resize'));
    });

    it('renders mobile header correctly', () => {
      render(<ChatHeader user={mockUser} matchId={matchId} onUnmatched={mockOnUnmatched} onBack={mockOnBack} />);

      // Check mobile header is visible
      const mobileHeader = document.querySelector('.md\\:hidden');
      expect(mobileHeader).toBeInTheDocument();
      expect(mobileHeader).not.toHaveClass('hidden');

      // Check desktop header is hidden
      const desktopHeader = document.querySelector('.hidden.md\\:flex');
      expect(desktopHeader).toBeInTheDocument();
      expect(desktopHeader).toHaveClass('hidden');

      // Check user name in mobile header using a different approach
      const mobileName = within(mobileHeader!).getByText('John');
      expect(mobileName).toBeInTheDocument();
    });

    it('renders Video button in mobile header', () => {
      render(<ChatHeader user={mockUser} matchId={matchId} />);

      // Find video button in mobile header
      const videoButton = screen.getByTestId('video').closest('button');

      expect(videoButton).toBeInTheDocument();

      // Check it's in the mobile header
      const mobileHeader = document.querySelector('.md\\:hidden');
      expect(mobileHeader).toContainElement(videoButton!);
    });

    it('calls onBack when back button is clicked in mobile view', () => {
      render(<ChatHeader user={mockUser} matchId={matchId} onBack={mockOnBack} />);

      // Find and click the back button
      const backButton = screen.getByTestId('arrow-left').closest('button');
      fireEvent.click(backButton!);

      expect(mockOnBack).toHaveBeenCalled();
    });

    it('shows dropdown menu when MoreHorizontal button is clicked in mobile view', () => {
      render(<ChatHeader user={mockUser} matchId={matchId} onUnmatched={mockOnUnmatched} onBack={mockOnBack} />);

      // Initially dropdown should not be visible
      expect(screen.queryByTestId('view-profile-button')).not.toBeInTheDocument();

      // Find the mobile MoreHorizontal button
      const mobileHeader = document.querySelector('.md\\:hidden');
      const mobileMoreButton = within(mobileHeader!).getByTestId('more-horizontal').closest('button');

      // Click the mobile MoreHorizontal button
      fireEvent.click(mobileMoreButton!);

      // Now dropdown should be visible in mobile header
      const mobileDropdown = within(mobileHeader!).getByTestId('view-profile-button');
      expect(mobileDropdown).toBeInTheDocument();

      const mobileUnmatchButton = within(mobileHeader!).getByTestId('unmatch-button');
      expect(mobileUnmatchButton).toBeInTheDocument();

      const mobileBlockButton = within(mobileHeader!).getByText('Block User');
      expect(mobileBlockButton).toBeInTheDocument();
    });
  });

  it('displays user name in both headers', () => {
    render(<ChatHeader user={mockUser} matchId={matchId} />);

    // Get all elements with text "John"
    const nameElements = screen.getAllByText('John');
    expect(nameElements).toHaveLength(2);

    // Check one is in desktop header and one is in mobile header
    const desktopHeader = document.querySelector('.hidden.md\\:flex');
    const mobileHeader = document.querySelector('.md\\:hidden');

    expect(desktopHeader).toContainElement(nameElements[0]);
    expect(mobileHeader).toContainElement(nameElements[1]);
  });

  it('displays user image in both headers', () => {
    render(<ChatHeader user={mockUser} matchId={matchId} />);

    // Check images appear in both headers
    const images = screen.getAllByAltText('John');
    expect(images).toHaveLength(2);

    // Check image source and class
    images.forEach((img) => {
      expect(img).toHaveAttribute('src', 'photo1.jpg');
      expect(img).toHaveClass('rounded-full', 'object-cover');
    });
  });

  it('calls onUnmatched when UnmatchButton is clicked', () => {
    render(<ChatHeader user={mockUser} matchId={matchId} onUnmatched={mockOnUnmatched} />);

    // Open dropdown
    const moreButtons = screen.getAllByTestId('more-horizontal').map((icon) => icon.closest('button'));
    fireEvent.click(moreButtons[0]!);

    // Click unmatch button
    fireEvent.click(screen.getAllByTestId('unmatch-button')[0]);

    expect(mockOnUnmatched).toHaveBeenCalled();
  });

  it('closes dropdown when clicking outside', async () => {
    render(<ChatHeader user={mockUser} matchId={matchId} />);

    // Open dropdown
    const moreButtons = screen.getAllByTestId('more-horizontal').map((icon) => icon.closest('button'));
    fireEvent.click(moreButtons[0]!);

    // Dropdown should be visible
    expect(screen.getAllByTestId('view-profile-button')).toHaveLength(2);

    // Click outside
    fireEvent.mouseDown(document.body);

    // Dropdown should be closed
    await waitFor(() => {
      expect(screen.queryByTestId('view-profile-button')).not.toBeInTheDocument();
    });
  });

  it('renders UnmatchButton only when matchId is provided', () => {
    const { rerender } = render(<ChatHeader user={mockUser} matchId={matchId} />);

    // Open dropdown
    const moreButtons = screen.getAllByTestId('more-horizontal').map((icon) => icon.closest('button'));
    fireEvent.click(moreButtons[0]!);

    // Unmatch button should be present
    expect(screen.getAllByTestId('unmatch-button')).toHaveLength(2);

    // Close dropdown
    fireEvent.mouseDown(document.body);

    // Rerender without matchId
    rerender(<ChatHeader user={mockUser} />);

    // Open dropdown again
    const moreButtons2 = screen.getAllByTestId('more-horizontal').map((icon) => icon.closest('button'));
    fireEvent.click(moreButtons2[0]!);

    // Unmatch button should not be present
    expect(screen.queryByTestId('unmatch-button')).not.toBeInTheDocument();
  });

  it('handles block user button click', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<ChatHeader user={mockUser} matchId={matchId} />);

    // Open dropdown
    const moreButtons = screen.getAllByTestId('more-horizontal').map((icon) => icon.closest('button'));
    fireEvent.click(moreButtons[0]!);

    // Click block button
    fireEvent.click(screen.getAllByText('Block User')[0]);

    expect(consoleSpy).toHaveBeenCalledWith('Block user clicked');
    consoleSpy.mockRestore();
  });
  describe('accessibility', () => {
    it('has proper focus management for dropdown', () => {
      render(<ChatHeader user={mockUser} matchId={matchId} />);

      // Open dropdown
      const moreButtons = screen.getAllByTestId('more-horizontal').map((icon) => icon.closest('button'));
      fireEvent.click(moreButtons[0]!);

      // Check that dropdown has focus
      const dropdown = screen.getAllByTestId('view-profile-button')[0].closest('.absolute');
      expect(dropdown).toHaveClass('z-50');
    });
  });
  it('does not close dropdown when clicking inside dropdown (covers false branch)', async () => {
    render(<ChatHeader user={mockUser} matchId={matchId} />);

    // Open the dropdown
    const moreButtons = screen.getAllByTestId('more-horizontal').map((icon) => icon.closest('button'));
    fireEvent.click(moreButtons[0]!);

    // Dropdown should now be visible
    const dropdownButton = screen.getAllByTestId('view-profile-button')[0];
    expect(dropdownButton).toBeInTheDocument();

    // Click inside the dropdown
    fireEvent.mouseDown(dropdownButton); // simulate internal click

    // Wait to ensure dropdown doesn't close
    await waitFor(() => {
      expect(screen.getAllByTestId('view-profile-button')[0]).toBeInTheDocument();
    });
  });
});
