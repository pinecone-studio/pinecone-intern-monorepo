import { Button } from '@/app/_components/Button';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Button component', () => {
  it('renders the button text', () => {
    render(<Button text="Click Me" />);

    expect(screen.getByText(/Click me/i)).toBeInTheDocument();
  });
});
