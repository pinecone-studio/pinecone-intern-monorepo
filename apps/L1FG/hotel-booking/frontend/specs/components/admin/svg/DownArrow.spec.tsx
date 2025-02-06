import { DownArrow } from '@/components/admin/svg';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('DownArrow', () => {
  it('should render DownArrow successfully', async () => {
    render(<DownArrow />);
  });
});
