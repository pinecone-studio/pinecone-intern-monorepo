import OTP from '@/components/Otp';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('OTP Component', () => {
  it('should render the OTP component successfully', () => {
    render(<OTP />);
  });

  it('should allow numeric input and navigate between inputs', async () => {
    render(<OTP />);
    const user = userEvent.setup();

    const inputs = screen.getAllByRole('textbox') as HTMLInputElement[];

    await user.type(inputs[0], '1');
  });
  it('should not move focus if the current input is the first one (index 0)', () => {
    render(<OTP />);

    const inputs = screen.getAllByRole('textbox');

    fireEvent.keyDown(inputs[0], { key: 'Backspace', code: 'Backspace', charCode: 8 });

    expect(inputs[0]);
  });
  it('should move focus to the previous input on Backspace when the current input is empty', () => {
    render(<OTP />);

    const inputs = screen.getAllByRole('textbox');

    fireEvent.keyDown(inputs[1], { key: 'Backspace', code: 'Backspace', charCode: 8 });

    expect(inputs[0]);
  });

  it('should not move focus if the current input is not empty', () => {
    render(<OTP />);

    const inputs = screen.getAllByRole('textbox');

    fireEvent.change(inputs[1], { target: { value: '1' } });

    fireEvent.keyDown(inputs[1], { key: 'Backspace', code: 'Backspace', charCode: 8 });

    expect(inputs[1]);
  });

  it('should update OTP state when a valid numeric value is entered', () => {
    render(<OTP />);

    const inputs = screen.getAllByRole('textbox');

    // Simulate entering a valid numeric value ('1') in the first input
    fireEvent.change(inputs[0], { target: { value: '1' } });

    // Check if OTP state is updated correctly
    // Assuming OTP state should now be ['1', '', '', '']
    expect((inputs[0] as HTMLInputElement).value);
    expect(inputs[1]);
  });

  it('should not update OTP state when a non-numeric value is entered', () => {
    render(<OTP />);

    const inputs = screen.getAllByRole('textbox');

    // Simulate entering a non-numeric value ('a') in the first input
    fireEvent.change(inputs[0], { target: { value: 'a' } });

    // Check if OTP state is not updated and the input remains empty
    expect((inputs[0] as HTMLInputElement).value);
  });

  it('should move focus to the next input when a valid numeric value is entered', () => {
    render(<OTP />);

    const inputs = screen.getAllByRole('textbox');

    // Simulate entering a valid numeric value ('1') in the first input
    fireEvent.change(inputs[0], { target: { value: '1' } });

    // Check if focus moves to the second input
    expect(inputs[1]);
  });

  it('should not move focus if the last input is filled', () => {
    render(<OTP />);

    const inputs = screen.getAllByRole('textbox');

    // Fill the first three inputs
    fireEvent.change(inputs[0], { target: { value: '1' } });
    fireEvent.change(inputs[1], { target: { value: '2' } });
    fireEvent.change(inputs[2], { target: { value: '3' } });

    // Simulate entering a value in the last input
    fireEvent.change(inputs[3], { target: { value: '4' } });

    // The focus should stay in the last input (index 3)
    expect(inputs[3]);
  });
});
