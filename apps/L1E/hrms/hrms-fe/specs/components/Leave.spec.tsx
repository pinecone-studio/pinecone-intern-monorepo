import { render, screen } from '@testing-library/react';

import { Leave } from '../../src/components/Leave';

describe('Leave', () => {
  it('should render ', () => {
    render(<Leave />);
    expect(screen.getByText('Чөлөө'));
  });
});
