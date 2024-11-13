import { CancelComponent } from '@/components/providers/CancelComponent';
import { render } from '@testing-library/react';

describe('CancelComponent', () => {
  it('should render successfully', async () => {
    render(<CancelComponent />);
  });
});
