import Setting from '@/components/profile/profilePost/Setting';
import { render } from '@testing-library/react';

describe('Settings components', () => {
  it('1. Should render settings component', () => {
    const { container } = render(<Setting />);
    expect(container).toBeDefined();
  });
});
