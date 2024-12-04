import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { HotelDetailsImages } from '@/components/main/assets/HotelDetailsImages';

describe('HotelDetailsImages Component', () => {
  const sampleImages = [
    'https://example.com/image1.jpg',
    'https://example.com/image2.jpg',
    'https://example.com/image3.jpg',
    'https://example.com/image4.jpg',
    'https://example.com/image5.jpg',
    'https://example.com/image6.jpg',
  ];

  it('should render the correct number of images', () => {
    render(<HotelDetailsImages images={sampleImages} />);

    const images = screen.getAllByTestId('hotel-images');
    expect(images)
  });

  it('should open the dialog when an image is clicked', () => {
    render(<HotelDetailsImages images={sampleImages} />);

    const firstImage = screen.getAllByTestId('hotel-images')[0];
    fireEvent.click(firstImage);

    const dialog = screen.getByRole('dialog');
    expect(dialog)
  });

});
