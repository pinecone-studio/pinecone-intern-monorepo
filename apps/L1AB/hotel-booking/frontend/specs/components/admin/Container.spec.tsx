import '@testing-library/jest-dom';
import { render,screen } from '@testing-library/react';
import { Container } from '@/components/admin';
import { usePathname } from 'next/navigation';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('Admin Container', () => {
  it('should render the admin container with sidebar, header, footer, and children', () => {
    usePathname.mockReturnValue('/admin/hotels');

    render(
      <Container>
        <div data-testid="children">Test Children</div>
      </Container>
    );

    expect(screen.getByTestId('sidebar'));
    expect(screen.getByTestId('header'));
    expect(screen.getByTestId('footer'));

    expect(screen.getByTestId('children'));
  });
  it('should render the admin container with the correct path', () => {
    usePathname.mockReturnValue('/admin/guests');

    render(
      <Container>
        <div data-testid="children">Test Children</div>
      </Container>
    );

    expect(screen.getByTestId('sidebar'));
    expect(screen.getByTestId('header'));
    expect(screen.getByTestId('footer'));

    expect(screen.getByTestId('children'));
  });
});