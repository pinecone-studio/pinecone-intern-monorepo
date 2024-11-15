import { PopularHotelsCard } from '@/components/main';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('Popular Hotels Card', () => {
  it('should render the Popular hotels card', () => {
    render(<PopularHotelsCard />);
  });
});
