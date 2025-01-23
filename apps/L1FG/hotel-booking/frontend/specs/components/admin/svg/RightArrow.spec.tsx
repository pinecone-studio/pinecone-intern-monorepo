import { RightArrow } from '@/components/admin/svg';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('RightArrow', () => {
  it('should render successfully', async () => {
    render(<RightArrow />);
  });
});
