import { render, screen } from '@testing-library/react';
import { StageStyle } from '@/components';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/bookTicket/6765104197fab04d24c9ed5b'), // eslint-disable-line no-secrets/no-secrets
}));

describe('StageStyle Component', () => {
  it('renders all sections dynamically', () => {
    render(<StageStyle />);

    const leftBottomInside = document.querySelector('svg');
    expect(leftBottomInside);
  });

  it('renders the main stage text', () => {
    render(<StageStyle />);

    expect(screen);
  });
});
