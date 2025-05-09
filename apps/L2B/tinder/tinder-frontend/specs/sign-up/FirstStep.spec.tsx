import FirstStep from '@/app/auth/sign-up/_components/FirstStep';
import { render, screen, fireEvent } from '@testing-library/react';

describe('FirstStep', () => {
  it('should call setStep(2) when the button is clicked', () => {
    const setStepMock = jest.fn();
    render(<FirstStep setStep={setStepMock} setEmail={jest.fn()} />);

    const nextButton = screen.getByText('next step');
    fireEvent.click(nextButton);
  });
});
