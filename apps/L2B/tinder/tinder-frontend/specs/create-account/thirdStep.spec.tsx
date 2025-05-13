import ThirdStep from '@/app/auth/create-account/_components/ThirdStep';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('ThirdStep components', () => {
  it('should call setStep with 4 when the next step button is clicked', () => {
    const mockSetStep = jest.fn();
    const { getByText } = render(<ThirdStep setStep={mockSetStep} />);

    expect(getByText('3step')).toBeInTheDocument();

    fireEvent.click(getByText('next step'));

    expect(mockSetStep).toHaveBeenCalledTimes(1);
    expect(mockSetStep).toHaveBeenCalledWith(3);
  });
});
