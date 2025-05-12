import SecondStep from '@/app/auth/create-account/_components/SecondStep';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('SecondStep', () => {
  it('should call setStep with 3 when the next step button is clicked', () => {
    const mockSetStep = jest.fn();

    const { getByText } = render(<SecondStep setStep={mockSetStep} />);

    const nextButton = getByText('next step');
    fireEvent.click(nextButton);

    expect(mockSetStep).toHaveBeenCalledTimes(1);
    expect(mockSetStep).toHaveBeenCalledWith(2);
  });
});
