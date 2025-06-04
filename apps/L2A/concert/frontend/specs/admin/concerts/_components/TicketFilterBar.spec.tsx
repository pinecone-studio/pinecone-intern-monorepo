import TicketFilterBar from '@/app/admin/concerts/_components/TicketFilterBar';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useState } from 'react';

const renderWithProps = () => {
  const Wrapper = () => {
    const [searchTerm, setSearchTerm] = useState('');
    return <TicketFilterBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />;
  };
  render(<Wrapper />);
};

describe('TicketFilterBar Component', () => {
  beforeEach(() => {
    renderWithProps();
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

  test('removes individual filter when X is clicked', async () => {
    const removeBtn = screen.getByLabelText('remove-filter-Хурд');
    fireEvent.click(removeBtn);

    await waitFor(() => {
      expect(screen.queryByText('Хурд')).not.toBeInTheDocument();
    });
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
  it('calls onChange and onKeyDown (Enter) in search input', () => {
    renderWithProps();

    const inputs = screen.getAllByTestId('search-input');
    const input = inputs[0];

    fireEvent.change(input, { target: { value: 'Жавхлан' } });
    expect(input.value).toBe('Жавхлан');
    fireEvent.keyDown(input, { key: 'a', code: 'KeyA', charCode: 65 });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
  });
});
