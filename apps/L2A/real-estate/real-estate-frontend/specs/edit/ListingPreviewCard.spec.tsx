import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import ListingPreviewCard from '@/app/_components/ListingPreviewCard';
/* eslint-disable react/display-name */
jest.mock('next/image', () => (props: any) => {
  const { src, alt, ...rest } = props;
  return <img src={src} alt={alt} data-testid="preview-image" {...rest} />;
});

const mockProps = {
  images: ['/img1.jpg', '/img2.jpg'],
  title: 'Тансаг байр',
  price: '₮500,000,000',
  area: 120,
  beds: 3,
  baths: 2,
  location: 'Улаанбаатар, Хан-Уул дүүрэг',
};

describe('ListingPreviewCard', () => {
  it('renders title, price, location and details correctly', () => {
    render(<ListingPreviewCard {...mockProps} />);

    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText(mockProps.price)).toBeInTheDocument();
    expect(screen.getByText(`${mockProps.area} м²`)).toBeInTheDocument();
    expect(screen.getByText(`${mockProps.beds} өрөө`)).toBeInTheDocument();
    expect(screen.getByText(`${mockProps.baths} а.ц.ө`)).toBeInTheDocument();
    expect(screen.getByText(mockProps.location)).toBeInTheDocument();
  });

  it('shows image counter and navigates with arrows', () => {
    render(<ListingPreviewCard {...mockProps} />);

    const counter = screen.getByTestId('image-counter');
    expect(counter).toHaveTextContent('1/2');

    const nextBtn = screen.getByLabelText('next image');
    fireEvent.click(nextBtn);
    expect(counter).toHaveTextContent('2/2');

    const prevBtn = screen.getByLabelText('previous image');
    fireEvent.click(prevBtn);
    expect(counter).toHaveTextContent('1/2');
  });

  it('does not show navigation buttons if only one image is provided', () => {
    render(<ListingPreviewCard {...mockProps} images={['/img1.jpg']} />);

    expect(screen.queryByLabelText('next image')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('previous image')).not.toBeInTheDocument();
  });

  it('uses default image if images prop is not provided', () => {
    const { getByTestId } = render(
      <ListingPreviewCard
        title="Default Image Test"
        price="₮1,000,000"
        area={50}
        beds={1}
        baths={1}
        location="Location test"
      />
    );

    const image = getByTestId('preview-image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', expect.stringContaining('/listingcard.png'));
  });

  it('defaults to image 1 if only one image provided', () => {
    render(<ListingPreviewCard {...mockProps} images={['/img1.jpg']} />);
    expect(screen.getByTestId('image-counter')).toHaveTextContent('1/1');
  });
});
