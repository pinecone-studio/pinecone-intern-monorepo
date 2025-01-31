import CodeInput from '@/components/code-input/CodeInput';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
describe('CodeInput Component', () => {
  beforeEach(() => {
    render(<CodeInput />);
  });

  it('renders four empty input fields initially', () => {
    const inputs = screen.getAllByRole('textbox') as HTMLInputElement[];
    expect(inputs).toHaveLength(4);
    inputs.forEach((input) => {
      expect(input.value).toBe('');
    });
  });

  it('allows character input and auto-focuses next field', () => {
    const inputs = screen.getAllByRole('textbox');

    fireEvent.change(inputs[0], { target: { value: 'A' } });
    expect(inputs[0]).toHaveValue('A');
    expect(inputs[1]).toHaveFocus();

    fireEvent.change(inputs[1], { target: { value: 'B' } });
    expect(inputs[1]).toHaveValue('B');
    expect(inputs[2]).toHaveFocus();

    fireEvent.change(inputs[2], { target: { value: 'C' } });
    expect(inputs[2]).toHaveValue('C');
    expect(inputs[3]).toHaveFocus();

    fireEvent.change(inputs[3], { target: { value: 'D' } });
    expect(inputs[3]).toHaveValue('D');
    expect(inputs[3]).toHaveFocus();
  });

  it('handles backspace navigation correctly', () => {
    const inputs = screen.getAllByRole('textbox');

    fireEvent.change(inputs[0], { target: { value: '1' } });
    fireEvent.change(inputs[1], { target: { value: '2' } });

    fireEvent.keyDown(inputs[2], { key: 'Backspace' });
    expect(inputs[1]).toHaveFocus();

    fireEvent.keyDown(inputs[1], { key: 'Backspace' });
    expect(inputs[1]).toHaveValue('2');
    expect(inputs[1]).toHaveFocus();
  });
});
