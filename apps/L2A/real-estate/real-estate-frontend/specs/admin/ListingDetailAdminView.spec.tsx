import { render, screen, within, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ListingDetailAdminView from '@/app/admin/_components/ListingDetailAdminView';

const mockListing = {
  image: '/listingcard.png',
  name: 'Seoul royal county хотхон',
};

describe('ListingDetailAdminView Component', () => {
  it('renders general info section correctly', () => {
    render(<ListingDetailAdminView listing={mockListing} />);
    const generalSection = screen.getByText('Ерөнхий мэдээлэл').closest('div');
    if (!generalSection) throw new Error('General section not found');

    expect(within(generalSection).getByText('Н.Мөнхтунгалаг')).toBeInTheDocument();
    expect(within(generalSection).getByText('99112233')).toBeInTheDocument();
    expect(within(generalSection).getByText('880,000,000₮')).toBeInTheDocument();
    expect(within(generalSection).getByText('Seoul royal county хотхон')).toBeInTheDocument();
  });

  it('default selected status should be Хүлээгдэж буй', () => {
    render(<ListingDetailAdminView listing={mockListing} />);
    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select.value).toBe('Хүлээгдэж буй');
  });

  it('changes status on select change', () => {
    render(<ListingDetailAdminView listing={mockListing} />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'Зөвшөөрөх' } });
    expect((select as HTMLSelectElement).value).toBe('Зөвшөөрөх');
  });

  it('shows success message when status is changed', () => {
    render(<ListingDetailAdminView listing={mockListing} />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'Зөвшөөрөх' } });

    expect(screen.getByText('Төлөв амжилттай солигдлоо')).toBeInTheDocument();
    expect(screen.getByText('Thank you for your review!')).toBeInTheDocument();
  });

  it('renders 8 images in the gallery', () => {
    render(<ListingDetailAdminView listing={mockListing} />);
    const images = screen.getAllByAltText('listing');
    expect(images).toHaveLength(8);
  });
});
