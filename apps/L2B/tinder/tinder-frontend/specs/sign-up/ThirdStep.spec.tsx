import React from 'react';
import { render,screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ThirdStep from '@/app/auth/sign-up/_components/ThirdStep';

describe('ThirdStep component', () => {
  it('renders the email prop correctly', () => {
    const testEmail = 'test@example.com';

    render(<ThirdStep email={testEmail} />);

    const emailElement = screen.getByText('testEmail');
    expect(emailElement).toBeInTheDocument();
  });
});
