import { fireEvent, getByTestId, render } from '@testing-library/react';

import Logincomp from '@/components/Login/Logincomp';

describe('Logincomp', () => {
  it('should Logincomp', async () => {
    const { getByTestId } = render(<Logincomp />);

    const emailInput = getByTestId('email-input');
    fireEvent.change(emailInput, { target: { value: '1' } });

    const submit = getByTestId('submit');
    fireEvent.click(submit);
  });
  it('should display an error message if the email is not entered', () => {
    const { getByTestId } = render(<Logincomp />);

    const submitButton = getByTestId('submit');
    fireEvent.click(submitButton);

    const errorMessage = getByTestId('error-message');
  });
});
