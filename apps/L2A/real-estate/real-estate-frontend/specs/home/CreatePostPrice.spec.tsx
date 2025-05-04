import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CreatePostPrice } from '@/app/create-post/_components/CreatePostPrice';
import '@testing-library/jest-dom';

describe('CreatePostPrice', () => {
  it('renders the price input field', () => {
    render(<CreatePostPrice />);
    const input = screen.getByTestId('price');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'number');
  });

  it('updates value when user types a number', async () => {
    render(<CreatePostPrice />);
    const input = screen.getByTestId('price');

    await userEvent.clear(input);
    await userEvent.type(input, '250000');

    expect(input).toHaveValue(250000);
  });
});
