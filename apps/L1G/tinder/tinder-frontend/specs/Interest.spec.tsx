import { Interest } from '@/components/Interest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

const mockInterestname = 'mockInterest';
describe('Interest component', () => {
  it('renders without crashing', () => {
    render(<Interest interestName={mockInterestname} />);
  });
});
