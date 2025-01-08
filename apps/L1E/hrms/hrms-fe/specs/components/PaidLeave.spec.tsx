import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PaidLeave } from '@/components/PaidLeave';

const availablePaidDays = 5;

describe('PaidLeave Component', () => {
  it('renders the component', async () => {
    render(<PaidLeave availablePaidDays={availablePaidDays} />);
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  });
});
