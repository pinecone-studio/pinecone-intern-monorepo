import ListingCard from '@/app/home/_components/ListingCard';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';


describe('ListingCard', () => {
  const mockProps = {
    imageUrl: '/listingcard.png',
    price: '880,000,000₮',
    title: 'Зайсан seoul royal county хотхон',
    beds: 4,
    baths: 2,
    area: 200,
    location: 'Хан-Уул дүүрэг, 1-р хороо, Зайсан',
    imageCount: '1/9',
  };

  it('renders price', () => {
    render(<ListingCard {...mockProps} />);
    

    expect(screen.getByText(mockProps.price)).toBeInTheDocument();
  });

  it('renders title', () => {
    render(<ListingCard {...mockProps} />);
    
    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
  });

  it('renders location', () => {
    render(<ListingCard {...mockProps} />);
  
    expect(screen.getByText(mockProps.location)).toBeInTheDocument();
  });

  it('renders image count', () => {
    render(<ListingCard {...mockProps} />);
    expect(screen.getByText(mockProps.imageCount)).toBeInTheDocument();
  });

  it('renders room details', () => {
    render(<ListingCard {...mockProps} />);

    expect(screen.getByText(`${mockProps.area} м²`)).toBeInTheDocument();

    expect(screen.getByText(`${mockProps.beds} өрөө`)).toBeInTheDocument();
   
    expect(screen.getByText(`${mockProps.baths} а.ц.ө`)).toBeInTheDocument();
  });

  it('renders image alt text', () => {
    render(<ListingCard {...mockProps} />);
 
    const image = screen.getByAltText(mockProps.title);
    expect(image).toBeInTheDocument();
  });
});
