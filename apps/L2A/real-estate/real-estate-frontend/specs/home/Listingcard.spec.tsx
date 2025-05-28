import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ListingCard from '@/app/_components/ListingCard';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

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

it('renders fallback image when image is null', () => {
  render(<ListingCard {...mockProps} image={null as any} />);
  const img = screen.getByAltText('no image');
  expect(img).toBeInTheDocument();
  expect(img.getAttribute('src')).toContain('/placeholder.png'); 
});


it('renders main image when image is provided', () => {
  render(<ListingCard {...mockProps} />);
  const img = screen.getByAltText('no image');
  expect(img).toBeInTheDocument();
  expect(img.getAttribute('src')).toContain('/listingcard.png'); 
});

});