import { DatePickerWithRange } from '@/components/user/features/DatePickerWithRange';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('DatePickerWithRange', () => {
  it('should render successfully', async () => {
    render(<DatePickerWithRange />);
  });
});
