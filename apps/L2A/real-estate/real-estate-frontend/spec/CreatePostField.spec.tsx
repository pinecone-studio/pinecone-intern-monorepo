import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { CreatePostField } from '@/app/create-post/_components/CreatePostField';

describe('CreatePostField component', () => {
  it('renders a number input field with test id "field"', () => {
    render(<CreatePostField />);
    const input = screen.getByTestId('field');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'number');
  });

  it('should allow the user to type a numeric value into the input field', async () => {
    render(<CreatePostField />);
    const input = screen.getByTestId('field');

    await userEvent.clear(input);
    await userEvent.type(input, '250000');

    expect(input).toHaveValue(250000);
  });
});