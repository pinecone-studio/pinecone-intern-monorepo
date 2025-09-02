import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MenuCardAdmin } from '@/components/admin';

jest.mock('../../../../src/components/admin/menu/MenuProductCard', () => ({
  MenuProductCard: () => <div data-testid="product-card">Product Card</div>,
}));

jest.mock('../../../../src/components/admin/menu/MenuGroupCard', () => ({
  MenuGroupCard: () => <div data-testid="group-card">Group Card</div>,
}));

describe('MenuCardAdmin', () => {
  it('renders the MenuCardAdmin component with tabs', () => {
    render(<MenuCardAdmin />);

    expect(screen.getByTestId('menu-card')).toBeInTheDocument();

    expect(screen.getByTestId('menu-product')).toBeInTheDocument();
    expect(screen.getByTestId('menu-group')).toBeInTheDocument();

    expect(screen.getByTestId('product-card')).toBeInTheDocument();
    expect(screen.queryByTestId('group-card')).not.toBeInTheDocument();
  });
});
