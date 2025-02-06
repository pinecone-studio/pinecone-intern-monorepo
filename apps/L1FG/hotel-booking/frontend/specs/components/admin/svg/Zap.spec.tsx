import { ActiveZap } from '@/components/admin/svg';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('Zap', () => {
  it('should render ActiveZap successfully', async () => {
    render(<ActiveZap />);
  });
});
