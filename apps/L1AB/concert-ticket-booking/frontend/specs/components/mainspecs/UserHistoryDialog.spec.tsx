import { UserHistoryDialog } from '@/components';
import { render } from '@testing-library/react';

describe('UserHistoryDialog', () => {
  it('should render successfully', async () => {
    render(<UserHistoryDialog />);
  });
});
