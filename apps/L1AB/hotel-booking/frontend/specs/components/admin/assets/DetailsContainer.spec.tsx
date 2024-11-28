import '@testing-library/jest-dom';
import { DetailsContainer } from '@/components/admin/assets';
import { render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('Admin Details Container', () => {
  it('should render children and name correctly', () => {
    usePathname.mockReturnValue('/admin/hotels/123');

    render(
      <DetailsContainer name="hotel-name">
        <div>Hotel content</div>
      </DetailsContainer>
    );
  });
  it('should render admin details container with chevron left icon', () => {
    usePathname.mockReturnValue('/admin/hotels/123');

    render(
      <DetailsContainer name="hotel-name">
        <div>Hotel content</div>
      </DetailsContainer>
    );
    const link = screen.getByRole('link');
    expect(link);
  });
});
