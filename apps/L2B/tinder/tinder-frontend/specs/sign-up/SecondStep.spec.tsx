import SecondStep from '@/app/auth/sign-up/_components/SecondStep';
import { fireEvent, render, screen } from '@testing-library/react';

describe('SecondStep components', () => {
  it('should call setStep(3) when the button is clicked', () => {
    const setStepMock = jest.fn();
    render(<SecondStep setStep={setStepMock} />);

    const nextButton = screen.getByText('next step');
    fireEvent.click(nextButton);
  });
});
