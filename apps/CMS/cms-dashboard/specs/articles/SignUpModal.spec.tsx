import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import SignUpModal from '../../src/app/articles/_components/_signupComps/SignUpModal';

describe('SignUpModal', () => {
  it('It should contain all contents in SignUpModal', () => {
    const { getByTestId } = render(<SignUpModal />);

    const container = getByTestId('sign-up-modal-container');
    expect(container).toBeDefined();
  });
  it('It should display string and typographies', () => {
    const { getByTestId } = render(<SignUpModal />);

    const signUp = getByTestId('sign-up-modal-title');
    expect(signUp.textContent).toEqual('Бүртгүүлэх');

    const next = getByTestId('sign-up-modal-next-btn');
    expect(next.textContent).toMatch('Дараах');

    const logIn = getByTestId('sign-up-modal-login-btn');
    expect(logIn.textContent).toMatch('Нэвтрэх');
  });

  //   it('it should trigger signup function when clicked', () => {
  //     const { getByTestId } = render(<SignUpModal />);

  //     const signUpButton = getByTestId('signup-button');
  //     fireEvent.click(signUpButton);

  //     expect(signUpButton).toHaveBeenCalledWith();
  //   });

  test('It should call signUp callback', () => {
    const signUp = jest.fn();

    const { getByTestId } = render(<SignUpModal />);

    fireEvent.click(getByTestId('signup-button'));

    expect(signUp).toHaveBeenCalled();
  });
});
