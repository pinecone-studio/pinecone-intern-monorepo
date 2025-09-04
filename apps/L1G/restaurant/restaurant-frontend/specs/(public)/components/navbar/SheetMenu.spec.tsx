import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { SheetMenu } from '@/components/sheets/Sheetmenu';

// Mock localStorage
Object.defineProperty(window, 'localStorage', {
  value: {
    clear: jest.fn(),
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
  },
  writable: true,
});

describe('SheetMenu', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the SheetMenu component', () => {
    render(<SheetMenu />);
    // menu button байна уу шалгах
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('clears localStorage when sign out link is clicked', async () => {
    render(<SheetMenu />);

    // эхлээд меню нээх
    fireEvent.click(screen.getByRole('button'));

    // "Гарах" товчийг авах
    const signOutLink = await screen.findByText('Гарах');
    fireEvent.click(signOutLink);

    // localStorage.clear дуудагдсан эсэх шалгах
    expect(window.localStorage.clear).toHaveBeenCalled();
  });
});
