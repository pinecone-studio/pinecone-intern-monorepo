import LoginPage from '@/components/auth/LoginPage';
import { fireEvent, render } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { LoginDocument } from '@/generated';

const loginMock: MockedResponse = {
  request: { query: LoginDocument, variables: { email: 'test', password: '0000' } },
  result: { data: { _id: '1', name: 'test', email: 'test', phone: '0000', isAdmin: false, createdAt: '', updatedAt: '' } },
};

describe('1. Login Page render', () => {
  it('1. should render successfully', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[loginMock]}>
        <LoginPage onSubmit={jest.fn()} />
      </MockedProvider>
    );

    const emailInput = getByTestId('Login-Page-Email-Input');
    const passwordInput = getByTestId('Login-Page-Password-Input');
    const submitButton = getByTestId('Login-Page-Submit-Button');

    fireEvent.change(emailInput, { target: { value: 'test' } });
    fireEvent.change(passwordInput, { target: { value: '0000' } });

    fireEvent.click(submitButton);
  });
});
