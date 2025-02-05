import { render } from '@testing-library/react';
import { HomeLogo } from '@/components/layout/icons/HomeLogo';

describe('HomeLogo', () => {
  it('should render successfully', () => {
    render(<HomeLogo />);
  });
});
