import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Confirm from '@/components/forgetpassword/Confirm';

describe('Confirm Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should render the confirm email step initially', () => {
    render(<Confirm />);
    expect(screen.getByText('Confirm email')).toBeInTheDocument();
    expect(screen.getByText(/To continue, enter the secure code/)).toBeInTheDocument();
  });
});
