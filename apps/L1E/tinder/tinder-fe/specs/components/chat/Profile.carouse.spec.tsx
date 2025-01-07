import { ProfileCarouselUser } from '@/components/chat/ProfileCarousel';
import { render, screen, fireEvent } from '@testing-library/react';

import { useSearchParams } from 'next/navigation';

// Mock carousel components
jest.mock('@/components/ui/carousel', () => ({
  Carousel: ({ children }) => <div>{children}</div>,
  CarouselContent: ({ children }) => <div>{children}</div>,
  CarouselItem: ({ children }) => <div>{children}</div>,
  CarouselNext: ({ children }) => <div>{children}</div>,
}));

// Mock the `useSearchParams` hook from `next/navigation`
jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
}));

describe('ProfileCarouselUser', () => {
  it('renders carousel and navigates images', () => {
    const mockMatches = [
      {
        targetUserId: {
          username: 'john_doe',
          age: 30,
          profession: 'Developer',
          images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
        },
      },
    ];

    // Mock searchParams to return a username
    const searchParams = {
      get: jest.fn().mockReturnValue('john_doe'),
    };
    (useSearchParams as jest.Mock).mockReturnValue(searchParams);

    render(<ProfileCarouselUser matches={mockMatches} />);

    // Check if the image is rendered
    const image = screen.getByAltText('john_doe-0');
    expect(image);

    // Check if the username and age are displayed
    const username = screen.getByText('john_doe,');
    expect(username);
    const age = screen.getByText('30');
    expect(age);

    // Check if the profession is displayed
    const profession = screen.getByText('Developer');
    expect(profession);

    // Simulate next button click to navigate images
    const nextButton = screen.getByTestId('next');
    fireEvent.click(nextButton);
    expect(screen.getByAltText('john_doe-1'));

    // Simulate previous button click to navigate images back
    const prevButton = screen.getByTestId('prev');
    fireEvent.click(prevButton);
    expect(screen.getByAltText('john_doe-0'));
  });
});
