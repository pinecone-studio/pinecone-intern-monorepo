import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Leave } from '@/components/Leave';

const timeleave = 10;

describe('PaidLeave Component', () => {
  it('renders the component', async () => {
    render(<Leave timeleave={timeleave} />);
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  });
});
