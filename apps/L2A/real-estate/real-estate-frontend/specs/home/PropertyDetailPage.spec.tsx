import PropertyDetailPage from '@/app/detailed/page';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('PropertyDetailPage', () => {
  beforeEach(() => {
    render(<PropertyDetailPage />);
  });

  it('renders main image and thumbnails', () => {
    const thumbnails = screen.getAllByAltText('Thumbnail');
    expect(thumbnails).toHaveLength(9);
    expect(screen.getByAltText('Main Property')).toBeInTheDocument();
  });

  it('changes main image on thumbnail click', () => {
    const thumbnails = screen.getAllByAltText('Thumbnail');
    fireEvent.click(thumbnails[1]);
    expect(screen.getByAltText('Main Property')).toHaveAttribute('src', '/listingcard.png');
  });

  it('renders property info section with correct labels and values', () => {
    const section = screen.getByTestId('info-section');
    expect(within(section).getByText('Н.Мөнхтуяа')).toBeInTheDocument();
    expect(within(section).getByText('99112233')).toBeInTheDocument();
    expect(within(section).getByText('200.0 м²')).toBeInTheDocument();
    expect(within(section).getByText('4 өрөө')).toBeInTheDocument();
    expect(within(section).getByText('2 өрөө')).toBeInTheDocument();
    expect(within(section).getByText('Байхгүй')).toBeInTheDocument();
  });

  it('renders all detailed attributes', () => {
    [
      'Ашиглалтад орсон он',
      'Цонхны тоо',
      'Цонх',
      'Хаалга',
      'Хэдэн давхарт',
      'Барилгын давхар',
      'Шал',
      'Тагт',
      'Лифт'
    ].forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it('renders similar listings', () => {
    const similarListings = screen.getAllByText(/Зайсан seoul royal country хотхон/i);
    expect(similarListings).toHaveLength(12);
  });
});
