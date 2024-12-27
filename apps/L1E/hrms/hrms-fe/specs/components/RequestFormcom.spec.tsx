import { act, fireEvent, render } from '@testing-library/react';
import Requestcom from '@/components/requestForm/RequestFormcom';

jest.mock('../../src/components/requestForm/RequestFormcom1', () => ({
  __esModule: true,
  default: jest.fn(() => <div>Day Component</div>),
}));

jest.mock('../../src/components/requestForm/RequestFormtime', () => ({
  __esModule: true,
  default: jest.fn(() => <div>Time Component</div>),
}));

describe('Requestcom', () => {
  it('should Requestcom', async () => {
   const {getByTestId}=render(<Requestcom />);
    const timeBtn = getByTestId('time-btn');
    await act(() => {
      fireEvent.click(timeBtn);
    });

    const dayBtn = getByTestId('day-btn');
    await act(() => {
      fireEvent.click(dayBtn);
    });
    
 
  });
});
