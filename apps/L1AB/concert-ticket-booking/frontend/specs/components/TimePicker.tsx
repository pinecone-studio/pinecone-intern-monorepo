import { TimePicker } from '@/components/TimePicker';
import { render } from '@testing-library/react';

describe('TimePicker', () => {
  it('should render successfully', () => {
    render(<TimePicker />);
  });
});
