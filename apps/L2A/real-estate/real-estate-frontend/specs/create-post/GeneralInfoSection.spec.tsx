import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import GeneralInfoSection from '@/app/user-listing/edit/_components/GeneralInfoSection';

describe('GeneralInfoSection', () => {
  it('renders section title and description', () => {
    render(<GeneralInfoSection />);
    expect(screen.getByText('Ерөнхий мэдээлэл')).toBeInTheDocument();
    expect(screen.getByText(/Please tell us the name of the guest/i)).toBeInTheDocument();
  });

  it('renders all field labels', () => {
    const labels = [
      'Төрөл',
      'Нэр',
      'Үнэ',
      'Талбай',
      'Өрөө',
      'Ариун цэврийн өрөө',
      'Дулаан зогсоол',
      'Дэлгэрэнгүй тайлбар',
    ];

    render(<GeneralInfoSection />);

    labels.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });
});
