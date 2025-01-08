import { RemoteWork } from '@/components/RemoteWork';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

const availableDays = 5;

describe('RemoteWork', () => {
  it('renders the component', async () => {
    render(<RemoteWork availableDays={availableDays} />);
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  });
});
