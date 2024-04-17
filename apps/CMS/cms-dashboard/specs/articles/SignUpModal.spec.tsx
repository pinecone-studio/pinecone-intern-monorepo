import React from 'react';
import { render } from '@testing-library/react';

import SignUpModal from '../../src/app/articles/_components/_signupComps/SignUpModal';

describe('SignUpModal', () => {
  it('It should contain all contents in SignUpModal', () => {
    const { getByTestId } = render(<SignUpModal />);

    const container = getByTestId('sign-up-modal-container');
    expect(container).toBeDefined();
  });
  it('It should display strings and typographies', () => {
    const { getByTestId } = render(<SignUpModal />);

    const signUp = getByTestId('sign-up-modal-title');
    expect(signUp.textContent).toEqual('Бүртгүүлэх');

    const next = getByTestId('sign-up-modal-next-btn');
    expect(next.textContent).toMatch('Дараах');

    const logIn = getByTestId('sign-up-modal-login-btn');
    expect(logIn.textContent).toMatch('Нэвтрэх');
  });
});
