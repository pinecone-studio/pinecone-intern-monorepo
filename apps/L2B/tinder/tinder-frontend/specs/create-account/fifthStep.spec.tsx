import FifthStep from '@/app/auth/create-account/_components/FifthStep';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('fifth step components', () => {
  it('renders the text', () => {
    render(<FifthStep />);
    const text = screen.getByText('5step');
    expect(text).toBeInTheDocument();
  });
});
