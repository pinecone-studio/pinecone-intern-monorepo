import TicketFilterBar from '@/app/admin/ticket/_components/TicketFilterBar';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('TicketFilterBar Component', () => {
  beforeEach(() => {
    render(<TicketFilterBar />);
  });
  test('renders search input', () => {
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
  });
  test('renders add artist button', () => {
    const addArtistButton = screen.getByTestId('add-artist-button');
    expect(addArtistButton).toBeInTheDocument();
    expect(addArtistButton).toHaveTextContent('Уран бүтээлч');
  });
  test('clears all filters when clear button is clicked', () => {
    expect(screen.getByTestId('filter-badge-0')).toBeInTheDocument();
    expect(screen.getByTestId('filter-badge-1')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('clear-filters-button'));
    expect(screen.queryByTestId('filter-badge-0')).not.toBeInTheDocument();
    expect(screen.queryByTestId('filter-badge-1')).not.toBeInTheDocument();
  });
  test('removes individual filter when X is clicked', () => {
    const removeBtn = screen.getByTestId('remove-filter-button-0');
    fireEvent.click(removeBtn);
  });
  test('calendar button calls showPicker and click on hidden date input', () => {
    const dateInput = screen.getByTestId('hidden-date-input') as HTMLInputElement;
    dateInput.showPicker = jest.fn();
    dateInput.click = jest.fn();
    fireEvent.click(screen.getByTestId('calendar-button'));
    expect(dateInput.showPicker).toHaveBeenCalled();
    expect(dateInput.click).toHaveBeenCalled();
  });
  test('date input updates selected date state and button text', () => {
    const dateInput = screen.getByTestId('hidden-date-input') as HTMLInputElement;
    fireEvent.change(dateInput, { target: { value: '2025-05-16' } });
    const calendarButton = screen.getByTestId('calendar-button');
    expect(calendarButton.textContent).toMatch(/May 16/);
  });
});
