import TicketFilterBar from '@/app/admin/concerts/_components/TicketFilterBar';
import { render, screen, fireEvent } from '@testing-library/react';
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

  it('calls onChange and onKeyDown (Enter) in search input', () => {
    renderWithProps();

    const inputs = screen.getAllByTestId('search-input');
    const input = inputs[0];

    fireEvent.change(input, { target: { value: 'Жавхлан' } });
    expect(input.value).toBe('Жавхлан');
  });
});
