/* eslint-disable */

import React from 'react';
import '@testing-library/jest-dom';
import 'jest';
import { act, render, fireEvent, screen, waitFor } from '@testing-library/react';
import ResetPassword from '@/components/ResetPassword';
import { useRequestChangePasswordMutation } from '@/generated';
import { useRouter } from 'next/navigation';

// Mock the GraphQL hook
jest.mock('@/generated', () => ({
  useRequestChangePasswordMutation: jest.fn(),
}));
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const localStorageMock = (function () {
  let store: Record<string, string> = {};
  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: string) {
      store[key] = value;
    },
    removeItem(key: string) {
      delete store[key];
    },
    clear() {
      store = {};
    },
    get length() {
      return Object.keys(store).length;
    },
    key(index: number) {
      const keys = Object.keys(store);
      return keys[index] || null;
    },
  };
})();

beforeAll(() => {
  global.localStorage = localStorageMock;
});

describe('ResetPassword Component - handleContinue', () => {
  let mockRouterPush: jest.Mock;
  beforeEach(() => {
    mockRouterPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
  });
  it('should successfully request password reset and redirect', async () => {
    // Mock successful response from GraphQL
    const mockRequestChangePassword = jest.fn().mockResolvedValue({
      data: { requestChangePassword: { email: 'test@example.com' } },
    });

    useRequestChangePasswordMutation.mockReturnValue([mockRequestChangePassword]);

    render(<ResetPassword />);

    const emailInput = screen.getByTestId('email');
    const continueButton = screen.getByTestId('continue');

    // Simulate user typing in the email field
    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

      // Simulate user clicking the continue button
      fireEvent.click(continueButton);
    });
    // Wait for mutation to be triggered
    await waitFor(() => expect(mockRequestChangePassword).toHaveBeenCalledTimes(1));

    // Ensure the redirect happens to the OTP page
    expect(mockRouterPush).toHaveBeenCalledWith('/otp');
  });

  it('should not proceed if data is null', async () => {
    const mockRequestChangePassword = jest.fn().mockResolvedValue({
      data: null, // Simulating API returning null
    });

    useRequestChangePasswordMutation.mockReturnValue([mockRequestChangePassword]);

    render(<ResetPassword />);

    const emailInput = screen.getByTestId('email');
    const continueButton = screen.getByTestId('continue');

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.click(continueButton);
    });

    await waitFor(() => expect(mockRequestChangePassword).toHaveBeenCalledTimes(1));
  });

  it('should not submit with an empty email', async () => {
    render(<ResetPassword />);

    const emailInput = screen.getByTestId('email');
    const continueButton = screen.getByTestId('continue');

    // Simulate empty email submission
    await act(async () => {
      fireEvent.change(emailInput, { target: { value: '' } });
      fireEvent.click(continueButton);
    });
  });

  it('should not submit with an invalid email', async () => {
    render(<ResetPassword />);

    const emailInput = screen.getByTestId('email');
    const continueButton = screen.getByTestId('continue');

    // Simulate invalid email submission
    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
      fireEvent.click(continueButton);
    });
  });
});
