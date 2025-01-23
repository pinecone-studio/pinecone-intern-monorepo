import RegisterPage from '@/components/auth/RegisterPage';
import { RegisterDocument } from '@/generated';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { fireEvent, render } from '@testing-library/react';

const registerMock: MockedResponse = {
  request: { query: RegisterDocument, variables: { email: 'test', name: 'test', password: 'test', confirmpassword: 'test', phone: 'test' } },
  result: {
    data: {
      _id: '1',
      name: 'test',
      email: 'test',
      phone: 'test',
      isAdmin: false,
      createdAt: '',
      updatedAt: '',
    },
  },
};
describe('Register page', () => {
  it('1. should render successfully', () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[registerMock]}>
        <RegisterPage onSubmit={jest.fn()} />
      </MockedProvider>
    );

    const nameInput = getByTestId('Register-Page-Name-Input');
    const emailInput = getByTestId('Register-Page-Email-Input');
    const phoneInput = getByTestId('Register-Page-Phone-Input');
    const passwordInput = getByTestId('Register-Page-Password-Input');
    const confirmPasswordInput = getByTestId('Register-Page-Confirm-Password-Input');
    const submitButton = getByTestId('Register-Page-Submit-Button');

    fireEvent.change(emailInput, { target: { value: 'test' } });

    fireEvent.change(nameInput, { target: { value: 'test' } });
    fireEvent.change(phoneInput, { target: { value: 'test' } });
    fireEvent.change(passwordInput, { target: { value: 'test' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'test' } });
    fireEvent.click(submitButton);
  });
  it('2. Confirm validation error', () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[registerMock]}>
        <RegisterPage onSubmit={jest.fn()} />
      </MockedProvider>
    );
    const nameInput = getByTestId('Register-Page-Name-Input');
    const emailInput = getByTestId('Register-Page-Email-Input');
    const phoneInput = getByTestId('Register-Page-Phone-Input');
    const passwordInput = getByTestId('Register-Page-Password-Input');
    const confirmPasswordInput = getByTestId('Register-Page-Confirm-Password-Input');
    const submitButton = getByTestId('Register-Page-Submit-Button');

    fireEvent.change(emailInput, { target: { value: 'test' } });

    fireEvent.change(nameInput, { target: { value: 'test' } });
    fireEvent.change(phoneInput, { target: { value: 'test' } });
    fireEvent.change(passwordInput, { target: { value: 'test' } });
    fireEvent.change(confirmPasswordInput, { target: { value: '' } });
    fireEvent.click(submitButton);
  });
});
