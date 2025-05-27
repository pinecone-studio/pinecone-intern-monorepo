import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Hotel } from '@/generated';
import { HotelsTable } from '@/app/(admin)/hotels/_components/HotelsTable';

describe('HotelsTable', () => {
  const hotels: Hotel[] = [
    { _id: '1', name: 'Luxury Stay', starRating: 5, rating: 9 },
    { _id: '2', name: 'Standard Stay', starRating: 3, rating: 3 },
    { _id: '3', name: 'Null Star', starRating: null, rating: 7 },
    { _id: '4', name: 'Null Rating', starRating: 4, rating: null },
  ];

  const originalWindowLocation = window.location;

  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      value: {
        ...originalWindowLocation,
        href: '',
        assign: jest.fn(),
      },
      writable: true,
    });
  });

  afterEach(() => {
    Object.defineProperty(window, 'location', {
      value: originalWindowLocation,
      writable: true,
    });
  });
  it('renders hotels in original order initially', () => {
    render(<HotelsTable hotels={hotels} />);
    const names = screen.getAllByTestId(/hotel-name-/).map((el) => el.textContent);
    expect(names).toEqual(['Luxury Stay', 'Standard Stay', 'Null Star', 'Null Rating']);
  });

  it('covers b.rating fallback to 0', () => {
    const hotels: Hotel[] = [
      { _id: '1', name: 'Hotel A', starRating: 3, rating: null },
      { _id: '2', name: 'Hotel B', starRating: 4, rating: 8 },
    ];

    render(<HotelsTable hotels={hotels} />);
    fireEvent.click(screen.getByTestId('sort-rating'));

    const names = screen.getAllByTestId(/hotel-name-/).map((el) => el.textContent);
    expect(names).toEqual(['Hotel A', 'Hotel B']);
  });

  it('sorts by starRating ascending', () => {
    render(<HotelsTable hotels={hotels} />);
    fireEvent.click(screen.getByTestId('sort-starRating'));

    const stars = screen.getAllByTestId(/hotel-stars-/).map((el) => {
      const match = el.textContent?.match(/(\d+)/);
      return match ? parseInt(match[1]) : 0;
    });

    expect(stars).toEqual([0, 3, 4, 5]);
  });

  it('sorts by starRating descending', () => {
    render(<HotelsTable hotels={hotels} />);
    fireEvent.click(screen.getByTestId('sort-starRating'));
    fireEvent.click(screen.getByTestId('sort-starRating'));

    const stars = screen.getAllByTestId(/hotel-stars-/).map((el) => {
      const match = el.textContent?.match(/(\d+)/);
      return match ? parseInt(match[1]) : 0;
    });

    expect(stars).toEqual([5, 4, 3, 0]);
  });

  it('sorts by rating ascending', () => {
    render(<HotelsTable hotels={hotels} />);
    fireEvent.click(screen.getByTestId('sort-rating'));

    const ratings = screen.getAllByTestId(/hotel-rating-/).map((el) => {
      const match = el.textContent?.match(/(\d+\.\d+)/);
      return match ? parseFloat(match[1]) : 0;
    });

    expect(ratings).toEqual([0.0, 3.0, 7.0, 9.0]);
  });

  it('sorts by rating descending', () => {
    render(<HotelsTable hotels={hotels} />);
    fireEvent.click(screen.getByTestId('sort-rating'));
    fireEvent.click(screen.getByTestId('sort-rating'));

    const ratings = screen.getAllByTestId(/hotel-rating-/).map((el) => {
      const match = el.textContent?.match(/(\d+\.\d+)/);
      return match ? parseFloat(match[1]) : 0;
    });

    expect(ratings).toEqual([9.0, 7.0, 3.0, 0.0]);
  });

  it('navigates to correct hotel URL when row is clicked', () => {
    const mockNavigate = jest.fn();
    Object.defineProperty(window.location, 'href', {
      set: mockNavigate,
    });

    render(<HotelsTable hotels={hotels} />);

    fireEvent.click(screen.getByTestId('hotel-row-0'));
    expect(mockNavigate).toHaveBeenCalledWith('/hotels/1');

    fireEvent.click(screen.getByTestId('hotel-row-1'));
    expect(mockNavigate).toHaveBeenCalledWith('/hotels/2');
  });

  it('handles null ID by navigating to empty ID', () => {
    const mockNavigate = jest.fn();
    Object.defineProperty(window.location, 'href', {
      set: mockNavigate,
    });

    const hotelsWithNullId = [...hotels, { _id: null, name: 'Null ID Hotel', starRating: 2, rating: 5 }];
    render(<HotelsTable hotels={hotelsWithNullId} />);

    fireEvent.click(screen.getByTestId('hotel-row-4'));
    expect(mockNavigate).toHaveBeenCalledWith('/hotels/');
  });
});
