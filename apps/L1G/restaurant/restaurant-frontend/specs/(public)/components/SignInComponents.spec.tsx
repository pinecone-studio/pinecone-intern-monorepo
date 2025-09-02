/* eslint-disable */
import { fireEvent, render, waitFor, act } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import React from 'react';
import '@testing-library/jest-dom';
import { SignInDocument, GetTableByNameDocument } from '@/generated';
import { useRouter, useSearchParams } from 'next/navigation';
import { SignInComponent } from '@/components/auth/SignInComponent';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe('SignInComponent', () => {
  const localStorageMock = { getItem: jest.fn(), setItem: jest.fn(), removeItem: jest.fn(), clear: jest.fn() };
  const push = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
    (useSearchParams as jest.Mock).mockReturnValue({ get: jest.fn().mockReturnValue(null) });
    (useRouter as jest.Mock).mockReturnValue({ push });
  });

  // Mocks
  const createSignInMock = (email: string, password: string, token: string, role: string): MockedResponse => ({
    request: { query: SignInDocument, variables: { input: { email, password } } },
    result: { data: { signIn: { token, user: { userId: '1', email, role }, __typename: 'AuthPayload' } } },
  });

  const createTableMock = (tableName: string, tableId?: string): MockedResponse => ({
    request: { query: GetTableByNameDocument, variables: { tableName } },
    result: { data: { getTableByName: tableId ? { tableId, tableName } : null } },
  });

  const signInUserMock = createSignInMock('user@gmail.com', 'user123', 'user-token', 'user');
  const signInAdminMock = createSignInMock('admin@gmail.com', 'admin123', 'admin-token', 'admin');
  const emptyTokenMock = createSignInMock('user@gmail.com', 'user123', null as any, 'user');
  const unknownRoleMock = createSignInMock('unknown@gmail.com', 'unknown123', 'unknown-token', 'moderator');
  const tableMock = createTableMock('TABLE123', 'table-123');
  const emptyTableMock = createTableMock('NONEXISTENT');

  const fillFormAndSubmit = async (container: any, email: string, password: string) => {
    fireEvent.change(container.getByTestId('email-input'), { target: { value: email } });
    fireEvent.change(container.getByTestId('password-input'), { target: { value: password } });
    fireEvent.click(container.getByTestId('sign-in-button'));
    await act(async () => new Promise((r) => setTimeout(r, 0)));
  };

  it('renders without crashing', () => {
    render(
      <MockedProvider mocks={[]}>
        <SignInComponent />
      </MockedProvider>
    );
  });

  it('stores tableId in localStorage if tableName exists', async () => {
    (useSearchParams as jest.Mock).mockReturnValue({ get: jest.fn().mockReturnValue('TABLE123') });
    render(
      <MockedProvider mocks={[tableMock]}>
        <SignInComponent />
      </MockedProvider>
    );
    await waitFor(() => expect(localStorage.setItem).toHaveBeenCalledWith('tableId', 'table-123'));
  });

  it('does not store tableId when table query returns no data', async () => {
    (useSearchParams as jest.Mock).mockReturnValue({ get: jest.fn().mockReturnValue('NONEXISTENT') });
    render(
      <MockedProvider mocks={[emptyTableMock]}>
        <SignInComponent />
      </MockedProvider>
    );
    await waitFor(() => expect(localStorage.setItem).not.toHaveBeenCalledWith('tableId', expect.anything()));
  });

  it('does not store tableId when table data lacks tableId', async () => {
    const incompleteTableMock = createTableMock('INCOMPLETE');
    (incompleteTableMock.result.data.getTableByName as any) = { tableName: 'INCOMPLETE' };
    (useSearchParams as jest.Mock).mockReturnValue({ get: jest.fn().mockReturnValue('INCOMPLETE') });
    render(
      <MockedProvider mocks={[incompleteTableMock]}>
        <SignInComponent />
      </MockedProvider>
    );
    await waitFor(() => expect(localStorage.setItem).not.toHaveBeenCalledWith('tableId', expect.anything()));
  });

  it('navigates to / for regular user and saves token', async () => {
    const container = render(
      <MockedProvider mocks={[signInUserMock]}>
        <SignInComponent />
      </MockedProvider>
    );
    await fillFormAndSubmit(container, 'user@gmail.com', 'user123');
    await waitFor(() => expect(localStorage.setItem).toHaveBeenCalledWith('token', 'user-token'));
    await waitFor(() => expect(push).toHaveBeenCalledWith('/'));
  });

  it('navigates to /order for admin and saves token', async () => {
    const container = render(
      <MockedProvider mocks={[signInAdminMock]}>
        <SignInComponent />
      </MockedProvider>
    );
    await fillFormAndSubmit(container, 'admin@gmail.com', 'admin123');
    await waitFor(() => expect(localStorage.setItem).toHaveBeenCalledWith('token', 'admin-token'));
    await waitFor(() => expect(push).toHaveBeenCalledWith('/order'));
  });

  it('handles unknown user role (neither admin nor user)', async () => {
    const container = render(
      <MockedProvider mocks={[unknownRoleMock]}>
        <SignInComponent />
      </MockedProvider>
    );
    await fillFormAndSubmit(container, 'unknown@gmail.com', 'unknown123');
    await waitFor(() => expect(localStorage.setItem).toHaveBeenCalledWith('token', 'unknown-token'));
    expect(push).not.toHaveBeenCalled();
  });

  it('handles signIn returning empty token', async () => {
    const container = render(
      <MockedProvider mocks={[emptyTokenMock]}>
        <SignInComponent />
      </MockedProvider>
    );
    await fillFormAndSubmit(container, 'user@gmail.com', 'user123');
    await waitFor(() => expect(localStorage.setItem).toHaveBeenCalledWith('token', ''));
    await waitFor(() => expect(push).toHaveBeenCalledWith('/'));
  });

  it('shows error message if sign-in fails', async () => {
    const errorMock: MockedResponse = {
      request: { query: SignInDocument, variables: { input: { email: 'wrong@gmail.com', password: 'wrong123' } } },
      error: new Error('An error occurred'),
    };
    const container = render(
      <MockedProvider mocks={[errorMock]}>
        <SignInComponent />
      </MockedProvider>
    );
    await fillFormAndSubmit(container, 'wrong@gmail.com', 'wrong123');
    await waitFor(() => expect(container.queryByText('Имэйл эсвэл нууц үг буруу байна.')).toBeInTheDocument());
  });

  it('navigates to reset-password page', async () => {
    const container = render(
      <MockedProvider mocks={[]}>
        <SignInComponent />
      </MockedProvider>
    );
    fireEvent.click(container.getByTestId('reset-password-button'));
    await waitFor(() => expect(push).toHaveBeenCalledWith('/reset-password'));
  });

  it('navigates to sign-up page', async () => {
    const container = render(
      <MockedProvider mocks={[]}>
        <SignInComponent />
      </MockedProvider>
    );
    fireEvent.click(container.getByTestId('sign-up-button'));
    await waitFor(() => expect(push).toHaveBeenCalledWith('/sign-up'));
  });

  it('does not call getTableByName when tableName is null', async () => {
    render(
      <MockedProvider mocks={[]}>
        <SignInComponent />
      </MockedProvider>
    );
    await act(async () => new Promise((r) => setTimeout(r, 100)));
    expect(localStorage.setItem).not.toHaveBeenCalledWith('tableId', expect.anything());
  });

  it('handles form validation errors for email', async () => {
    const container = render(
      <MockedProvider mocks={[]}>
        <SignInComponent />
      </MockedProvider>
    );
    fireEvent.change(container.getByTestId('email-input'), { target: { value: 'invalid-email' } });
    fireEvent.change(container.getByTestId('password-input'), { target: { value: 'password123' } });
    fireEvent.click(container.getByTestId('sign-in-button'));
    await waitFor(() => expect(container.getByTestId('email-input')).toHaveClass('border-input'));
  });

  it('handles form validation errors for password', async () => {
    const container = render(
      <MockedProvider mocks={[]}>
        <SignInComponent />
      </MockedProvider>
    );
    fireEvent.change(container.getByTestId('email-input'), { target: { value: 'test@example.com' } });
    fireEvent.change(container.getByTestId('password-input'), { target: { value: '123' } });
    fireEvent.click(container.getByTestId('sign-in-button'));
    await waitFor(() => expect(container.getByTestId('password-input')).toHaveClass('border-input'));
  });

  it('handles empty email validation', async () => {
    const container = render(
      <MockedProvider mocks={[]}>
        <SignInComponent />
      </MockedProvider>
    );
    fireEvent.change(container.getByTestId('password-input'), { target: { value: 'password123' } });
    fireEvent.click(container.getByTestId('sign-in-button'));
    await waitFor(() => expect(container.getByTestId('email-input')).toHaveClass('border-input'));
  });
});
