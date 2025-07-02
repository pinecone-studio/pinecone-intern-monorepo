import { SignUpHeader } from '@/app/(public)/signup/_components/SignUpHeader';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('sign up header should be visible', () => {
  it('1. render header component', () => {
    render(<SignUpHeader h3="Create an account" p="Enter your email below to create your account" />);
    expect(screen.getByTestId('SignUpHeader')).toBeInTheDocument();
  });
});
