import { render, screen, within, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ListingDetailAdminView from '@/app/admin/_components/ListingDetailAdminView';

describe('ListingDetailAdminView Component', () => {
  it('renders general info section correctly', () => {
    render(
      <ListingDetailAdminView
        listing={{
          image: '/listingcard.png',
          name: 'Seoul royal county хотхон',
        }}
      />
    );

    const generalSection = screen.getByText('Ерөнхий мэдээлэл').closest('div');
    if (!generalSection) {
      throw new Error('General section not found');
    }

    expect(within(generalSection).getByText('Н.Мөнхтунгалаг')).toBeInTheDocument();
    expect(within(generalSection).getByText('99112233')).toBeInTheDocument();
    expect(within(generalSection).getByText('880,000,000₮')).toBeInTheDocument();
    expect(within(generalSection).getByText('Seoul royal county хотхон')).toBeInTheDocument();
  });

  it('changes status on select change', () => {
    render(
      <ListingDetailAdminView
        listing={{
          image: '/listingcard.png',
          name: 'Seoul royal county хотхон',
        }}
      />
    );

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'Зөвшөөрөх' } });
    expect((select as HTMLSelectElement).value).toBe('Зөвшөөрөх');
  });
});
