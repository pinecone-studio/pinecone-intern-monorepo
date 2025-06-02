import LocationSection from '@/app/user-listing/edit/_components/LocationSection';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('LocationSection', () => {
  it('renders section title and description', () => {
    render(<LocationSection />);

    expect(screen.getByText('Байршил')).toBeInTheDocument();
    expect(screen.getByText('Хаягийн мэдээллийг бөглөнө үү.')).toBeInTheDocument();
  });

  it('renders all location fields with correct labels and default values', () => {
    render(<LocationSection />);

    expect(screen.getByLabelText('Дүүрэг')).toHaveValue('Хан-Уул');
    expect(screen.getByLabelText('Хороо')).toHaveValue('1-р хороо');
    expect(screen.getByLabelText('Дэлгэрэнгүй')).toHaveValue(
      'Хан-Уул дүүрэг, 1-р хороо, Зайсан толгойн урд, америк сургуулийн хажууд'
    );
  });
});
