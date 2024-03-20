import { render } from '@testing-library/react';
import { ProfileButton } from '@/domains/profile';

describe('ProfileButton', () => {
  it('Should render profile button component', () => {
    const { container } = render(<ProfileButton text="hello test" />);
    expect(container).toBeDefined();
  });
});
