import { render, screen } from '@testing-library/react';
import Logo from '@/app/(auth)/login/_components/Logo';
import '@testing-library/jest-dom';
describe('Logo component', () => {
  it('renders the logo image', () => {
    render(<Logo />);
    const image = screen.getByTestId('Logo-image');
    expect(image).toHaveAttribute('alt', 'img ');
  });
});
