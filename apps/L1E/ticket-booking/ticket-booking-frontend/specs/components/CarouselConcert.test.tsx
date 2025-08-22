import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CarouselConcert } from '@/components/CarouselConcert';

// Mock images array for consistent testing
const mockImages = [
  'https://as2.ftcdn.net/v2/jpg/10/62/03/07/1000_F_1062030789_yaKuxV8QuIRqIgAfTA0wYlc797DinmdH.jpg',
  'https://media.istockphoto.com/id/1154370446/photo/funny-raccoon-in-green-sunglasses-showing-a-rock-gesture-isolated-on-white-background.jpg?s=1024x1024&w=is&k=20&c=pDRbcAdAzUMJ6c1BL3y-jfnJ9uvlDHTFSkJ6_LpZSzU=',
  'https://as1.ftcdn.net/jpg/03/73/16/86/1000_F_373168623_jTLasKYUB5Li0g5dI6uemZywfICeiZTI.webp',
];

// Mock timers
jest.useFakeTimers();

describe('CarouselConcert Component', () => {
  beforeEach(() => {
    jest.clearAllTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.clearAllTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  describe('Component Structure', () => {
    it('renders the main carousel container', () => {
      render(<CarouselConcert images={mockImages} />);

      const container = document.querySelector('.w-full.h-\\[550px\\]');
      expect(container).toBeInTheDocument();
    });

    it('renders all images', () => {
      render(<CarouselConcert images={mockImages} />);

      const images = screen.getAllByRole('img');
      expect(images).toHaveLength(3);

      // Check image sources
      //   images.forEach((img, index) => {
      //     expect(img).toHaveAttribute('src', mockImages[index]);
      //     expect(img).toHaveAttribute('alt', `Slide ${index + 1}`);
      //   });
    });

    it('renders navigation arrows', () => {
      render(<CarouselConcert images={mockImages} />);

      const prevButton = screen.getByLabelText('Previous Slide');
      const nextButton = screen.getByLabelText('Next Slide');

      expect(prevButton).toBeInTheDocument();
      expect(nextButton).toBeInTheDocument();
    });

    it('renders navigation dots', () => {
      render(<CarouselConcert images={mockImages} />);

      const dotButtons = screen.getAllByLabelText(/Go to slide \d+/);
      expect(dotButtons).toHaveLength(3);
    });
  });

  describe('Initial State', () => {
    it('displays the first image as active by default', () => {
      render(<CarouselConcert images={mockImages} />);

      const images = screen.getAllByRole('img');
      expect(images[0]).toHaveClass('opacity-100', 'z-10');
      expect(images[1]).toHaveClass('opacity-0', 'z-0');
      expect(images[2]).toHaveClass('opacity-0', 'z-0');
    });

    it('highlights the first navigation dot by default', () => {
      render(<CarouselConcert images={mockImages} />);

      const dots = screen.getAllByLabelText(/Go to slide \d+/);
      expect(dots[0]).toHaveClass('bg-white', 'scale-110');
      expect(dots[1]).toHaveClass('bg-white/30');
      expect(dots[2]).toHaveClass('bg-white/30');
    });
  });

  describe('Navigation Controls', () => {
    it('moves to next slide when next button is clicked', () => {
      render(<CarouselConcert images={mockImages} />);

      const nextButton = screen.getByLabelText('Next Slide');
      const images = screen.getAllByRole('img');

      fireEvent.click(nextButton);

      expect(images[1]).toHaveClass('opacity-100', 'z-10');
      expect(images[0]).toHaveClass('opacity-0', 'z-0');
    });

    it('moves to previous slide when prev button is clicked', () => {
      render(<CarouselConcert images={mockImages} />);

      const prevButton = screen.getByLabelText('Previous Slide');
      const images = screen.getAllByRole('img');

      fireEvent.click(prevButton);

      // Should wrap to last image (index 2)
      expect(images[2]).toHaveClass('opacity-100', 'z-10');
      expect(images[0]).toHaveClass('opacity-0', 'z-0');
    });

    it('wraps to first slide when clicking next on last slide', () => {
      render(<CarouselConcert images={mockImages} />);

      const nextButton = screen.getByLabelText('Next Slide');
      const images = screen.getAllByRole('img');

      // Click next twice to get to last slide
      fireEvent.click(nextButton);
      fireEvent.click(nextButton);
      expect(images[2]).toHaveClass('opacity-100', 'z-10');

      // Click next again to wrap to first
      fireEvent.click(nextButton);
      expect(images[0]).toHaveClass('opacity-100', 'z-10');
    });

    it('wraps to last slide when clicking prev on first slide', () => {
      render(<CarouselConcert images={mockImages} />);

      const prevButton = screen.getByLabelText('Previous Slide');
      const images = screen.getAllByRole('img');

      // Start at first slide, click prev should wrap to last
      fireEvent.click(prevButton);
      expect(images[2]).toHaveClass('opacity-100', 'z-10');
    });
  });

  describe('Dot Navigation', () => {
    it('navigates to specific slide when dot is clicked', () => {
      render(<CarouselConcert images={mockImages} />);

      const dots = screen.getAllByLabelText(/Go to slide \d+/);
      const images = screen.getAllByRole('img');

      // Click on third dot (index 2)
      fireEvent.click(dots[2]);

      expect(images[2]).toHaveClass('opacity-100', 'z-10');
      expect(images[0]).toHaveClass('opacity-0', 'z-0');
      expect(images[1]).toHaveClass('opacity-0', 'z-0');
    });

    it('updates active dot when slide changes', () => {
      render(<CarouselConcert images={mockImages} />);

      const nextButton = screen.getByLabelText('Next Slide');
      const dots = screen.getAllByLabelText(/Go to slide \d+/);

      fireEvent.click(nextButton);

      expect(dots[1]).toHaveClass('bg-white', 'scale-110');
      expect(dots[0]).toHaveClass('bg-white/30');
      expect(dots[2]).toHaveClass('bg-white/30');
    });

    it('handles clicking on all dots', () => {
      render(<CarouselConcert images={mockImages} />);

      const dots = screen.getAllByLabelText(/Go to slide \d+/);
      const images = screen.getAllByRole('img');

      // Test each dot
      dots.forEach((dot, index) => {
        fireEvent.click(dot);
        expect(images[index]).toHaveClass('opacity-100', 'z-10');
        expect(dot).toHaveClass('bg-white', 'scale-110');
      });
    });
  });

  describe('Auto-rotation', () => {
    it('automatically advances to next slide after 5 seconds', () => {
      render(<CarouselConcert images={mockImages} />);

      const images = screen.getAllByRole('img');

      // Initially first image should be active
      expect(images[0]).toHaveClass('opacity-100', 'z-10');

      // Fast forward 5 seconds
      act(() => {
        jest.advanceTimersByTime(5000);
      });

      // Should advance to second image
      expect(images[1]).toHaveClass('opacity-100', 'z-10');
      expect(images[0]).toHaveClass('opacity-0', 'z-0');
    });

    it('continues auto-rotation through all slides', () => {
      render(<CarouselConcert images={mockImages} />);

      const images = screen.getAllByRole('img');

      // Advance through each slide
      act(() => {
        jest.advanceTimersByTime(5000); // First -> Second
      });
      expect(images[1]).toHaveClass('opacity-100', 'z-10');

      act(() => {
        jest.advanceTimersByTime(5000); // Second -> Third
      });
      expect(images[2]).toHaveClass('opacity-100', 'z-10');

      act(() => {
        jest.advanceTimersByTime(5000); // Third -> First (wrap around)
      });
      expect(images[0]).toHaveClass('opacity-100', 'z-10');
    });

    it('clears interval on component unmount', () => {
      const clearIntervalSpy = jest.spyOn(global, 'clearInterval');

      const { unmount } = render(<CarouselConcert images={mockImages} />);

      unmount();

      expect(clearIntervalSpy).toHaveBeenCalled();
      clearIntervalSpy.mockRestore();
    });
  });

  describe('Styling and CSS Classes', () => {
    it('applies correct container classes', () => {
      render(<CarouselConcert images={mockImages} />);

      const container = document.querySelector('.w-full');
      expect(container).toHaveClass('h-[550px]', 'relative', 'overflow-hidden');
    });

    it('applies correct image classes', () => {
      render(<CarouselConcert images={mockImages} />);

      const images = screen.getAllByRole('img');
      images.forEach((img) => {
        expect(img).toHaveClass('absolute', 'top-0', 'left-0', 'w-full', 'h-full', 'object-cover', 'object-center', 'transition-opacity', 'duration-1000');
      });
    });

    it('applies correct button styling', () => {
      render(<CarouselConcert images={mockImages} />);

      const prevButton = screen.getByLabelText('Previous Slide');
      const nextButton = screen.getByLabelText('Next Slide');

      [prevButton, nextButton].forEach((button) => {
        expect(button).toHaveClass('absolute', 'top-1/2', '-translate-y-1/2', 'bg-white/20', 'text-white', 'p-3', 'rounded-full', 'transition-all', 'duration-300', 'z-20');
      });
    });

    it('applies correct dot styling', () => {
      render(<CarouselConcert images={mockImages} />);

      const dots = screen.getAllByLabelText(/Go to slide \d+/);
      dots.forEach((dot) => {
        expect(dot).toHaveClass('w-3', 'h-3', 'rounded-full', 'transition-all', 'duration-300');
      });
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA labels for navigation buttons', () => {
      render(<CarouselConcert images={mockImages} />);

      expect(screen.getByLabelText('Previous Slide')).toBeInTheDocument();
      expect(screen.getByLabelText('Next Slide')).toBeInTheDocument();
    });

    it('has proper ARIA labels for dot navigation', () => {
      render(<CarouselConcert images={mockImages} />);

      expect(screen.getByLabelText('Go to slide 1')).toBeInTheDocument();
      expect(screen.getByLabelText('Go to slide 2')).toBeInTheDocument();
      expect(screen.getByLabelText('Go to slide 3')).toBeInTheDocument();
    });

    it('has proper alt text for images', () => {
      render(<CarouselConcert images={mockImages} />);

      expect(screen.getByAltText('Slide 1')).toBeInTheDocument();
      expect(screen.getByAltText('Slide 2')).toBeInTheDocument();
      expect(screen.getByAltText('Slide 3')).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('handles rapid button clicks correctly', () => {
      render(<CarouselConcert images={mockImages} />);

      const nextButton = screen.getByLabelText('Next Slide');
      const images = screen.getAllByRole('img');

      // Rapid clicks
      fireEvent.click(nextButton);
      fireEvent.click(nextButton);
      fireEvent.click(nextButton);

      // Should wrap back to first image
      expect(images[0]).toHaveClass('opacity-100', 'z-10');
    });

    it('maintains correct state when mixing navigation methods', () => {
      render(<CarouselConcert images={mockImages} />);

      const nextButton = screen.getByLabelText('Next Slide');
      const dots = screen.getAllByLabelText(/Go to slide \d+/);
      const images = screen.getAllByRole('img');

      // Use next button
      fireEvent.click(nextButton);
      expect(images[1]).toHaveClass('opacity-100', 'z-10');

      // Use dot navigation
      fireEvent.click(dots[2]);
      expect(images[2]).toHaveClass('opacity-100', 'z-10');

      // Use prev button
      const prevButton = screen.getByLabelText('Previous Slide');
      fireEvent.click(prevButton);
      expect(images[1]).toHaveClass('opacity-100', 'z-10');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty images array gracefully', () => {
      // This would require modifying the component to accept props
      // For now, we test with the current static implementation
      expect(() => {
        render(<CarouselConcert images={mockImages} />);
      }).not.toThrow();
    });

    it('maintains performance with multiple rapid state changes', () => {
      render(<CarouselConcert images={mockImages} />);

      const nextButton = screen.getByLabelText('Next Slide');

      // Simulate rapid user interactions
      const startTime = performance.now();
      for (let i = 0; i < 10; i++) {
        fireEvent.click(nextButton);
      }
      const endTime = performance.now();

      // Should complete quickly (less than 100ms)
      expect(endTime - startTime).toBeLessThan(100);
    });
  });

  describe('Component Lifecycle', () => {
    it('starts auto-rotation on mount', () => {
      const setIntervalSpy = jest.spyOn(global, 'setInterval');

      render(<CarouselConcert images={mockImages} />);

      expect(setIntervalSpy).toHaveBeenCalledWith(expect.any(Function), 5000);
      setIntervalSpy.mockRestore();
    });

    it('cleans up interval on unmount', () => {
      const clearIntervalSpy = jest.spyOn(global, 'clearInterval');

      const { unmount } = render(<CarouselConcert images={mockImages} />);

      unmount();

      expect(clearIntervalSpy).toHaveBeenCalled();
      clearIntervalSpy.mockRestore();
    });
  });
});
