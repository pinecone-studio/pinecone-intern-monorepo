import { SuccessIcon } from '@/assets/icons';
import { render } from '@testing-library/react';

describe('SuccessIcon', () => {
  it('1. Should render ', () => {
    const { container } = render(<SuccessIcon />);
    expect(container).toBeDefined();
  });
});
