import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ListingCard from '@/app/home/_components/ListingCard';

describe('ListingCard', () => {
  const mockProps = {
    image: '/listingcard.png',
    price: 880000000,
    title: 'Зайсан seoul royal county хотхон',
    totalRooms: 4,
    restrooms: 2,
    size: 200,
    city: 'Улаанбаатар',
    district: 'Баянзүрх',
  };

  it('renders price formatted correctly', () => {
    render(<ListingCard {...mockProps} />);
    expect(screen.getByText('880,000,000₮')).toBeInTheDocument();
  });

  it('renders title', () => {
    render(<ListingCard {...mockProps} />);
    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
  });

  it('renders size, total rooms, restrooms', () => {
    render(<ListingCard {...mockProps} />);
    expect(screen.getByText(`${mockProps.size} м²`)).toBeInTheDocument();
    expect(screen.getByText(`${mockProps.totalRooms} өрөө`)).toBeInTheDocument();
    expect(screen.getByText(`${mockProps.restrooms} а.ц.ө`)).toBeInTheDocument();
  });

  it('renders location city and district', () => {
    render(<ListingCard {...mockProps} />);
    expect(screen.getByText(`${mockProps.city}, ${mockProps.district}`)).toBeInTheDocument();
  });

  it('renders image with fallback alt text', () => {
    render(<ListingCard {...mockProps} />);
    const img = screen.getByAltText('no image');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', mockProps.image);
  });
});