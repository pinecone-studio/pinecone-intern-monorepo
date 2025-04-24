import { render, screen } from '@testing-library/react';
import Logo from '@/app/login/_components/Logo';
import cloudynary from '../../frontend/src/app/login/_components/cloudynary.json';
import '@testing-library/jest-dom';
describe('Logo component', () => {
  it('renders the logo image', () => {
    render(<Logo />);
    const image = screen.getByTestId('Logo-image');
    expect(image).toHaveAttribute('src', cloudynary.image);
    expect(image).toHaveAttribute('alt', 'img ');
  });
});
