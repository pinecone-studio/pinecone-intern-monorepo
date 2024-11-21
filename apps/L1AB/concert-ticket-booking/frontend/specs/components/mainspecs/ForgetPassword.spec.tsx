import { ForgetPassword } from '@/components/maincomponents/ForgetPassword';
import { fireEvent, render } from '@testing-library/react';

describe('ForgetPassword', () => {
  it('should render successfully', async () => {
    const { getByTestId } = render(<ForgetPassword />);
    const eyeOne = getByTestId('eyeOne-btn');
    fireEvent.click(eyeOne)
    const eyeTwo = getByTestId('eyeTwo-btn');
    fireEvent.click(eyeTwo)
  });
});
