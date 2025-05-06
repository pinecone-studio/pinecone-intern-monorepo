import List from '@/app/_components/FilterListPage';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
describe('List Component', () => {
  it('Should render search input & dropdown', () => {
    render(<List />);
    expect(screen.getByPlaceholderText('Хайлт')).toBeInTheDocument();
    expect(screen.getByText('Өдөр сонгох')).toBeInTheDocument();
  });
  it('updates search input value', async () => {
    render(<List />);
    const input = screen.getByPlaceholderText('Хайлт') as HTMLInputElement;
    await userEvent.type(input, 'Coldplay');
    expect(input.value).toBe('Coldplay');
  });
  it('opens dropdown and selects a date', async () => {
    render(<List />);
    const button = screen.getByText('Өдөр сонгох');
    await userEvent.click(button);
    const dateOption = screen.getByText('2025-05-06');
    expect(dateOption).toBeInTheDocument();
    await userEvent.click(dateOption);
    expect(screen.getByText('2025-05-06')).toBeInTheDocument();
  });
});
