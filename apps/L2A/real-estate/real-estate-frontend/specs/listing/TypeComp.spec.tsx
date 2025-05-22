import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TypeComp from '@/app/listing/_components/TypeComp';

jest.mock('@/components/ui/label', () => ({
  Label: ({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) => (
    <label htmlFor={htmlFor}>{children}</label>
  ),
}));

jest.mock('@/components/ui/checkbox', () => ({
  Checkbox: ({
    id,
    checked,
    onCheckedChange,
  }: {
    id: string;
    checked: boolean;
    // eslint-disable-next-line no-unused-vars
    onCheckedChange: (checked: boolean) => void;
  }) => (
    <input
      type="checkbox"
      id={id}
      data-testid={id}
      checked={checked}
      onChange={(e) => onCheckedChange(e.target.checked)}
    />
  ),
}));

describe('TypeComp', () => {
  it('renders all checkboxes and labels', () => {
    render(<TypeComp type="" setType={jest.fn()} />);
    expect(screen.getByText('Төрөл')).toBeInTheDocument();
    expect(screen.getByLabelText('Байр')).toBeInTheDocument();
    expect(screen.getByLabelText('Хаус')).toBeInTheDocument();
    expect(screen.getByLabelText('Оффис')).toBeInTheDocument();
  });

  it('checks the correct checkboxes based on type prop', () => {
    render(<TypeComp type="APARTMENT,OFFICE" setType={jest.fn()} />);
    expect((screen.getByLabelText('Байр') as HTMLInputElement).checked).toBe(true);
    expect((screen.getByLabelText('Хаус') as HTMLInputElement).checked).toBe(false);
    expect((screen.getByLabelText('Оффис') as HTMLInputElement).checked).toBe(true);
  });

  it('adds a type when checkbox is toggled on', () => {
    const setType = jest.fn();
    render(<TypeComp type="APARTMENT" setType={setType} />);
    fireEvent.click(screen.getByLabelText('Хаус'));
    expect(setType).toHaveBeenCalledWith('APARTMENT,HOUSE');
  });

  it('removes a type when checkbox is toggled off', () => {
    const setType = jest.fn();
    render(<TypeComp type="APARTMENT,HOUSE" setType={setType} />);
    fireEvent.click(screen.getByLabelText('Хаус'));
    expect(setType).toHaveBeenCalledWith('APARTMENT');
  });

  it('adds a type when starting from empty', () => {
    const setType = jest.fn();
    render(<TypeComp type="" setType={setType} />);
    fireEvent.click(screen.getByLabelText('Оффис'));
    expect(setType).toHaveBeenCalledWith('OFFICE');
  });

  it('handles undefined type gracefully', () => {
  const setType = jest.fn();
  render(<TypeComp type={undefined as any} setType={setType} />);
  expect(screen.getByLabelText('Байр')).toBeInTheDocument(); 
});

it('handles null type gracefully', () => {
  const setType = jest.fn();
  render(<TypeComp type={null as any} setType={setType} />);
  expect(screen.getByLabelText('Хаус')).toBeInTheDocument();
});
it('handles undefined type and toggles checkbox', () => {
  const setType = jest.fn();
  render(<TypeComp type={undefined as any} setType={setType} />);
  const checkbox = screen.getByLabelText('Байр');
  fireEvent.click(checkbox);
  expect(setType).toHaveBeenCalledWith('APARTMENT');
});

});
