import React from 'react';
import { render, screen } from '@testing-library/react';
import AdminHeader from '@/app/admin/_components/Header';
import '@testing-library/jest-dom';

describe('AdminHeader', () => {
  beforeEach(() => {
    render(<AdminHeader />);
  });

  it('renders the header container', () => {
    expect(screen.getByTestId('admin-header')).toBeInTheDocument();
  });

  it('renders all four nav links with correct hrefs', () => {
    const expected = [
      ['Orders', '/admin/orders'],
      ['Menu',   '/admin/menu'],
      ['Food',   '/admin/food'],
      ['Table',  '/admin/table'],
    ] as const;

    expected.forEach(([label, href]) => {
      const item = screen.getByTestId(`nav-item-${label}`);
      const anchor = item.closest('a');
      expect(anchor).toHaveAttribute('href', href);
      expect(item).toHaveTextContent(label);
    });
  });

  it('always renders the fallback initials', () => {
    const fallback = screen.getByTestId('avatar-fallback');
    expect(fallback).toHaveTextContent('CN');
  });
});
 