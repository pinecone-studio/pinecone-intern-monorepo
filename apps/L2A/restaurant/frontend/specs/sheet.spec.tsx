import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomeSheet from '@/app/_components/Sheet';

describe('HomeSheet', () => {
  test('renders the menu trigger button', () => {
    render(<HomeSheet />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
  test('opens the sheet and displays menu items when menu button is clicked', () => {
    render(<HomeSheet />);
    const triggerButton = screen.getByRole('button');
    fireEvent.click(triggerButton);
    expect(screen.getByText('Нүүр хуудас')).toBeInTheDocument();
    expect(screen.getByText('Хэтэвч')).toBeInTheDocument();
    expect(screen.getByText('Хэрэглэгч')).toBeInTheDocument();
    expect(screen.getByText('Захиалгын түүх')).toBeInTheDocument();
    expect(screen.getByText('Бидний тухай')).toBeInTheDocument();
  });
  test('logout button is visible and clickable', () => {
    render(<HomeSheet />);
    const triggerButton = screen.getByRole('button');
    fireEvent.click(triggerButton);
    const logoutButton = screen.getByText('Гарах');
    expect(logoutButton).toBeInTheDocument();
    fireEvent.click(logoutButton);
  });
});
