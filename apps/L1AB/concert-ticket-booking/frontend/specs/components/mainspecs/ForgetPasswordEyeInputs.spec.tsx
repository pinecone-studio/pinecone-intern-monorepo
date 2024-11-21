import { ForgetPasswordEyeInputs } from '@/components';
import { fireEvent, render } from '@testing-library/react';

describe('ForgetPasswordEyeInputs', () => {
  it('should render successfully', async () => {
    const { getByTestId } = render(<ForgetPasswordEyeInputs />);
    const eye = getByTestId('eye-btn');
    fireEvent.click(eye);
  });
});
