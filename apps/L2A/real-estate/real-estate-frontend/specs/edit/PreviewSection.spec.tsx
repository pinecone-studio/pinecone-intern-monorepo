import PreviewSection from '@/app/user-listing/edit/_components/PreviewSection';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('PreviewSection', () => {
  it('renders preview title and description text', () => {
    render(<PreviewSection />);
    
    expect(screen.getByText('Хэрэглэгчдэд харагдах')).toBeInTheDocument();
    expect(
      screen.getByText('Таны оруулсан мэдээлэл хэрэглэгчдэд харагдах үзүүлэлт')
    ).toBeInTheDocument();
  });

  it('renders the ListingPreviewCard with correct props', () => {
    render(<PreviewSection />);
    
    expect(screen.getByText('880,000,000₮')).toBeInTheDocument();
    expect(screen.getByText('Seoul royal county хотхон')).toBeInTheDocument();
    expect(screen.getByText('200 м²')).toBeInTheDocument();
    expect(screen.getByText('4 өрөө')).toBeInTheDocument();
    expect(screen.getByText('2 а.ц.ө')).toBeInTheDocument();
    expect(
      screen.getByText(/Хан-Уул дүүрэг, 1-р хороо/)
    ).toBeInTheDocument();
  });

  it('renders all action buttons', () => {
    render(<PreviewSection />);
    
    expect(screen.getByRole('button', { name: /Зар оруулах хүсэлт илгээх/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Хадгалаад гарах/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Устгах/i })).toBeInTheDocument();
  });
});
