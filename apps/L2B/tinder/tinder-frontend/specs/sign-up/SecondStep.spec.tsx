import SecondStep from '@/app/auth/sign-up/_components/SecondStep';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('SecondStep components', () => {
  it('renders confirmation text and input', () => {
    const setStepMock = jest.fn();
    render(<SecondStep setStep={setStepMock} />);

    expect(screen.getByText('Confirm email')).toBeInTheDocument();
    expect(screen.getByText(/To continue, enter the secure code/i)).toBeInTheDocument();

    expect(screen.getByText('ASD')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next step/i })).toBeInTheDocument();
  });
  it('calls setStep with 3 when "Next Step" is clicked', () => {
    const setStepMock = jest.fn();
    render(<SecondStep setStep={setStepMock} />);

    fireEvent.click(screen.getByRole('button', { name: /next step/i }));
    expect(setStepMock).toHaveBeenCalledWith(3);
  });
});
