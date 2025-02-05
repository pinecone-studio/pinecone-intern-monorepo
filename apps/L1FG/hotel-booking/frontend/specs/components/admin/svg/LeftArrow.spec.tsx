import { LeftArrow } from '@/components/admin/svg';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('LeftArrow', () => {
  it('should render LeftArrow successfully', async () => {
    render(<LeftArrow />);
  });
});
