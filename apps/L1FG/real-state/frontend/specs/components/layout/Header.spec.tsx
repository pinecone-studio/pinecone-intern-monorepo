import Header from '@/components/layout/Header';
import { render, screen } from '@testing-library/react';

describe('Header', () => {
  it('should render successfully', () => {
    render(<Header />);
    expect(screen.getByText('Нэвтрэх'));
  });
});
