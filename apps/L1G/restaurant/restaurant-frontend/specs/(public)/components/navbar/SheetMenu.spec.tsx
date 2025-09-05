// SheetMenu.test.tsx
import { SheetMenu } from '@/components/sheets/Sheetmenu';
import { render, screen, fireEvent } from '@testing-library/react';

describe('SheetMenu Component', () => {
  beforeEach(() => localStorage.clear());
  it('clicking logout clears localStorage', () => {
    localStorage.setItem('token', 'dummy-token');
    render(<SheetMenu />);

    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);

    const logoutBtn = screen.getByTestId('logout-button');
    fireEvent.click(logoutBtn);

    expect(localStorage.getItem('token')).toBeNull();
  });
});
