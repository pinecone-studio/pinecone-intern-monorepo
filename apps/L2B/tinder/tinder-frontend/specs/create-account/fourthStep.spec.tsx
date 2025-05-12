import FourthStep from '@/app/auth/create-account/_components/FourthStep';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('FourthStep', () => {
  it('should call setStep with 5 when the next step button is clicked', () => {
    const mockSetStep = jest.fn();

    const { getByText } = render(<FourthStep setStep={mockSetStep} />);

    const nextButton = getByText('next step');
    fireEvent.click(nextButton);

    expect(mockSetStep).toHaveBeenCalledTimes(1);
    expect(mockSetStep).toHaveBeenCalledWith(4);
  });
});
