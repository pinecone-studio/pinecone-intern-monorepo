import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import StatusSelect from '@/app/admin/_components/StatusSelect';

jest.useFakeTimers();

describe('StatusSelect Component', () => {
  it('renders with initial value', () => {
    render(<StatusSelect value="Хүлээгдэж буй" onChange={jest.fn()} />);
    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select.value).toBe('Хүлээгдэж буй');
  });

  it('calls onChange when a new status is selected', () => {
    const handleChange = jest.fn();
    render(<StatusSelect value="Хүлээгдэж буй" onChange={handleChange} />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'Зөвшөөрөх' } });
    expect(handleChange).toHaveBeenCalledWith('Зөвшөөрөх');
  });

  it('does not call onChange when same status is selected', () => {
    const handleChange = jest.fn();
    render(<StatusSelect value="Зөвшөөрөх" onChange={handleChange} />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'Зөвшөөрөх' } });
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('shows success message when value changes', () => {
    const { rerender } = render(<StatusSelect value="Хүлээгдэж буй" onChange={jest.fn()} />);
    rerender(<StatusSelect value="Зөвшөөрөх" onChange={jest.fn()} />);
    expect(screen.getByText('Төлөв амжилттай солигдлоо')).toBeInTheDocument();
    expect(screen.getByText('Thank you for your review!')).toBeInTheDocument();
  });

  it('removes success message after 3 seconds', () => {
    const { rerender } = render(<StatusSelect value="Хүлээгдэж буй" onChange={jest.fn()} />);
    rerender(<StatusSelect value="Зөвшөөрөх" onChange={jest.fn()} />);

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(screen.queryByText('Төлөв амжилттай солигдлоо')).not.toBeInTheDocument();
  });
});
