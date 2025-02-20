/*eslint-disable*/
import { render, screen, fireEvent } from '@testing-library/react';
import { TimeSelector } from '@/components/adminfeature/TimeSelector';
import '@testing-library/jest-dom';

jest.mock('@/components/ui/select', () => ({
  Select: ({ onValueChange, value, children }: any) => (
    <select data-testid="select" value={value || ''} onChange={(e) => onValueChange?.(e.target.value)}>
      {children}
    </select>
  ),
  SelectTrigger: ({ children }: any) => <span>{children}</span>,
  SelectValue: ({ children }: any) => <span>{children}</span>,
  SelectContent: ({ children }: any) => <>{children}</>,
  SelectItem: ({ value, children }: any) => (
    <option data-testid="select-item" value={value}>
      {children}
    </option>
  ),
}));

jest.mock('@/components/ui/label', () => ({
  Label: ({ children }: any) => <label data-testid="label">{children}</label>,
}));

describe('TimeSelector', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders with initial value', () => {
    render(<TimeSelector value="14:30" onChange={mockOnChange} />);
    const selects = screen.getAllByTestId('select');
    expect(selects[0]).toHaveValue('14');
    expect(selects[1]).toHaveValue('30');
  });

  it('renders with single digit values', () => {
    render(<TimeSelector value="09:05" onChange={mockOnChange} />);
    const selects = screen.getAllByTestId('select');

    const hourSelect = selects[0] as HTMLSelectElement;
    const minuteSelect = selects[1] as HTMLSelectElement;

    expect(hourSelect.value).toBe('09');
    expect(minuteSelect.value).toBe('05');
  });

  it('handles null value', () => {
    // @ts-ignore - Testing null case
    render(<TimeSelector value={null} onChange={mockOnChange} />);
    const selects = screen.getAllByTestId('select');

    const hourSelect = selects[0] as HTMLSelectElement;
    const minuteSelect = selects[1] as HTMLSelectElement;

    expect(hourSelect.value).toBe('00');
    expect(minuteSelect.value).toBe('00');
  });

  it('handles undefined value', () => {
    // @ts-ignore - Testing undefined case
    render(<TimeSelector value={undefined} onChange={mockOnChange} />);
    const selects = screen.getAllByTestId('select');
    expect(selects[0]).toHaveValue('00');
    expect(selects[1]).toHaveValue('00');
  });

  it('handles empty string value', () => {
    render(<TimeSelector value="" onChange={mockOnChange} />);
    const selects = screen.getAllByTestId('select');
    expect(selects[0]).toHaveValue('00');
    expect(selects[1]).toHaveValue('00');
  });

  it('handles hour change', () => {
    render(<TimeSelector value="14:30" onChange={mockOnChange} />);
    const hourSelect = screen.getAllByTestId('select')[0];

    fireEvent.change(hourSelect, { target: { value: '15' } });
    expect(mockOnChange).toHaveBeenCalledWith('15:30');
  });

  it('handles minute change', () => {
    render(<TimeSelector value="14:30" onChange={mockOnChange} />);
    const minuteSelect = screen.getAllByTestId('select')[1];

    fireEvent.change(minuteSelect, { target: { value: '45' } });
    expect(mockOnChange).toHaveBeenCalledWith('14:45');
  });

  it('generates correct number of hour options', () => {
    render(<TimeSelector value="14:30" onChange={mockOnChange} />);
    const hourOptions = screen.getAllByTestId('select-item').slice(0, 24);
    expect(hourOptions).toHaveLength(24);
    expect(hourOptions[0]).toHaveAttribute('value', '00');
    expect(hourOptions[23]).toHaveAttribute('value', '23');
  });

  it('generates correct number of minute options', () => {
    render(<TimeSelector value="14:30" onChange={mockOnChange} />);
    const minuteOptions = screen.getAllByTestId('select-item').slice(24);
    expect(minuteOptions).toHaveLength(60);
    expect(minuteOptions[0]).toHaveAttribute('value', '00');
    expect(minuteOptions[59]).toHaveAttribute('value', '59');
  });

  it('renders the Mongolian labels correctly', () => {
    render(<TimeSelector value="14:30" onChange={mockOnChange} />);
    const label = screen.getByTestId('label');
    expect(label).toHaveTextContent('Тоглолтын цаг сонгох');
  });

  it('maintains proper time format when changing hours from single to double digit', () => {
    render(<TimeSelector value="05:30" onChange={mockOnChange} />);
    const hourSelect = screen.getAllByTestId('select')[0];
    fireEvent.change(hourSelect, { target: { value: '15' } });
    expect(mockOnChange).toHaveBeenCalledWith('15:30');
  });

  it('maintains proper time format when changing minutes from single to double digit', () => {
    render(<TimeSelector value="14:05" onChange={mockOnChange} />);
    const minuteSelect = screen.getAllByTestId('select')[1];
    fireEvent.change(minuteSelect, { target: { value: '45' } });
    expect(mockOnChange).toHaveBeenCalledWith('14:45');
  });

  it('handles changing hours to 00', () => {
    render(<TimeSelector value="14:30" onChange={mockOnChange} />);
    const hourSelect = screen.getAllByTestId('select')[0];
    fireEvent.change(hourSelect, { target: { value: '00' } });
    expect(mockOnChange).toHaveBeenCalledWith('00:30');
  });

  it('handles changing minutes to 00', () => {
    render(<TimeSelector value="14:30" onChange={mockOnChange} />);
    const minuteSelect = screen.getAllByTestId('select')[1];
    fireEvent.change(minuteSelect, { target: { value: '00' } });
    expect(mockOnChange).toHaveBeenCalledWith('14:00');
  });
});
