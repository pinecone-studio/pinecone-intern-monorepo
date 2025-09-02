import { ForbiddenComponent } from '@/components/home/ForbiddenComponent';
import { render } from '@testing-library/react';

describe('ForbiddenComponent', () => {
  it('should render the ForbiddenComponent', () => {
    render(<ForbiddenComponent />);
  });
});
