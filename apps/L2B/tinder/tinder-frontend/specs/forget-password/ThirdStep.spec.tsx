import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ThirdStep from '@/app/auth/forget-password/_components/ThirdStep';

describe('ThirdStep component', () => {
  it('renders the email prop correctly', () => {
    const testEmail = 'test@example.com';

    render(<ThirdStep email={testEmail} />);
  });
});
