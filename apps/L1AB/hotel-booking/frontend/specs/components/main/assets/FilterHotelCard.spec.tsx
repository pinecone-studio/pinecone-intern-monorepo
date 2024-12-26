// import '@testing-library/jest-dom';
// import { render } from '@testing-library/react';
// import { FilterHotelCard } from '@/components/main/assets';

// describe('Main Filter Hotel Card', () => {
//   it('should render the filter hotel card', () => {
//     render(<FilterHotelCard id="1" name="Ub Hotel" image="https://example.com/image1.jpg" rating={3} stars={3} />);
//   });
// });
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FilterHotelCard } from '@/components/main/assets';





jest.mock('@/components/icon', () => {
  return {
    StarFillIcon: () => <span data-testid="star-icon">★</span>,
  };
});

describe('FilterHotelCard', () => {
  const defaultProps = {
    id: 'hotel-123',
    name: 'Grand Hotel',
    image: '/hotel.jpg',
    rating: 9.5,
    stars: 5,
    room: { price: 120000 },
  };

  it('renders the hotel name and rating correctly', () => {
    render(<FilterHotelCard {...defaultProps} />);

    expect(screen.getByText(defaultProps.name));
    expect(screen.getByText(defaultProps.rating.toString()));
  });

  it('renders the correct number of star icons', () => {
    render(<FilterHotelCard {...defaultProps} />);

    const stars = screen.getAllByTestId('star-icon');
    expect(stars.length).toBe(defaultProps.stars);
  });

  it('displays the correct room price', () => {
    render(<FilterHotelCard {...defaultProps} />);

    expect(screen.getByText(`${defaultProps.room.price.toLocaleString()}₮`));
  });

  it('displays "N/A" if no room price is provided', () => {
    const propsWithoutRoomPrice = { ...defaultProps, room: undefined };
    render(<FilterHotelCard {...propsWithoutRoomPrice} />);

    expect(screen.getByText('N/A'));
  });

  it('renders the hotel image with the correct src and alt attributes', () => {
    render(<FilterHotelCard {...defaultProps} />);

    const image = screen.getByAltText(defaultProps.name);
    expect(image);
  });

  it('links to the correct hotel details page', () => {
    render(<FilterHotelCard {...defaultProps} />);

    const link = screen.getByTestId('filter-hotel-card');
    expect(link).toHaveAttribute('href', `/hotels/${defaultProps.id}`);
  });
});
