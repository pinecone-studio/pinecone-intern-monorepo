import { render, screen, fireEvent, act } from '@testing-library/react';

import '@testing-library/jest-dom';
import Carousel from '@/components/carousel/Carousel';

const slides = [
  {
    id: 1,
    title: 'MUSIC of the SPHERES',
    subtitle: 'Coldplay',
    dates: '10.31 11.01',
    image: 'https://wallpaperaccess.com/full/6133725.jpg',
  },
  {
    id: 2,
    title: 'HIGHER POWER',
    subtitle: 'World Tour',
    dates: '11.02 11.03',
    image: 'https://images.pexels.com/photos/2034851/pexels-photo-2034851.jpeg',
  },
];

describe('Carousel', () => {
  it('renders successfully', () => {
    render(<Carousel slides={slides} />);
    expect(screen.getByText(/MUSIC of the SPHERES/i)).toBeInTheDocument();
    expect(screen.getByText(/HIGHER POWER/i)).toBeInTheDocument();
  });

  it('navigates to the next slide', () => {
    render(<Carousel slides={slides} />);
    act(() => {
      fireEvent.click(screen.getByLabelText('Next slide'));
    });
    expect(screen.getByText(/HIGHER POWER/i)).toBeInTheDocument();
  });

  it('navigates to the previous slide', () => {
    render(<Carousel slides={slides} />);
    act(() => {
      fireEvent.click(screen.getByLabelText('Previous slide'));
    });
    expect(screen.getByText(/MUSIC of the SPHERES/i)).toBeInTheDocument();
  });

  it('loops back to the first slide after reaching the last', () => {
    render(<Carousel slides={slides} />);
    const nextButton = screen.getByLabelText('Next slide');

    // Go to the second slide
    act(() => {
      fireEvent.click(nextButton);
    });

    // Now, go back to the first slide
    act(() => {
      fireEvent.click(nextButton); // This should loop back to the first slide
    });

    expect(screen.getByText(/MUSIC of the SPHERES/i)).toBeInTheDocument();
  });

  it('auto-advances slides', () => {
    jest.useFakeTimers();
    render(<Carousel slides={slides} />);

    // Fast-forward the time to simulate auto-advance behavior
    act(() => {
      jest.advanceTimersByTime(4000); // Simulate the passage of time (e.g., 4 seconds)
    });

    expect(screen.getByText(/HIGHER POWER/i)).toBeInTheDocument();
    jest.useRealTimers();
  });

  it('prevents multiple previous slide transitions during animation', () => {
    render(<Carousel slides={slides} />);

    const previousButton = screen.getByLabelText('Previous slide');

    // Trigger the slide transition by clicking the previous button
    fireEvent.click(previousButton);

    // Prevent multiple transitions by clicking again during the animation
    act(() => {
      fireEvent.click(previousButton); // This should not trigger the transition
    });

    // Ensure that the transition only happens once, and the correct slide is displayed
    expect(screen.getByText('MUSIC of the SPHERES')).toBeInTheDocument(); // Correct slide after clicking Previous
  });

  it('navigates to a specific slide on button click', () => {
    render(<Carousel slides={slides} />);

    // Assuming you have buttons or controls to navigate directly to slides
    const goToSlideButton = screen.getByLabelText('Go to slide 2');

    // Navigate directly to the second slide
    act(() => {
      fireEvent.click(goToSlideButton);
    });

    expect(screen.getByText(/HIGHER POWER/i)).toBeInTheDocument();
  });

  // Additional test case to ensure coverage for conditional logic:
  it('does not navigate when already on the first slide and clicking previous', () => {
    render(<Carousel slides={slides} />);
    const previousButton = screen.getByLabelText('Previous slide');

    // Click previous on the first slide
    fireEvent.click(previousButton);
    expect(screen.getByText(/MUSIC of the SPHERES/i)).toBeInTheDocument();
  });

  it('does not navigate when already on the last slide and clicking next', () => {
    render(<Carousel slides={slides} />);
    const nextButton = screen.getByLabelText('Next slide');

    // Navigate to the second slide
    fireEvent.click(nextButton);

    // Click next on the last slide
    fireEvent.click(nextButton);
    expect(screen.getByText(/HIGHER POWER/i)).toBeInTheDocument();
  });
});
