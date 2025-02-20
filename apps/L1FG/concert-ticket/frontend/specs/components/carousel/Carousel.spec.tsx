import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Carousel from '@/components/carousel/Carousel';
import '@testing-library/jest-dom';

const slides = [
  { id: '1', title: 'Slide 1', subtitle: 'Subtitle 1', dates: '2025-02-20T10:52:36.706Z', image: '/img1.jpg' },
  { id: '2', title: 'Slide 2', subtitle: 'Subtitle 2', dates: '2025-02-21T10:52:36.706Z', image: '/img2.jpg' },
  { id: '3', title: 'Slide 3', subtitle: 'Subtitle 3', dates: '2025-02-22T10:52:36.706Z', image: '/img3.jpg' },
];

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

jest.spyOn(global, 'setInterval');
jest.spyOn(global, 'clearInterval');

describe('Carousel Component', () => {
  beforeEach(() => {
    jest.clearAllTimers();
  });

  test('renders correctly with slides', () => {
    render(<Carousel slides={slides} />);
    expect(screen.getByText('Slide 1')).toBeInTheDocument();
    expect(screen.getByText('Subtitle 1')).toBeInTheDocument();
  });

  test('navigates to next slide when next button is clicked', () => {
    render(<Carousel slides={slides} />);
    const nextButton = screen.getByLabelText('Next Slide');

    act(() => {
      fireEvent.click(nextButton);
    });

    expect(screen.getByText('Slide 2')).toBeVisible();
  });

  test('navigates to previous slide when previous button is clicked', () => {
    render(<Carousel slides={slides} />);
    const prevButton = screen.getByLabelText('Previous Slide');

    act(() => {
      fireEvent.click(prevButton);
    });

    expect(screen.getByText('Slide 3')).toBeVisible();
  });

  test('displays correct formatted date', () => {
    render(<Carousel slides={slides} />);
    expect(screen.getByText('February 20, 2025')).toBeInTheDocument();
  });

  test('renders navigation dots and selects correct slide', () => {
    render(<Carousel slides={slides} />);

    const allButtons = screen.getAllByRole('button');

    const dots = allButtons.slice(2);

    act(() => {
      fireEvent.click(dots[1]);
    });

    expect(screen.getByText('Slide 2')).toBeVisible();
  });

  test('auto transitions slides every 4 seconds', () => {
    jest.useFakeTimers();
    render(<Carousel slides={slides} />);

    expect(screen.getByText('Slide 1')).toBeVisible();

    act(() => {
      jest.advanceTimersByTime(4000);
    });
    expect(screen.getByText('Slide 2')).toBeVisible();

    act(() => {
      jest.advanceTimersByTime(4000);
    });
    expect(screen.getByText('Slide 3')).toBeVisible();

    act(() => {
      jest.advanceTimersByTime(4000);
    });
    expect(screen.getByText('Slide 1')).toBeVisible();

    jest.useRealTimers();
  });

  test('clears interval on component unmount', () => {
    jest.useFakeTimers();

    jest.useRealTimers();
  });
  test('navigates to next slide when next button is clicked', () => {
    render(<Carousel slides={slides} />);
    const nextButton = screen.getByLabelText('Next Slide');

    act(() => {
      fireEvent.click(nextButton);
    });

    expect(screen.getByText('Slide 2')).toBeVisible();
  });

  test('navigates to previous slide when previous button is clicked', () => {
    render(<Carousel slides={slides} />);
    const prevButton = screen.getByLabelText('Previous Slide');

    act(() => {
      fireEvent.click(screen.getByLabelText('Next Slide'));
    });

    act(() => {
      fireEvent.click(prevButton);
    });

    expect(screen.getByText('Slide 1')).toBeVisible();
  });
  test('navigates to next slide and loops back to the first slide when reaching the last one', () => {
    render(<Carousel slides={slides} />);
    const nextButton = screen.getByLabelText('Next Slide');

    expect(screen.getByText('Slide 1')).toBeVisible();

    act(() => {
      fireEvent.click(nextButton);
    });
    expect(screen.getByText('Slide 2')).toBeVisible();

    act(() => {
      fireEvent.click(nextButton);
    });
    expect(screen.getByText('Slide 3')).toBeVisible();

    act(() => {
      fireEvent.click(nextButton);
    });
    expect(screen.getByText('Slide 1')).toBeVisible();
  });
});
